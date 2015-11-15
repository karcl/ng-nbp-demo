describe('The nbpServices module', function () {
    describe('the xml list service', function () {
        var xmlListService;
        var $httpBackend;

        beforeEach(function () {
            module('nbpApp');
            module(function ($provide) {
                $provide.constant('NBP_URL', 'foo-bar/');
                $provide.constant('NBP_LIST_FILE', 'dir.txt');
            });

            module('nbpServices');
            inject(function ($injector) {
                xmlListService = $injector.get('xmlListService');
                $httpBackend = $injector.get('$httpBackend');
            });
        });

        it('should fetch list of xmls from server using promise', function () {
            $httpBackend.expectGET('foo-bar/dir.txt')
                .respond(200, '..ala\nma\nkota\n');

            xmlListService.getList().then(function (data) {
                expect(data).toEqual(['ala', 'ma', 'kota']);
            });

        });
    });
});
