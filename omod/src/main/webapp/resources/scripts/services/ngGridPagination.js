angular.module('ngGridPaginationApp')
    .factory('ngGridPaginationFactory', function () {
       return {
           includePagination: function (scope, ngGridOptions, updatePagingMethod) {
               scope.pagingOptions = {
                   pageSizes: [5,10,20],
                   pageSize: 10,
                   currentPage: 1
               };

               scope.totalServerItems = 0;

               ngGridOptions.totalServerItems = 'totalServerItems'
               ngGridOptions.pagingOptions = scope.pagingOptions;
               ngGridOptions.enablePaging = true;
               ngGridOptions.showFooter = true;

               scope.setPagingData = function(data){
                   var page = scope.pagingOptions.currentPage,
                       pageSize = scope.pagingOptions.pageSize,
                       dataToPaging = data;

                   scope.totalServerItems = data.length;
                   var pagedData = dataToPaging.slice((page - 1) * pageSize, page * pageSize);
                   return pagedData;
               };

               scope.$watchCollection(
                   "pagingOptions",
                   function() {
                        updatePagingMethod();
                   }
               );

               scope.$watch(
                   "pagingOption.pageSize",
                   function() {
                       scope.pagingOptions.currentPage = 1;
               });
           }
       };
    });