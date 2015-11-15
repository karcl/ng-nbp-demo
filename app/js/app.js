var app = angular.module('nbpApp', []);

app.controller('testController', ['$scope', function ($scope) {
    $scope.message = 'Message from testController';
}]);
