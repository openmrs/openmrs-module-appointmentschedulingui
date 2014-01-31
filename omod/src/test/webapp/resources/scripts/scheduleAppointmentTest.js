
describe('ScheduleAppointment tests', function() {

    // create the mock appointment service
    var mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getAppointmentTypes']);

    beforeEach(module('appointmentscheduling.scheduleAppointment'));

    beforeEach(module(function($provide) {
        $provide.value('AppointmentService', mockAppointmentService);
    }));

    // create a root scope
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));

    it('should call getAppointmentTypes service method', inject(function ($controller) {

        // link the controller to the scope
        $controller('SelectAppointmentTypeCtrl', {
            $scope: $scope
        })

        $scope.getAppointmentTypes("abc");
        expect(mockAppointmentService.getAppointmentTypes).toHaveBeenCalledWith("abc");
    }));

});

