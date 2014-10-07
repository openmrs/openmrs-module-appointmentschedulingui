
describe('ConfirmAppointment Controller', function () {
    var scope,
        appointmentServiceMock,
        deferred,
        promise;

    beforeEach(module('appointmentscheduling'));
    beforeEach(inject(function ($rootScope, $controller, $q) {

        deferred = $q.defer();
        promise = deferred.promise;

        appointmentServiceMock = jasmine.createSpyObj('appointmentServiceMock', ['saveAppointment', 'markAppointmentRequestFulfilled']);
        appointmentServiceMock.saveAppointment.andCallFake(function() {
            return promise;
        });

        scope = $rootScope.$new();

        var controller =  $controller('ConfirmAppointmentCtrl', {$scope: scope, AppointmentService: appointmentServiceMock});
    }));

    describe('it must save an appointment', function () {
        it('should call saveAppointment method from appointment service with an appointment to be confirmed', function () {

            scope.canOverbook = false;
            scope.appointmentType = {uuid: 1};
            scope.selectedTimeSlot = {uuid: 2};
            scope.patientUuid = '123';
            var appointment = { 'appointmentType': scope.appointmentType.uuid,
                'status': 'SCHEDULED',
                'timeSlot': scope.selectedTimeSlot.uuid,
                'reason': scope.appointmentReason,
                'patient': scope.patientUuid
            };

            scope.confirmAppointment();

            expect(appointmentServiceMock.saveAppointment).toHaveBeenCalledWith(appointment, false);
        });
    });

    describe('it must save an appointment allowing overbook', function () {
        it('should call saveAppointment method from appointment service with an appointment to be confirmed', function () {

            scope.canOverbook = true;
            scope.appointmentType = {uuid: 1};
            scope.selectedTimeSlot = {uuid: 2};
            scope.patientUuid = '123';
            var appointment = { 'appointmentType': scope.appointmentType.uuid,
                'status': 'SCHEDULED',
                'timeSlot': scope.selectedTimeSlot.uuid,
                'reason': scope.appointmentReason,
                'patient': scope.patientUuid
            };

            scope.confirmAppointment();

            expect(appointmentServiceMock.saveAppointment).toHaveBeenCalledWith(appointment, true);
        });
    });

    describe('it must flag an appointment request as fullfill', function () {
        it('should call markAppointmentRequestFulfilled if selected appointment request is same type as appointment we are creating', function () {

            scope.canOverbook = false;
            scope.appointmentType = {uuid: 1};
            scope.selectedTimeSlot = {uuid: 2};
            scope.patientUuid = '123';

            scope.selectedAppointmentRequest = {
                appointmentType: { uuid: 1}
            }

            scope.confirmAppointment();

            deferred.resolve();
            scope.$apply();

            expect(appointmentServiceMock.markAppointmentRequestFulfilled).toHaveBeenCalledWith(scope.selectedAppointmentRequest);
        });

        it('should not call markAppointmentRequestFulfilled if selected appointment request is different type as appointment we are creating', function () {

            scope.canOverbook = false;
            scope.appointmentType = {uuid: 1};
            scope.selectedTimeSlot = {uuid: 2};
            scope.patientUuid = '123';

            scope.selectedAppointmentRequest = {
                appointmentType: { uuid: 2}
            }

            scope.confirmAppointment();

            deferred.resolve();
            scope.$apply();

            expect(appointmentServiceMock.markAppointmentRequestFulfilled).not.toHaveBeenCalled();
        });
    });
})