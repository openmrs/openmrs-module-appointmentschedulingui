
describe('AppointmentService tests', function() {

    var appointmentService;
    var q;
    var deferred;

    beforeEach(module('appointmentscheduling.appointmentService'));

    // create mock AppointmentType resource
    var mockAppointmentType = jasmine.createSpyObj('AppointmentType', ['query']);
    mockAppointmentType.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    // create mock TimeSlot resource
    var mockTimeSlot = jasmine.createSpyObj('TimeSlot', ['query']);
    mockTimeSlot.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        };

        return promise_mock;
    });

    // create mock AppointmentBlock resource
    var mockAppointmentBlock = jasmine.createSpyObj('AppointmentBlock', ['query']);
    mockAppointmentBlock.query.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        }

        return promise_mock;
    })

    // create mock Appointment resource
    var mockAppointment = jasmine.createSpyObj('Appointment', ['save']);
    mockAppointment.save.andCallFake(function() {

        deferred = q.defer();

        var promise_mock = {
            $promise: deferred.promise
        }

        return promise_mock;
    })

    beforeEach(module(function($provide) {
        $provide.value('AppointmentType', mockAppointmentType);
        $provide.value('TimeSlot', mockTimeSlot);
        $provide.value('Appointment', mockAppointment)
        $provide.value('AppointmentBlock', mockAppointmentBlock);
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
        expect(mockTimeSlot.query).toHaveBeenCalledWith({ 'appointmentType' : '123abc', 'v': 'default'  });
    });

    it('should call AppointmentBlock resource with query value', function() {
        appointmentService.getAppointmentBlocks({ 'appointmentType' : '123abc' });
        expect(mockAppointmentBlock.query).toHaveBeenCalledWith({ 'appointmentType' : '123abc', 'v': 'default' });
    });

    it('should call Appointment resource save with appointment value', function() {
        appointmentService.saveAppointment({ 'timeSlot': '123abc', 'patient': '456def', 'reason': 'someReason'});
        expect(mockAppointment.save).toHaveBeenCalledWith({ 'timeSlot': '123abc', 'patient': '456def', 'reason': 'someReason'});
    });

})