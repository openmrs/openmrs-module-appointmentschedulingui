var patientUuid = 123;

describe('ConfirmAppointment Controller', function () {
    var scope,
        appointmentServiceMock,
        promise;

    beforeEach(module('appointmentscheduling.scheduleAppointment'));
    beforeEach(inject(function ($rootScope, $controller, $q) {
        promise = $q.defer().promise;
        appointmentServiceMock = jasmine.createSpyObj('appointmentServiceMock', ['saveAppointment']);
        appointmentServiceMock.saveAppointment.andCallFake(function() {
            return promise;
        });
        scope = $rootScope.$new();

        var controller =  $controller('ConfirmAppointmentCtrl', {$scope: scope, AppointmentService: appointmentServiceMock});
    }));

    describe('it must save an appointment', function () {
        it('should call saveAppointment method from appointment service with an appointment to be confirmed', function () {
            scope.appointmentType = {uuid: 1};
            scope.selectedTimeSlot = {uuid: 2};
            var appointment = { 'appointmentType': scope.appointmentType.uuid,
                'status': 'SCHEDULED',
                'timeSlot': scope.selectedTimeSlot.uuid,
                'reason': scope.appointmentReason,
                'patient': patientUuid  // from global scope, defined in scheduleAppointment.gsp
            };

            scope.confirmAppointment();

            expect(appointmentServiceMock.saveAppointment).toHaveBeenCalledWith(appointment, true);
        });
    });
})