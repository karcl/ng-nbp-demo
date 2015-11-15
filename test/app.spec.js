describe('NBP app test suite', function () {

    describe('TestController', function () {
        var scope;
        var $controller;

        beforeEach(function() {
            module('nbpApp');
            inject(function ($injector, $rootScope) {
                scope = $rootScope.$new();
                $controller = $injector.get('$controller');
            });
        });

        it('should put message into its scope', function () {
            $controller('testController', { $scope: scope });
            expect(scope.message).toEqual('Message from testController');
        });
    });
});
