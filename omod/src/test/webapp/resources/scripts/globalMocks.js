
// TODO move the other global mocks into this form

// mock jquery resource, used by scheduledAppointmentBlocksControllerTest and appointmentCheckInTagTest
jq = function() { return { extend: function() { return null }, change: function () { return null } } }