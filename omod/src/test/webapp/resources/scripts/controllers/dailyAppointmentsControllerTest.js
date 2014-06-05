
describe('DailyAppointmentsController', function() {

    var scope;
    var mockLocationService,mockNgGridHelper, mockHelper, mockAppointmentService, mockFilterFilter;

    var deferredLocations;
    var deferredAppointmentStatusTypes;
    var deferredDailyAppointmentsDataSet;

    beforeEach(module('appointmentscheduling.dailyAppointments'));

    beforeEach(inject(function($rootScope, $controller, $q) {

        scope = $rootScope.$new();
        scope.pagingOptions = { currentPage: 1};
        deferredLocations = $q.defer();
        deferredAppointmentStatusTypes = $q.defer();
        deferredDailyAppointmentsDataSet = $q.defer();

        mockLocationService = jasmine.createSpyObj('LocationService', ['getLocations']);
        mockLocationService.getLocations.andCallFake(function () { return deferredLocations.promise });

        mockHelper = jasmine.createSpyObj('dailyAppointmentsHelper', ['setUpGrid','selectLocationToFilter', 'setupDatePicker',
            'initializeMessages', 'findProvidersFromGrid', 'manageMessages', 'getUuidsListFromAppointmentTypesList',
            'filterByAppointmentStatusType', 'filterByAppointmentType', 'filterByProvider']);
        mockHelper.selectLocationToFilter.andCallFake(function () { return  { display: "location 1", uuid: "location uuid"} })

        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getDailyAppointmentsDataSet', 'getAppointmentStatusTypes']);
        mockAppointmentService.getDailyAppointmentsDataSet.andCallFake(function () { return deferredDailyAppointmentsDataSet.promise });
        mockAppointmentService.getAppointmentStatusTypes.andCallFake(function () { return deferredAppointmentStatusTypes.promise });

        mockNgGridHelper = jasmine.createSpyObj('ngGridHelper', ['includePagination', 'includeSorting']);

        mockFilterFilter = jasmine.createSpy('filterFilter');

        scope.dailyAppointments = [];
        scope.setPagingData = function(){};

        $controller('DailyAppointmentsController', {$scope: scope, AppointmentService: mockAppointmentService,
            LocationService: mockLocationService, ngGridHelper: mockNgGridHelper,
            filterFilter: mockFilterFilter, RESTErrorResponse: {}, dailyAppointmentsHelper: mockHelper});
        scope.initializeFilters();
    }));

    describe('when controller is initialized', function(){

        it('should get locations for scheduled appointments', function() {
            var locationSearchParams =   { tag: supportsAppointmentsTagUuid};
            var expectedLocations = [{ display: "location 1", uuid: "location uuid"}, { display: "location 2", uuid: "location 2 uuid"}];

            deferredLocations.resolve(expectedLocations);

            scope.$apply();

            expect(mockLocationService.getLocations).toHaveBeenCalledWith(locationSearchParams);
            expect(scope.locations).toBe(expectedLocations);
            expect(mockHelper.selectLocationToFilter).toHaveBeenCalled();
            expect(scope.locationFilter.display).toBe(expectedLocations[0].display);
            expect(scope.locationFilter.uuid).toBe(expectedLocations[0].uuid);
        });

        it('should initialized date filter', function(){
            expect(scope.filterDate).toBeDefined();
            expect(mockHelper.setupDatePicker).toHaveBeenCalled();
        });
    });

    describe('when date or location filter changed', function() {

        beforeEach( function(){
            scope.locationFilter = { display: "location 1", uuid: "uuid of location"};
            emr.message.andCallFake( function(){ return ""});
            scope.$apply();
        });

        it('looks for daily appointment blocks data set', function(){
            expect(mockAppointmentService.getDailyAppointmentsDataSet).toHaveBeenCalled();
        });

        it('initialize provider, service type and appointment block filter', function(){

            expect(scope.providers).toEqual([""]);
            expect(scope.services).toEqual([{ name : '', uuid : '' } ]);
        })
    });


    describe('when service type is changed', function(){
        beforeEach( function(){
            scope.filterDate =  Date.parse('2012-1-03');
            scope.locationFilter = { display: "location 1", uuid: "uuid of location"};
            scope.appointmentTypeFilter = [ { name: "all services", uuid: ""} ];
            scope.updateSort = function(){};  // stub out the sort functionality, not testing it here
            scope.$apply();

            scope.$emit('selectMultipleAppointmentTypesApp.selectionChanged', { data:[ { name: 'service 1', uuid: "uuid of service" } ] });
            scope.$apply();
        });

        it('appointment type filter should be updated', function() {
            expect(scope.appointmentTypeFilter[0].name).toBe("service 1");
            expect(scope.appointmentTypeFilter[0].uuid).toBe("uuid of service");
        })

    })

    describe('when have results of scheduled appointment block', function(){

        beforeEach( function(){
                deferredLocations.resolve();
                deferredDailyAppointmentsDataSet.resolve({rows: []});
                scope.updateSort = function(){};  // stub out the sort functionality, not testing it here
                scope.$apply();
        });

        it('should populate provider filter', function() {
            expect(mockHelper.findProvidersFromGrid).toHaveBeenCalled();

        });

    });



});