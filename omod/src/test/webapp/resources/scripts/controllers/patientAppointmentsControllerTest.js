describe('Patient Appointments controller', function () {

    jsLocale = 'en'; // hack mock for the jsLocale variable

    var scope, deferred,
        mockAppointmentService, mockNgGridHelper, mockFilterFilter, mockDateRangePickerEventListener,
        promise;

    beforeEach(module('appointmentscheduling.scheduleAppointment'));
    beforeEach(inject(function ($rootScope, $controller, $q) {
        deferred = $q.defer();
        promise = deferred.promise;

        mockNgGridHelper = jasmine.createSpyObj('ngGridHelper', ['includePagination']);
        mockFilterFilter = jasmine.createSpy('filterFilter');
        mockDateRangePickerEventListener = jasmine.createSpyObj('dateRangePickerEventListener', ['subscribe']);

        mockAppointmentService = jasmine.createSpyObj('mockAppointmentService', ['getAppointments']);

        mockAppointmentService.getAppointments.andCallFake(function() {
            return promise;
        });

        scope = $rootScope.$new();

        scope.pagingOptions = {
            pageSizes: [5,10,20],
            pageSize: 10,
            currentPage: 1
        };

        var controller =  $controller('PatientAppointmentsCtrl', {$scope: scope,
            AppointmentService: mockAppointmentService, filterFilter: mockFilterFilter,
            ngGridHelper: mockNgGridHelper, dateRangePickerEventListener: mockDateRangePickerEventListener});
    }));

    describe('it must get all appointment types', function () {
        it('should call getAppointment method from appointment server and update allAppointment with the result', function () {
            scope.setPagingData = function(){}

            deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
            scope.init("3816596c-0d50-4cd0-aab5-922516bc9fa4", true);

            scope.$apply();

            expect(mockAppointmentService.getAppointments).toHaveBeenCalled();
            expect(scope.allAppointments[0].uuid).toBe("3816596c-0d50-4cd0-aab5-922516bc9fa4");
            expect(scope.allAppointments[0].appointmentType.display).toBe("New Dental");
            expect(scope.allAppointments[0].timeSlot.appointmentBlock.provider.person.display).toBe("Areias Mario");
        });
    });

    it('must call the subscribe method from the dateRangePickerEventListener service when the controller is created', function () {
        expect(mockDateRangePickerEventListener.subscribe).toHaveBeenCalledWith(scope, 'patientAppointments');
    });

    it("should send out an event for cancelling an appointment", function() {

        var cancelListener = jasmine.createSpy('cancelListener');
        scope.$on('appointmentscheduling.cancelAppointment', cancelListener);

        var eventData = {
            uuid: "123"
        };

        scope.cancelAppointment("123");
        expect(cancelListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);

    })

})