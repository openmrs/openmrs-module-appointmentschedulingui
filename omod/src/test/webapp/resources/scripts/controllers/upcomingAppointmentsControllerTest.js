describe('CancelAppointment controller', function () {
    var scope,
        appointmentServiceMock,
        $timeout,
        promise;

    beforeEach(module('appointmentscheduling.scheduleAppointment'));
    beforeEach(inject(function ($rootScope, $controller, _$timeout_, $q) {
        promise = $q.defer().promise;
        appointmentServiceMock = jasmine.createSpyObj('appointmentServiceMock', ['cancelAppointment']);
        appointmentServiceMock.cancelAppointment.andCallFake(function() {
            return promise;
        });

        scope = $rootScope.$new();
        $timeout = _$timeout_;

        var controller =  $controller('UpcomingAppointmentsCtrl', {$scope: scope, $timeout: $timeout, AppointmentService: appointmentServiceMock});
    }));

    describe('it must cancel an appointment', function () {
       it('should call cancelAppointment method from appointment service with an appointment to be canceled', function () {
           var appointment = '15';
           scope.appointmentToCancel = appointment;

           scope.doCancelAppointment();

           expect(appointmentServiceMock.cancelAppointment).toHaveBeenCalledWith(appointment);
           expect(scope.appointmentToCancel).toBeNull();
       });
    });

    it('must not reset the appointmentToCancel, when doNotCancelAppointment method is called', function () {
        var appointment = '15';
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