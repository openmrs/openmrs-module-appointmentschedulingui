
var providerResource = angular.module('providerResource', ['ngResource']);

providerResource.factory('Provider', function($resource) {
    return $resource("/" + OPENMRS_CONTEXT_PATH  + "/ws/rest/v1/provider/", {
    },{
        query: { method:'GET' }     // override query method to specify that it isn't an array that is returned
    });
});