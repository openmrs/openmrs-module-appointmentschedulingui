
describe('AppointmentService tests', function() {

    var appointmentService;
    var q;
    var deferred;

    beforeEach(module('appointmentscheduling.appointmentService'));

    // create mock the AppointmentType resource
    var mockAppointmentType = jasmine.createSpyObj('AppointmentType', ['query']);
    mockAppointmentType.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    // create mock the TimeSlot resource
    var mockTimeSlot = jasmine.createSpyObj('TimeSlot', ['query']);
    mockTimeSlot.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    beforeEach(module(function($provide) {
        $provide.value('AppointmentType', mockAppointmentType);
        $provide.value('TimeSlot', mockTimeSlot);
    }));

    // inject necessary dependencies
    beforeEach(inject(function (_AppointmentService_,$q) {
        appointmentService = _AppointmentService_;
        q = $q;
    }));

    it('should call AppointmentType resource with query value', function() {
        appointmentService.getAppointmentTypes("abc");
        expect(mockAppointmentType.query).toHaveBeenCalledWith({ "q": "abc" });
    });

    it('should call TimeSlot resource with query value', function() {
        appointmentService.getTimeSlots({ 'appointmentType' : '123abc' });
        expect(mockTimeSlot.query).toHaveBeenCalledWith({ 'appointmentType' : '123abc', 'v' : 'default' });
    })

})