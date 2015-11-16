describe('The nbpServices module', function () {
    describe('the xml list service', function () {
        var xmlListService;
        var $httpBackend;

        beforeEach(function () {
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

        it('should fail to retrieve xml list from server', function () {
            $httpBackend.expectGET('foo-bar/bad-dir.txt')
                .respond(404, '');

            xmlListService.getList().then(function (data) {
            }, function (reason) {
                expect(reason).toStartWith('Could not retrieve');
            });

        });

        it('should fetch list of xmls from server of given type', function () {
            $httpBackend.expectGET('foo-bar/dir.txt')
                .respond(200, '..ala\nma\nkota\n\aadam\nma\naparat');

            var typeA = 'a';

            xmlListService.getList(typeA).then(function (data) {
                expect(data).toEqual(['ala', 'adam', 'aparat']);
            });

        });
    });


    describe('the xml file service', function () {
        var xmlFileService;
        var $httpBackend;

        beforeEach(function () {
            module(function ($provide) {
                $provide.constant('NBP_URL', 'foo-bar/');
                $provide.constant('XML_EXTENSION', '.xml');
            });

            module('nbpServices');
            inject(function ($injector) {
                xmlFileService = $injector.get('xmlFileService');
                $httpBackend = $injector.get('$httpBackend');
            });
        });

        it('should fetch content of given xml as json', function () {
            $httpBackend.expectGET('foo-bar/piwo.xml')
                .respond(200, '<piwo>'
                        + '<skladnik>woda</skladnik>'
                        + '<skladnik>chmiel</skladnik>'
                        + '<skladnik>słód</skladnik>'
                        + '</piwo>');

            xmlFileService.getJSON('piwo').then(function (data) {
                expect(data).toEqual({
                    'piwo' : {
                        'skladnik' : [ 'woda', 'chmiel', 'słód' ]
                    }
                });
            });

        });

        it('should fail to retrieve xml file contents', function () {
            $httpBackend.expectGET('foo-bar/bad.xml')
                .respond(404, '');

            xmlFileService.getJSON().then(function (data) {
            }, function (reason) {
                expect(reason).toStartWith('Could not retrieve');
            });

        });

    });
});
