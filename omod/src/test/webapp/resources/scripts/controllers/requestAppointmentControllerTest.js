
describe('Request Appointment Controller tests', function() {

    var scope, deferred, promise,
        mockAppointmentService,
        mockProviderService;

    beforeEach(module('appointmentscheduling.requestAppointment'));

    beforeEach(inject(function($rootScope, $controller, $q) {

        deferred = $q.defer();
        promise = deferred.promise;

        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['saveAppointmentRequest', 'getAppointments']);
        mockAppointmentService.saveAppointmentRequest.andCallFake(function () { return promise; });
        mockAppointmentService.getAppointments.andCallFake(function () { return promise; });

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

        it('should save appointment request with all parameters', function() {

            scope.appointmentRequest = {
                patient: 1,
                requestedBy: 2,
                appointmentType: { uuid: 3 },
                provider: { uuid: 4 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS',
                notes: 'some notes'
            }

            var expectedRequest = {
                status: 'PENDING',
                requestedOn: moment().format(),
                patient: 1,
                requestedBy: 2,
                appointmentType: 3,
                provider: 4,
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS',
                notes: 'some notes'
            }

            scope.saveAppointmentRequest();

            expect(mockAppointmentService.saveAppointmentRequest).toHaveBeenCalledWith(expectedRequest);

        })

    })

    describe('disallow non numerics', function () {

        it('should disallow non numerics', function () {

            scope.appointmentRequest = {
                minTimeFrameValue: 'abc',
                maxTimeFrameValue: 'def'
            }

            scope.disallowNonNumerics();

            expect(scope.appointmentRequest.minTimeFrameValue).toBe('');
            expect(scope.appointmentRequest.maxTimeFrameValue).toBe('');

        })

    })


    describe('validate appointment request', function () {

        it('should pass with valid appointment', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }
            expect(scope.validateAppointmentRequest()).toBeTruthy;

        })

        it('should fail if no appointment type', function () {

            scope.appointmentRequest = {
                patient: 1,
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it('should be valid if no min max specified', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 }
            }

            expect(scope.validateAppointmentRequest()).toBeTruthy;
        })

        it('should fail if min units but no value', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it('should fail if min value but no units', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it('should fail if max units but no value', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it('should fail if max value but no units', function () {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it('should fail if min time frame before max time frame', function () {

            // try a few variations

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 4,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'YEARS',
                maxTimeFrameValue: 3,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 60,
                minTimeFrameUnits: 'DAYS',
                maxTimeFrameValue: 1,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeFalsy();
        })

        it ('should allow same timeframe for min and max', function() {

            scope.appointmentRequest = {
                patient: 1,
                appointmentType: { uuid: 3 },
                minTimeFrameValue: 2,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 2,
                maxTimeFrameUnits: 'MONTHS'
            }

            expect(scope.validateAppointmentRequest()).toBeTruthy();
        })

    })

    describe('update provider', function() {

        it('should update provider when appointment type changes', function() {

            scope.appointmentRequest.appointmentType = { uuid: 'a551a377-8fab-4155-a40d-b0f45cd0cc0c' };
            scope.appointmentRequest.patient = '123';
            scope.appointmentRequest.provider = { uuid: '' };
            scope.$apply();

            expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith( { appointmentType:'a551a377-8fab-4155-a40d-b0f45cd0cc0c', patient: '123' });

            deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
            scope.$apply()

            expect(scope.appointmentRequest.provider.uuid).toBe('b34612f9-3414-45b0-bfe9-e8a3a1d67219');

        })

    })

});