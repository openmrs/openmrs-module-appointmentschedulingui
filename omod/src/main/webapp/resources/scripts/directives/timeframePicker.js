angular.module('scheduleAppointmentTimeframePickerApp')
    .directive('timeframepicker', function() {
        return {
            restrict: 'E',
            scope: { headermessage: '@headermessage' },
            templateUrl: '../ms/uiframework/resource/appointmentschedulingui/partials/timeframepicker.html',
            controller: 'timeframePickerController'
        };
    });
