
// registers angular resources that can be used to retrieve appointment scheduling domain objects via REST

var appointmentResource = angular.module('appointmentscheduling.appointmentResources', ['ngResource']);

appointmentResource.config(function ($httpProvider) {
    // to prevent the browser from displaying a password pop-up in case of an authentication error
    $httpProvider.defaults.headers.common['Disable-WWW-Authenticate'] = 'true';
});

appointmentResource.factory('AppointmentType', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmenttype/:uuid", {
        'uuid' : '@uuid'
    },{
            query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('AppointmentStatusType', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmentstatustype/", {
    },{
        query: { method:'GET' }
    });
});

appointmentResource.factory('TimeSlot', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/timeslot/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('Appointment', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointment/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('AppointmentAllowingOverbook', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmentallowingoverbook/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});


appointmentResource.factory('AppointmentBlock', function($resource) {
    // note that we are using the appointmentblockwithtimeslot resource to keep the timeslot in sync with the appointment block
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('AppointmentRequest', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/appointmentrequest/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('TimeFrameUnits', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/appointmentscheduling/timeframeunits/", {
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});

appointmentResource.factory('DataSet', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/reportingrest/dataSet/:uuid", {
        'uuid' : '@uuid'
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});


