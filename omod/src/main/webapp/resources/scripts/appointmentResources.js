
angular.module('appointmentscheduling.appointmentResources', ['ngResource'])
    .factory('AppointmentType', function($resource) {

        return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmenttype/", {
            },{
                query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
            });

    });