angular.module('scheduleAppointmentDateRangePickerApp')
    .factory('dateRangePickerEventListener', function() {
        return {
            subscribe: function (scope) {
                scope.$on('dateRangePickerApp.changeStartDate', function (event, date) {
                    scope.fromDate = date;
                });
                scope.$on('dateRangePickerApp.changeEndDate', function (event, date) {
                    scope.toDate = date;
                });
            }
        };
    });