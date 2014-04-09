
describe('ScheduledAppointmentBlocksController', function() {

    var scope;
    var mockLocationService,mockNgGridPaginationFactory, mockHelper, mockAppointmentService, mockParser, mockFilterFilter;
    var promise;
    var deferred;

    var expectedScheduledAppointmentBlocksResults =  [
        {
            "appointmentBlock": {
                "uuid": "d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                "startDate": "2014-02-14T16:00:00.000-0200",
                "endDate": "2014-02-14T21:00:00.000-0200",
                "provider": {
                    "uuid": "7f32a747-e410-4b41-9e60-41a31d50c20e",
                    "person": {
                        "uuid": "f9c8d182-0424-41f4-b9e7-e83beec95245",
                        "display": "canchanya pamela"
                    }
                }
            },
            "appointments": [
                {
                    "uuid": "5421559c-fb9d-4ed5-9348-e61a2f90fc9c",
                    "display": "Charles : Scheduled",
                    "patient": {
                        "uuid": "3abda79b-809a-4eca-b428-67f606fbae42",
                        "display": "Y2GAWR - pamela pamela",
                        "identifiers": [
                            {
                                "uuid": "0ba3dcd2-929b-4800-9557-a9cbcb7bef98",
                                "display": "ZL EMR ID = Y2GAWR"
                            },
                            {
                                "uuid": "7255195d-de1d-42a2-ae8b-e5fa5d594de2",
                                "display": "Nimewo Dosye = A000015"
                            }
                        ],
                        "person": {
                            "uuid": "3abda79b-809a-4eca-b428-67f606fbae42",
                            "display": "pamela pamela"
                        }
                    },
                    "status": "SCHEDULED",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles"
                    }
                },
                {
                    "uuid": "59ba2915-def0-4031-a7b3-a371231914c6",
                    "display": "Charles : Scheduled",
                    "timeSlot": {
                        "uuid": "551397bb-521e-4e42-af67-2aef15f5d65f",
                        "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 19:00:00.0 - 2014-02-14 20:00:00.0",
                        "startDate": "2014-02-14T19:00:00.000-0200",
                        "endDate": "2014-02-14T20:00:00.000-0200",
                        "appointmentBlock": {
                            "uuid": "d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                            "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 16:00:00.0 - 2014-02-14 21:00:00.0",
                            "startDate": "2014-02-14T16:00:00.000-0200",
                            "endDate": "2014-02-14T21:00:00.000-0200",
                            "provider": {
                                "uuid": "7f32a747-e410-4b41-9e60-41a31d50c20e",
                                "display": "MADED - canchanya pamela",
                                "person": {
                                    "uuid": "f9c8d182-0424-41f4-b9e7-e83beec95245",
                                    "display": "canchanya pamela"
                                },
                                "identifier": "MADED",
                                "attributes": [],
                                "retired": false
                            },
                            "location": {
                                "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                "display": "Biwo Resepsyon"
                            },
                            "types": [
                                {
                                    "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                    "display": "Charles"
                                }
                            ],
                            "voided": false
                        },
                        "voided": false
                    },
                    "visit": null,
                    "patient": {
                        "uuid": "28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                        "display": "Y2GHPW - Mario Areias",
                        "identifiers": [
                            {
                                "uuid": "c6283c7c-3398-4bcc-8b35-734764a94304",
                                "display": "ZL EMR ID = Y2GHPW"
                            }
                        ],
                        "person": {
                            "uuid": "28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                            "display": "Mario Areias",
                            "gender": "M",
                            "age": 43,
                            "birthdate": "1970-06-19T00:00:00.000-0300",
                            "birthdateEstimated": false,
                            "dead": false,
                            "deathDate": null,
                            "causeOfDeath": null,
                            "preferredName": {
                                "uuid": "6c33a8f8-498f-4d5c-8b0f-0bf181cf2623",
                                "display": "Mario Areias"
                            },
                            "preferredAddress": {
                                "uuid": "aaa341c8-cdac-4100-8152-a1d589fb8b70",
                                "display": "Cange"
                            },
                            "attributes": [
                                {
                                    "uuid": "5e11cda8-6755-4cbe-bc1d-5b6a68b82bbe",
                                    "display": "Telephone Number = 123123123"
                                }
                            ],
                            "voided": false
                        },
                        "voided": false
                    },
                    "status": "SCHEDULED",
                    "reason": "hola doctor",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles"
                    },
                    "voided": false
                }
            ]
        }
    ];

    beforeEach(module('appointmentscheduling.scheduledAppointmentBlocks'));

    beforeEach(inject(function($rootScope, $controller, $q) {

        scope = $rootScope.$new();
        scope.pagingOptions = { currentPage: 1};
        deferred = $q.defer();
        promise = deferred.promise;

        mockLocationService = jasmine.createSpyObj('LocationService', ['getLocations']);
        mockLocationService.getLocations.andCallFake(function () { return promise; });

        mockHelper = jasmine.createSpyObj('scheduledAppointmentBlocksHelper', ['setUpGrid','selectLocationToFilter', 'setupDatePicker', 'initializeMessages', 'findProvidersFromGrid', 'findAppointmentBlockFromGrid', 'findServiceTypesFromGrid', 'manageMessages']);
        mockHelper.selectLocationToFilter.andCallFake(function () { return  { display: "location 1", uuid: "location uuid"} })
        scheduledAppointmentBlocksHelper = mockHelper;

        mockAppointmentService = jasmine.createSpyObj('AppointmentService', ['getScheduledAppointmentBlocks', 'getAppointmentStatusTypes']);
        mockAppointmentService.getScheduledAppointmentBlocks.andCallFake(function () { return promise});
        mockAppointmentService.getAppointmentStatusTypes.andCallFake(function () { return promise});

        mockNgGridPaginationFactory = jasmine.createSpyObj('ngGridPaginationFactory', ['includePagination']);

        mockParser = jasmine.createSpyObj('Parse', ['scheduledAppointmentBlocks']);
        mockParser.scheduledAppointmentBlocks.andCallFake( function() { return [];});

        mockFilterFilter = jasmine.createSpy('filterFilter');

        scope.scheduledAppointmentBlocks = [];
        scope.setPagingData = function(){};

        $controller('ScheduledAppointmentBlockController', {$scope: scope, AppointmentService: mockAppointmentService,
            LocationService: mockLocationService, ngGridPaginationFactory: mockNgGridPaginationFactory,
            filterFilter: mockFilterFilter, RESTErrorResponse: {}, Parse: mockParser , scheduledAppointmentBlocksHelper: mockHelper});
        scope.initializeFilters();
    }));

    describe('when controller is initialized', function(){

        it('should get locations for scheduled appointments', function() {
            var locationSearchParams =   { tag: supportsAppointmentsTagUuid};
            var expectedLocations = [{ display: "location 1", uuid: "location uuid"}, { display: "location 2", uuid: "location 2 uuid"}];

            deferred.resolve(expectedLocations);

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

        it('looks for scheduled appointment blocks data', function(){
            expect(mockAppointmentService.getScheduledAppointmentBlocks).toHaveBeenCalled();
        });

        it('initialize provider, service type and appointment block filter', function(){

            expect(scope.providers).toEqual([""]);
            expect(scope.services).toEqual([{ name : '', uuid : '' } ]);
            expect(scope.appointmentBlocks).toEqual([""]);
        })
    });


    describe('when service type is changed', function(){
        beforeEach( function(){

            scope.filterDate =  Date.parse('2012-1-03');
            scope.locationFilter = { display: "location 1", uuid: "uuid of location"};
            scope.appointmentTypeFilter = [ { name: "all services", uuid: ""} ];
            scope.$apply();

            scope.$emit('selectMultipleAppointmentTypesApp.selectionChanged', { data:[ { name: 'service 1', uuid: "uuid of service" } ] });
            scope.$apply();
        });

//        it('should looks for scheduled appointment blocks data', function(){
//            expect(mockAppointmentService.getScheduledAppointmentBlocks).toHaveBeenCalledWith({ date : '2012-01-03', location : 'uuid of location', appointmentType : [ 'uuid of service' ] });
//        })

        it('appointment type filter should be updated', function() {
            expect(scope.appointmentTypeFilter[0].name).toBe("service 1");
            expect(scope.appointmentTypeFilter[0].uuid).toBe("uuid of service");
        })

    })

    describe('when have results of scheduled appointment block', function(){

        beforeEach( function(){
                deferred.resolve(expectedScheduledAppointmentBlocksResults);
                scope.$apply();
        });

        it('should parse results', function(){
            expect(mockParser.scheduledAppointmentBlocks).toHaveBeenCalledWith(expectedScheduledAppointmentBlocksResults);
        })

        it('should populate provider filter', function() {
            expect(mockHelper.findProvidersFromGrid).toHaveBeenCalled();

        });

        it('should populate appointment blocks filter', function(){
            expect(mockHelper.findAppointmentBlockFromGrid).toHaveBeenCalled();
        })
    });



});