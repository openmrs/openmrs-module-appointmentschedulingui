angular.module('selectMultipleAppointmentTypesApp')
    .directive('selectmultipleappointmenttypes', function() {
        return {
            restrict: 'E',
            scope: {
                headermessage: '@headermessage',
                viewall: '@viewall',
                closemessage: '@closemessage',
                senderId : '@senderid'
            },
            templateUrl: '../ms/uiframework/resource/appointmentschedulingui/partials/selectMultipleAppointmentTypes.html',
            controller:'selectMultipleAppointmentTypesController'
        };
    });
