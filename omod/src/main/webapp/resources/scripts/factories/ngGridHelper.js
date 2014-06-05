angular.module('ngGridHelper')
    .factory('ngGridHelper', function () {

        // exposed API

        return {

           includePagination: function (scope, ngGridOptions, updatePagingMethod) {
               scope.pagingOptions = {
                   pageSizes: [5,10,20],
                   pageSize: 10,
                   currentPage: 1
               };

               scope.selectedPageSize = scope.pagingOptions.pageSize;
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

                   // if the current page > the last page, set current page to last page
                   if (scope.totalServerItems < (page - 1) * pageSize) {
                        scope.pagingOptions.currentPage = Math.ceil(scope.totalServerItems / pageSize);
                   }

                   var pagedData = dataToPaging.slice((page - 1) * pageSize, page * pageSize);
                   return pagedData;
               };

               scope.$watchCollection(
                   "pagingOptions",
                   function() {
                       if(scope.selectedPageSize !== scope.pagingOptions.pageSize) {
                           scope.pagingOptions.currentPage = 1;
                           scope.selectedPageSize = scope.pagingOptions.pageSize;
                       }
                       updatePagingMethod();
                   }
               );
           },
           includeSorting: function (scope, ngGridOptions, defaultSort, updatePagingData, updateSort) {
               // we have to manually set up sorting here, because the default sort only sorts the
               // current page of paginated data :(

               // set the default sort order based as passed in (we also link this directly to the scope so we can $watch it
               ngGridOptions.sortInfo = defaultSort;
               scope.sortInfo = defaultSort;

               // turn off the built-in sorting
               ngGridOptions.useExternalSorting = true;

               // every time the sortInfo changes (which is updated when a column is clicked), re-sort based
               // on *filtered* dataset, return to page 1, and re-paginate
               scope.$watch("sortInfo", function () {
                   updateSort();
                   scope.pagingOptions.currentPage = 1;
                   updatePagingData();

               }, true);
           }
       };
    });