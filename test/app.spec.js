describe('Main app module', function () {

    describe('mainController', function () {
        var scope;
        var $controller;
        var $httpBackend;
        var xmlFileService;
        var xmlListService;

        beforeEach(function () {
            module('nbpApp');
            module(function ($provide) {
                $provide.constant('XML_EXTENSION', '.xml');
                $provide.constant('NBP_URL', 'foo-bar/');
                $provide.constant('NBP_LIST_FILE', 'dir.txt');
            });
        });

        beforeEach(function() {
            inject(function ($injector, $rootScope) {
                scope = $rootScope.$new();
                $controller = $injector.get('$controller');
                $httpBackend = $injector.get('$httpBackend');
                xmlListService = $injector.get('xmlListService');
                xmlFileService = $injector.get('xmlFileService');
            });
        });

        it('should fetch content of given xml as json', function () {
            $httpBackend.expectGET('foo-bar/dir.txt')
                .respond(200, '\n..ala\nma\nc_typ');

            $httpBackend.expectGET('foo-bar/c_typ.xml')
                .respond(200, '<kurs>'
                        + '<waluta>GBP</waluta>'
                        + '<waluta>USD</waluta>'
                        + '</kurs>');

            $controller('mainController', {
                $scope : scope,
                xmlFileService: xmlFileService,
                xmlListService: xmlListService,
            });

            $httpBackend.flush();

            expect(scope.kursy).toEqual({
                'kurs' : {
                    'waluta' : [ 'GBP', 'USD']
                }
            });

        });

    });
});
