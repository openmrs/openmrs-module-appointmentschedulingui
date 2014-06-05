describe('ngGrid Factory', function () {
    describe('it must add the paging configuration to the scope', function () {
        var scope,
            paginationFactory;

        beforeEach(function () {
            module('ngGridHelper');
            inject(function ($rootScope, $injector) {
                scope = $rootScope.$new();
                paginationFactory = $injector.get('ngGridHelper');
            });
            scope.ngGridOptions = {};

            updatePagingMock = jasmine.createSpy('updatePagingMethod');
            paginationFactory.includePagination(scope, scope.ngGridOptions, updatePagingMock);
        });

        it('should include the pagingOptions to the scope, when the includePagination method is called', function () {
            expect(scope.pagingOptions).toBeDefined();
        })

        it('should add the totalServerItems to the scope, when the includePagination method is called', function () {
            expect(scope.totalServerItems).toBeDefined();
        });

        it('should define the totalServerItems in the ngGridOptions, when the includePagination method is called', function () {
           expect(scope.ngGridOptions.totalServerItems).toBeDefined();
        });

        it('should add the pagingOptions to the ngGridOptions, when the includePagination method is called', function () {
            expect(scope.ngGridOptions.pagingOptions).toBeDefined();
        });

        it('should split an array of 15 elements into an array of 10 elements, when the setPagingData method is called', function () {
            var data = [];
            data.length = 15;

            var pagedData = scope.setPagingData(data);

            expect(pagedData.length).toBe(10);
        });

        it('should enable paging in the ngGridOptions, when the includePagination method is called', function () {
            expect(scope.ngGridOptions.enablePaging).toBeTruthy();
        });

        it('should enable display footer in the ngGridOptions, when the includePagination method is called', function () {
            expect(scope.ngGridOptions.showFooter).toBeTruthy();
        });

        it('should call updatePaging method when the paging options change', function () {
            scope.$digest();

            expect(updatePagingMock).toHaveBeenCalled();
        });

        it('should reset the current page to 1 when the page size changes', function () {
            scope.pagingOptions.pageSizes = 5;
            scope.$digest();

            expect(scope.pagingOptions.currentPage).toBe(1);
        });


    });

})