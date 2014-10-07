
describe('Request Appointment Controller tests', function() {

    var scope, deferred, promise,
        mockAppointmentService,
        mockProviderService;

    beforeEach(module('appointmentscheduling.requestAppointment'));

    beforeEach(inject(function($rootScope, $controller, $q) {

        deferred = $q.defer();
        promise = deferred.promise;

        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['saveAppointmentRequest']);
        mockAppointmentService.saveAppointmentRequest.andCallFake(function () { return promise; });

        mockProviderService = jasmine.createSpyObj('ProviderService', ['getProviders']);
        mockProviderService.getProviders.andCallFake(function () { return promise; });

        scope = $rootScope.$new();

        $controller('RequestAppointmentCtrl', {$scope: scope, AppointmentService: mockAppointmentService, ProviderService: mockProviderService });
    }));

    describe('save appointment request', function() {

        it('should save basic appointment request', function() {

            scope.appointmentRequest = {
                patient: 1,
                requestedBy: 2,
                appointmentType: { uuid: 3 }
            }

           var expectedRequest = {
               status: 'PENDING',
               requestedOn: moment().format(),
               patient: 1,
               requestedBy: 2,
               appointmentType: 3,
               provider: null,
               minTimeFrameValue: null,
               minTimeFrameUnits: null,
               maxTimeFrameValue: null,
               maxTimeFrameUnits: null,
               notes: null
           }

            scope.saveAppointmentRequest();

            expect(mockAppointmentService.saveAppointmentRequest).toHaveBeenCalledWith(expectedRequest);

        })


    })


});