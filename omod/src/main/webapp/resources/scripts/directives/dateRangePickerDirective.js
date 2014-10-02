angular.module('scheduleAppointmentDateRangePickerApp')
    .directive('daterangepicker', function() {
        return {
            restrict: 'E',
            scope: {
                headermessage: '@headermessage',
                fromDate: '@startdate' ,
                senderId: '@senderid',
                startDateMin: '@startdatemin',
                clearLinkText: '@clearlinktext'
            },
            templateUrl: '/' + OPENMRS_CONTEXT_PATH + '/ms/uiframework/resource/appointmentschedulingui/partials/daterangepicker.html',
            controller: 'dateRangePickerController'
        };
    });
