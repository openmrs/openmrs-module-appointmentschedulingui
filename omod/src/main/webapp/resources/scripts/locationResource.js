
var locationResource = angular.module('locationResource', ['ngResource']);

locationResource.factory('Location', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/location/", {
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});