angular.module('scheduleAppointmentDateRangePickerApp')
    .factory('dateRangePickerEventListener', function() {
        return {
            subscribe: function (scope, senderId) {
                scope.$on('dateRangePickerApp.startDateChanged', function (event, eventData) {
                    if(eventData.senderId === senderId)
                        scope.fromDate = eventData.data;
                });
                scope.$on('dateRangePickerApp.endDateChanged', function (event, eventData) {
                    if(eventData.senderId === senderId)
                        scope.toDate = eventData.data;
                });
            }
        };
    });