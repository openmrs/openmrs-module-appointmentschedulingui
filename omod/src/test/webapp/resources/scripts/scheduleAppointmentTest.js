
describe('ScheduleAppointment tests', function() {

    var q;

    beforeEach(module('appointmentscheduling.scheduleAppointment'));

    beforeEach(module(function($provide) {
        $provide.value('AppointmentService', mockAppointmentService);
    }));

    // create the mock appointment service
    var mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getAppointmentTypes', 'getTimeSlots']);
    mockAppointmentService.getTimeSlots.andCallFake(function() {
        return q.defer().promise;
    });


    // create a root scope
    beforeEach(inject(function ($rootScope, $q)  {
        $scope = $rootScope.$new();
        q = $q;
    }));

    it('should call getAppointmentTypes service method', inject(function ($controller) {

        // link the controller to the scope
        $controller('ScheduleAppointmentCtrl', {
            $scope: $scope
        })

        $scope.getAppointmentTypes("abc");
        expect(mockAppointmentService.getAppointmentTypes).toHaveBeenCalledWith("abc");
    }));

    it('should call getTimeSlots service method', inject(function ($controller){

        // link the controller to the scope
        $controller('ScheduleAppointmentCtrl', {
            $scope: $scope
        })

        $scope.appointmentType = {}
        $scope.appointmentType.uuid = "abc123";
        $scope.fromDate = "2012-02-12";
        $scope.toDate = "2012-02-13"

        $scope.findAvailableTimeSlots();
        expect(mockAppointmentService.getTimeSlots).toHaveBeenCalledWith({'appointmentType' : 'abc123',
                                                                          "fromDate" : '2012-02-12T00:00:00-05:00',
                                                                          "toDate" : '2012-02-13T23:59:59-05:00'});

    }))

});

