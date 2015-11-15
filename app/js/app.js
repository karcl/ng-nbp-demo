var app = angular.module('nbpApp', [
        'ngAnimate',
        'ui.bootstrap'
]);

app.controller('testController', ['$scope', function ($scope) {
    $scope.message = 'Message from testController';
}]);
