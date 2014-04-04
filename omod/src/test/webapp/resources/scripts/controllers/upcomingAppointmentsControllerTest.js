describe('Upcoming Appointments controller', function () {
    var scope, deferred,
        mockAppointmentService, mockNgGridPaginationFactory, mockFilterFilter, mockDateRangePickerEventListener,
        $timeout,
        promise;

    beforeEach(module('appointmentscheduling.scheduleAppointment'));
    beforeEach(inject(function ($rootScope, $controller, _$timeout_, $q) {
        deferred = $q.defer();
        promise = deferred.promise;

        mockNgGridPaginationFactory = jasmine.createSpyObj('ngGridPaginationFactory', ['includePagination']);
        mockFilterFilter = jasmine.createSpy('filterFilter');
        mockDateRangePickerEventListener = jasmine.createSpyObj('dateRangePickerEventListener', ['subscribe']);

        mockAppointmentService = jasmine.createSpyObj('mockAppointmentService', ['cancelAppointment', 'getAppointments']);

        mockAppointmentService.cancelAppointment.andCallFake(function() {
            return promise;
        });

        mockAppointmentService.getAppointments.andCallFake(function() {
            return promise;
        });

        scope = $rootScope.$new();
        $timeout = _$timeout_;

        scope.pagingOptions = {
            pageSizes: [5,10,20],
            pageSize: 10,
            currentPage: 1
        };

        var controller =  $controller('UpcomingAppointmentsCtrl', {$scope: scope, $timeout: $timeout,
            AppointmentService: mockAppointmentService, filterFilter: mockFilterFilter,
            ngGridPaginationFactory: mockNgGridPaginationFactory, dateRangePickerEventListener: mockDateRangePickerEventListener});
    }));

    describe('it must get all appointment types', function () {
        it('should call getAppointment method from appointment server and update allAppointment with the result', function () {
            scope.setPagingData = function(){}

            deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
            scope.init("636e3d74-4dbe-4944-88a9-d3026817abb8", true);

            scope.$apply();

            expect(mockAppointmentService.getAppointments).toHaveBeenCalled();
            expect(scope.allAppointments[0].uuid).toBe("3816596c-0d50-4cd0-aab5-922516bc9fa4");
            expect(scope.allAppointments[0].appointmentType.display).toBe("New Dental");
            expect(scope.allAppointments[0].timeSlot.appointmentBlock.provider.person.display).toBe("Areias Mario");
        });
    });

    it('must call the subscribe method from the dateRangePickerEventListener service when the controller is created', function () {
        expect(mockDateRangePickerEventListener.subscribe).toHaveBeenCalledWith(scope, 'upcomingAppointments');
    });

    describe('it must cancel an appointment', function () {
       it('should call cancelAppointment method from appointment service with an appointment to be canceled', function () {
           var appointment = '15';
           scope.appointmentToCancel = appointment;

           scope.doCancelAppointment();

           expect(mockAppointmentService.cancelAppointment).toHaveBeenCalledWith(appointment);
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