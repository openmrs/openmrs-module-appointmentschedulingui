angular.module('scheduleAppointmentDateRangePickerApp')
    .directive('daterangepicker', function() {
        return {
            restrict: 'E',
            scope: { headermessage: '@headermessage' },
            templateUrl: '../ms/uiframework/resource/appointmentschedulingui/partials/daterangepicker.html',
            controller: 'dateRangePickerController'
        };
    });
