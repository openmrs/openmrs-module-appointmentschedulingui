angular.module('scheduleAppointmentTimeframePickerApp')
    .factory('timeframePickerEventListener', function() {
        return {
            subscribe: function (scope) {
                scope.$on('timeframePickerApp.changeFromDate', function (event, date) {
                    scope.fromDate = date;
                });
                scope.$on('timeframePickerApp.changeEndDate', function (event, date) {
                    scope.toDate = date;
                });
            }
        };
    });