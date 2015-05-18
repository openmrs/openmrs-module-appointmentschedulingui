
var supportsAppointmentsTagUuid = "tagUiid";
var sessionLocationUuid = "uuid of session location";
var dailyAppointmentsHelper = {};
var telephoneAttributeTypeName = "Telephone Number";

var emr =  jasmine.createSpyObj('emr', ['errorMessage', 'navigateTo', 'message', 'handleNotLoggedIn']);

// mock jquery resource, used by dailyAppointmentsControllerTest and appointmentCheckInTagTest
jq = function() { return { extend: function() { return null }, change: function () { return null } } }

// mock console (angular.min.js makes some console calls)
if (console === undefined) {
   var console = jasmine.createSpyObj('console', ['log', 'debug', 'warn']);
}


