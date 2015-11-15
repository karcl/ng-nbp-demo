var app = angular.module('nbpApp', [
        'ngAnimate',
        'ui.bootstrap',
        'nbpServices'
]);

/**
 * Root url for NBP
 */
// Needs CORS header in server
//app.constant('NBP_URL', 'http://www.nbp.pl/kursy/xml/');

// Real world data through proxy in dev server
//app.constant('NBP_URL', '/nbp-server/kursy/xml/');

// Development only local data - downloadable via custom tool: get-nbp-data.py
app.constant('NBP_URL', 'data/');

/**
 * Name of xml list file
 */
app.constant('NBP_LIST_FILE', 'dir.txt');

app.controller('testController', ['$scope', 'xmlListService',
    function ($scope, xmlListService) {
        var xmlListPromise = xmlListService.getList()
            .then(function (data) {
                $scope.xmlList = data;
            }, function (reason) {
                alert(reason);
            });
        $scope.message = 'Message from testController';
}]);


var nbpServices = angular.module('nbpServices', []);
nbpServices.factory('xmlListService', [
        '$q',
        '$http',
        'NBP_URL',
        'NBP_LIST_FILE',
    function ($q, $http, NBP_URL, NBP_LIST_FILE) {

        // NBP has weird characters in its data - way out of alphanum range.
        // We're interested only in alphanum characters
        // so we need to remove them before further processing.
        // We also need latest data first so add them in reverse order by the
        // way.
        var purifyAndReverse = function (dirtyXmlList) {
            var cleanList = [];
            dirtyXmlList.forEach(function (item) {
                var matchResult = item.match(/\w+/);
                if (matchResult !== null && matchResult.length > 0) {
                    cleanList.unshift(matchResult[0]);
                }
            });
            return cleanList;
        };

        var getList = function () {
            var deferred = $q.defer();
            var target = NBP_URL + NBP_LIST_FILE;
            $http.get(target)
                .success(function (data) {
                    var xmlListDirty = data.split('\n');
                    var xmlList = purifyAndReverse(xmlListDirty);
                    deferred.resolve(xmlList);
                })
                .error(function () {
                    deferred.reject('Could not retrieve "' + target + '"!');
                });
            return deferred.promise;
        };

        // Public api
        return {
            getList : getList
        };

    }]);

