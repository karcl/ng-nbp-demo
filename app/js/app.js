var app = angular.module('nbpApp', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.grid',
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

/**
 * Extension of xml list file
 */
app.constant('XML_EXTENSION', '.xml');

app.controller('mainController', [
        '$scope',
        'xmlListService',
        'xmlFileService',
        '$window',
        'XML_EXTENSION',
    function ($scope, xmlListService, xmlFileService, $window, XML_EXTENSION) {
        var listType = 'c';

        var handleLatestData = function (filename) {
            xmlFileService.getJSON(filename)
                .then(function (exchangeRateData) {
                    $scope.kursy = exchangeRateData;
                }, function (reason) {
                    $window.alert(reason);
                });
        };

        xmlListService.getList(listType)
            .then(function (xmlFileList) {
                var latestFile = xmlFileList[0] + XML_EXTENSION;
                handleLatestData(latestFile);
            }, function (reason) {
                $window.alert(reason);
            });
        $scope.message = 'Message from mainController';
}]);


var nbpServices = angular.module('nbpServices', ['xml']);

nbpServices.config(function (x2jsProvider) {
    x2jsProvider.config = {
        // Currently default
    };
});

nbpServices.factory('xmlListService', [
        '$q',
        '$http',
        'NBP_URL',
        'NBP_LIST_FILE',
    function ($q, $http, NBP_URL, NBP_LIST_FILE) {

        // NBP has weird characters in its data - way out of alphanum range.
        // We're interested only in alphanum characters
        // so we need to remove them before further processing.
        // We also need latest data first so add them in reverse order.
        var purifyAndReverse = function (dirtyXmlList) {
            var cleanList = [];
            dirtyXmlList.forEach(function (item) {
                var matchResult = item.match(/\w+/);
                if (matchResult !== null && matchResult.length > 0) {
                    var trimmed = matchResult[0].replace(/^\s+|\s+$/g, '');
                    cleanList.unshift(trimmed);
                }
            });
            return cleanList;
        };

        var getList = function (type) {
            var deferred = $q.defer();
            var target = NBP_URL + NBP_LIST_FILE;
            $http.get(target)
                .success(function (data) {
                    var xmlListDirty = data.split('\n');
                    var xmlList = purifyAndReverse(xmlListDirty);
                    var xmlListOfGivenType = xmlList;

                    if (type) {
                        xmlListOfGivenType = xmlList.filter(function (item) {
                            return item.match('^' + type + '.*');
                        });
                    }

                    deferred.resolve(xmlListOfGivenType);
                })
                .error(function () {
                    deferred.reject('Could not retrieve "' + target + '"!');
                });
            return deferred.promise;
        };

        // Public API
        return {
            getList : getList
        };

    }
]);

nbpServices.factory('xmlFileService', [
        '$q',
        '$http',
        'x2js',
        'NBP_URL',
        function ($q, $http, x2js, NBP_URL) {
            var getJSON = function (xmlFile) {
                var deferred = $q.defer();
                var target = NBP_URL + xmlFile;
                var xmlGetRequest = {
                    method: 'GET',
                    url: target,
                    headers: {
                        'Content-Type': 'text/xml; charset=ISO-8859-2'
                    },
                    data: ''
                };
                $http(xmlGetRequest)
                    .success(function (xmlData) {
                        var jsonData = x2js.xml_str2json(xmlData);
                        deferred.resolve(jsonData);
                    })
                    .error(function () {
                        deferred.reject('Could not retrieve "' + target + '"!');
                    });
                return deferred.promise;
            };

            return {
                getJSON : getJSON
            };
        }
    ]
);
