describe('Patient Appointments controller', function () {

    jsLocale = 'en'; // hack mock for the jsLocale variable

    var scope, deferred,
        mockAppointmentService, mockNgGridHelper, mockFilterFilter, mockDateRangePickerEventListener,
        promise;

    beforeEach(module('appointmentscheduling'));
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

    it('init method should call getAppointment method and update allAppointment with the result', function () {
        scope.setPagingData = function(){}

        scope.init("896f5c76-2a2a-47b9-a246-c453c537985a", true);

        deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
        scope.$apply();

        var expectedSearchParams =
            { 'patient' : '896f5c76-2a2a-47b9-a246-c453c537985a',
              'fromDate' : moment().startOf('day').format() };

        expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith(expectedSearchParams);
        expect(scope.allAppointments[0].uuid).toBe("3816596c-0d50-4cd0-aab5-922516bc9fa4");
        expect(scope.allAppointments[0].appointmentType.display).toBe("New Dental");
        expect(scope.allAppointments[0].timeSlot.appointmentBlock.provider.person.display).toBe("Areias Mario");
    });

    it('find Appointment method should call getAppointment methodt', function () {

        scope.setPagingData = function(){}

        scope.patientUuid = "896f5c76-2a2a-47b9-a246-c453c537985a";

        scope.findAppointments();
        deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
        scope.$apply();

        var expectedSearchParams =
        { 'patient' : '896f5c76-2a2a-47b9-a246-c453c537985a',
          'fromDate' : moment().startOf('day').format() };

        expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith(expectedSearchParams);
    });

    it('appointmentRequests.loadAppointments event should call getAppointment method', function () {

        scope.setPagingData = function(){}

        scope.patientUuid = "896f5c76-2a2a-47b9-a246-c453c537985a";

        scope.$broadcast('appointmentRequests.loadAppointments');
        deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
        scope.$apply();

        var expectedSearchParams =
        { 'patient' : '896f5c76-2a2a-47b9-a246-c453c537985a',
          'fromDate' : moment().startOf('day').format() };

        expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith(expectedSearchParams);;
    });

    it('changed fromDate should call getAppointment with updated fromDate', function () {

        scope.setPagingData = function(){}

        scope.patientUuid = "896f5c76-2a2a-47b9-a246-c453c537985a";

        var date = moment().add(3,'days');
        scope.fromDate = date;
        scope.$apply();

        var anotherDate = moment().add(4,'days');
        scope.fromDate = anotherDate;
        scope.$apply();

        var expectedSearchParams =
        { 'patient' : '896f5c76-2a2a-47b9-a246-c453c537985a',
          'fromDate' : moment(anotherDate).startOf('day').format() };

        expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith(expectedSearchParams);
    });

    it('changed toDate should call getAppointment with updated toDate', function () {

        scope.setPagingData = function(){}

        scope.patientUuid = "896f5c76-2a2a-47b9-a246-c453c537985a";

        var date = moment().add(3,'days');
        scope.toDate = date;
        scope.$apply();

        var anotherDate = moment().add(4,'days');
        scope.toDate = anotherDate;
        scope.$apply();

        var expectedSearchParams =
        { 'patient' : '896f5c76-2a2a-47b9-a246-c453c537985a',
          'fromDate' : moment().startOf('day').format(),
          'toDate' : moment(anotherDate).endOf('day').format() };

        expect(mockAppointmentService.getAppointments).toHaveBeenCalledWith(expectedSearchParams);
    });

    it('must call the subscribe method from the dateRangePickerEventListener service when init method is called with loadOnInit=true', function () {

        scope.init(null, null, true);
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

    });

    it("should update an appointment as cancelled", function() {

        // first do the search
        scope.init("896f5c76-2a2a-47b9-a246-c453c537985a", true);
        deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
        scope.$apply();

        scope.updateCanceledAppointment('3816596c-0d50-4cd0-aab5-922516bc9fa4');

        expect(scope.allAppointments[0].status.code).toBe("CANCELLED");
        expect(scope.allAppointments[0].status.name).toBe("Cancelled");
        expect(scope.allAppointments[0].status.type).toBe("CANCELLED");

   });

    it("should update an appointment as cancelled when appointmentscheduling.cancelAppointment.success event broadcast", function() {

        // first do the search
        scope.init("896f5c76-2a2a-47b9-a246-c453c537985a", true);
        deferred.resolve(upcomingAppointmentsTest.expectedAppointment);
        scope.$apply();

        scope.$broadcast('appointmentscheduling.cancelAppointment.success', '3816596c-0d50-4cd0-aab5-922516bc9fa4');

        expect(scope.allAppointments[0].status.code).toBe("CANCELLED");
        expect(scope.allAppointments[0].status.name).toBe("Cancelled");
        expect(scope.allAppointments[0].status.type).toBe("CANCELLED");

    });


});