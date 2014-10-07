describe('patient appointment requests controller', function() {

    var scope, mockAppointmentService, mockFilterFilter, mockNgGridHelper, promise, deferred;

    beforeEach(module('appointmentscheduling'));

    beforeEach(inject(function ($rootScope, $controller, $q) {

        deferred = $q.defer();
        promise = deferred.promise;

        scope = $rootScope.$new();

        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getAppointmentRequests']);
        mockAppointmentService.getAppointmentRequests.andCallFake(function () { return promise; });;

        mockFilterFilter = jasmine.createSpy('filterFilter');
        mockNgGridHelper = jasmine.createSpyObj('ngGridHelper', ['includePagination']);

        scope.patientUuid = '123abc';

        $controller('PatientAppointmentRequestsCtrl', {$scope: scope, $rootScope: $rootScope, AppointmentService: mockAppointmentService,
                       filterFilter: mockFilterFilter, ngGridHelper: mockNgGridHelper  });
    }));

    describe('find appointment requests', function () {

        it('should find appointment requests', function() {

            var appointmentRequests = [{
                appointmentType: 123
            }];

            scope.findAppointmentRequests();
            deferred.resolve(appointmentRequests);
            scope.$apply();

            expect(mockAppointmentService.getAppointmentRequests).toHaveBeenCalledWith({ patient: '123abc', status: 'PENDING' });
            expect(scope.appointmentRequests).toBe(appointmentRequests);
            expect(scope.showAppointmentRequests).toBeTruthy();

        })

        it('should find appointment request when trigger by appointmentRequests.loadAppointmentRequests event', function() {

            var appointmentRequests = [{
                appointmentType: 123
            }];

            scope.$broadcast('appointmentRequests.loadAppointmentRequests');

            deferred.resolve(appointmentRequests);
            scope.$apply();

            expect(mockAppointmentService.getAppointmentRequests).toHaveBeenCalledWith({ patient: '123abc', status: 'PENDING' });
            expect(scope.appointmentRequests).toBe(appointmentRequests);
            expect(scope.showAppointmentRequests).toBeTruthy();

        })
    });

    describe('book appointments', function() {

        it('should issue event for basic request with appointment type uuid', function() {

            var appointmentRequest = {
                appointmentType: { id: 123 }
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(data.appointmentRequest).toBe(appointmentRequest);

        })

        it('should issue event with start date and end date based on min and max day parameters', function() {

            var expectedStartDate = moment().add(1, 'days').startOf('day');
            var expectedEndDate = moment().add(4, 'days').startOf('day');

            var appointmentRequest = {
                appointmentType: { id: 123 },
                minTimeFrameValue: 1,
                minTimeFrameUnits: 'DAYS',
                maxTimeFrameValue: 4,
                maxTimeFrameUnits: 'DAYS',
                requestedOn: new Date()
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(moment(data.appointmentRequest.startDate).format()).toBe(expectedStartDate.format());
            expect(moment(data.appointmentRequest.endDate).format()).toBe(expectedEndDate.format());

        })

        it('should issue event with start date and end date based on min and max month parameters', function() {

            var expectedStartDate = moment().add(3, 'months').startOf('day');
            var expectedEndDate = moment().add(6, 'months').startOf('day');

            var appointmentRequest = {
                appointmentType: { id: 123 },
                minTimeFrameValue: 3,
                minTimeFrameUnits: 'MONTHS',
                maxTimeFrameValue: 6,
                maxTimeFrameUnits: 'MONTHS',
                requestedOn: new Date()
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(moment(data.appointmentRequest.startDate).format()).toBe(expectedStartDate.format());
            expect(moment(data.appointmentRequest.endDate).format()).toBe(expectedEndDate.format());

        })

        it('should issue event with start date and end date based on min and max year parameters', function() {

            var expectedStartDate = moment().add(1, 'years').startOf('day');
            var expectedEndDate = moment().add(2, 'years').startOf('day');

            var appointmentRequest = {
                appointmentType: { id: 123 },
                minTimeFrameValue: 1,
                minTimeFrameUnits: 'YEARS',
                maxTimeFrameValue: 2,
                maxTimeFrameUnits: 'YEARS',
                requestedOn: new Date()
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(moment(data.appointmentRequest.startDate).format()).toBe(expectedStartDate.format());
            expect(moment(data.appointmentRequest.endDate).format()).toBe(expectedEndDate.format());

        })

        it('should issue event with start date and end date based request date if different from current date', function() {

            var requestedOn = moment().subtract(3, 'days')

            var expectedStartDate = moment(requestedOn).add(7, 'days').startOf('day');
            var expectedEndDate = moment(requestedOn).add(10, 'days').startOf('day');

            var appointmentRequest = {
                appointmentType: { id: 123 },
                minTimeFrameValue: 7,
                minTimeFrameUnits: 'DAYS',
                maxTimeFrameValue: 10,
                maxTimeFrameUnits: 'DAYS',
                requestedOn: requestedOn
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(moment(data.appointmentRequest.startDate).format()).toBe(expectedStartDate.format());
            expect(moment(data.appointmentRequest.endDate).format()).toBe(expectedEndDate.format());

        })

        it('should never issue start date before today', function() {

            var requestedOn = moment().subtract(10, 'days')

            var expectedStartDate = moment().startOf('day');

            var appointmentRequest = {
                appointmentType: { id: 123 },
                minTimeFrameValue: 7,
                minTimeFrameUnits: 'DAYS',
                requestedOn: requestedOn
            }

            var row = {
                entity: appointmentRequest
            }

            var data;

            scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {
                data = eventData;
            })

            scope.bookAppointment(row);
            scope.$apply();

            expect(moment(data.appointmentRequest.startDate).format()).toBe(expectedStartDate.format());
        })

    })
})
