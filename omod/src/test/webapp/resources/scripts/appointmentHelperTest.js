var sessionLocationUuid = "uuid of session location";

describe('Scheduling Appointment Helper tests', function() {
    var scope;
    var scheduledAppointmentBlocksHelper;


    beforeEach( function() {

        module('appointmentSchedulingHelper');
        inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            scheduledAppointmentBlocksHelper = $injector.get('scheduledAppointmentBlocksHelper');
        });
    });


    describe('gets location to filter', function () {

        it('should return session location when it is a location for appointments', function () {
           var expectedLocation = { display: "Location of session", uuid: "uuid of session location"};
           var locations = [{ display: "location 1", uuid: "location uuid"}, { display: "Location of session", uuid: sessionLocationUuid}];
           var location = scheduledAppointmentBlocksHelper.selectLocationToFilter(locations);

           expect(location.uuid).toBe(expectedLocation.uuid);
           expect(location.display).toBe(expectedLocation.display);
        });

        it('should return first location of locations when session location it is not a location for appointments', function () {
            var expectedLocation = { display: "location 1", uuid: "uuid of location"};
            var locations = [{ display: "location 1", uuid: "uuid of location"}, { display: "location 2", uuid: "uuid of location 2"}];
            var location = scheduledAppointmentBlocksHelper.selectLocationToFilter(locations);

            expect(location.display).toBe(expectedLocation.display);
            expect(location.uuid).toBe(expectedLocation.uuid);
        });
    });
});
