
var supportsAppointmentsTagUuid = "tagUiid";
var sessionLocationUuid = "uuid of session location";
var scheduledAppointmentBlocksHelper = {};
var telephoneAttributeTypeName = "Telephone Number";

var emr =  jasmine.createSpyObj('emr', ['errorMessage', 'navigateTo', 'message']);

// mock jquery resource, used by scheduledAppointmentBlocksControllerTest and appointmentCheckInTagTest
jq = function() { return { extend: function() { return null }, change: function () { return null } } }