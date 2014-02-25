


describe('AppointmentService tests', function() {

    OPENMRS_CONTEXT_PATH = '';     // mock openmrs_context_path global variable

    var mockAppointmentResources;
    var appointmentService;
    var q;

    var deferredAppointmentTypeQuery;
    var deferredTimeSlotQuery;
    var deferredAppointmentBlockQuery;
    var deferredAppointmentBlockSave;
    var deferredAppointmentSave;


    beforeEach(module('appointmentscheduling.appointmentService'));

    // create mock AppointmentType resource
    var mockAppointmentType = jasmine.createSpyObj('AppointmentType', ['query']);
    mockAppointmentType.query.andCallFake(function() {

        deferredAppointmentTypeQuery = q.defer();

        var promise_mock = {
            $promise: deferredAppointmentTypeQuery.promise
        };

        return promise_mock;
    });

    // create mock TimeSlot resource
    var mockTimeSlot = jasmine.createSpyObj('TimeSlot', ['query']);
    mockTimeSlot.query.andCallFake(function() {

        deferredTimeSlotQuery = q.defer();

        var promise_mock = {
            $promise: deferredTimeSlotQuery.promise
        };

        return promise_mock;
    });

    // create mock AppointmentBlock resource
    var mockAppointmentBlock = jasmine.createSpyObj('AppointmentBlock', ['query', 'save']);
    mockAppointmentBlock.query.andCallFake(function() {

        deferredAppointmentBlockQuery = q.defer();

        var promise_mock = {
            $promise: deferredAppointmentBlockQuery.promise
        }

        return promise_mock;
    })
    mockAppointmentBlock.save.andCallFake(function() {

        deferredAppointmentBlockSave = q.defer();

        var promise_mock = {
            $promise: deferredAppointmentBlockSave.promise
        }

        return promise_mock;
    })


    // create mock Appointment resource
    var mockAppointment = jasmine.createSpyObj('Appointment', ['save']);
    mockAppointment.save.andCallFake(function() {

        deferredAppointmentSave = q.defer();

        var promise_mock = {
            $promise: deferredAppointmentSave.promise
        }

        return promise_mock;
    })

    beforeEach(module('appointmentscheduling.appointmentService'));

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