describe('Cancel Appointment controller', function () {

    var scope, deferred,
        $timeout,
        mockAppointmentService, promise;

    beforeEach(module('appointmentscheduling'));
    beforeEach(inject(function ($rootScope, $controller, $q, _$timeout_) {

        deferred = $q.defer();
        promise = deferred.promise;

        $timeout = _$timeout_;

        mockAppointmentService = jasmine.createSpyObj('mockAppointmentService', ['cancelAppointment', 'getAppointments']);

        mockAppointmentService.cancelAppointment.andCallFake(function() {
            return promise;
        });

        mockAppointmentService.getAppointments.andCallFake(function() {
            return promise;
        });

        scope = $rootScope.$new();

        var controller =  $controller('CancelAppointmentCtrl', {$scope: scope, $timeout: $timeout,
            AppointmentService: mockAppointmentService});
    }));

    describe('it must cancel an appointment', function () {
        it('should call cancelAppointment method from appointment service with an appointment to be canceled', function () {

            var appointment =  { id: '5', cancelReason: '' };
            scope.appointmentCancelReason = 'some reason';
            scope.appointmentToCancel = appointment;

            scope.doCancelAppointment();

            expect(mockAppointmentService.cancelAppointment).toHaveBeenCalledWith(appointment);
            expect(appointment.cancelReason).toBe(scope.appointmentCancelReason);
            expect(scope.appointmentToCancel).toBeNull();
        });
    });

    it('must not reset the appointmentToCancel, when doNotCancelAppointment method is called', function () {

        var appointment =  { id: '5', cancelReason: '' };
        scope.appointmentCancelReason = 'some reason';
        scope.appointmentToCancel = appointment;

        scope.doNotCancelAppointment();

        expect(scope.appointmentToCancel).not.toBe(appointment);
        expect(scope.appointmentToCancel).toBeNull();
    });

    it('must set the right appointment uuid to the appointmentToCancel when confirmCancelAppointment method is called', function() {
        var uuid = 15;

        scope.confirmCancelAppointment(uuid);

        expect(scope.appointmentToCancel.uuid).toBe(uuid);
    });
})