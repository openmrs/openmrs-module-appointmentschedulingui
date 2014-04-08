describe('AppointmentCheckInTagCtrl', function() {

    appointmentCheckInTagPatientUuid = '123';
    appointmentCheckInTagLocationUuid = 'abc';
    appointmentCheckInTagDate = new Date();

    // mock the HFE getValue and getField functions
    getValue = function() { return null }
    getField = function() { return null }

    var $scope;
    var $rootScope;
    var $controller;
    var createController;
    var q;
    var deferredGetAppointments;;

    beforeEach(module('appointmentscheduling.appointmentCheckInTag'));

    beforeEach(module(function($provide) {
        $provide.value('AppointmentService', mockAppointmentService);
    }))

    beforeEach(inject(function($injector, $q) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        q = $q;

        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('AppointmentCheckInTagCtrl', {
                '$scope': $scope
            });
        };
    }));

    // create mock Appointment resource
    var mockAppointmentService = jasmine.createSpyObj('Appointment', ['getAppointments']);
    mockAppointmentService.getAppointments.andCallFake(function() {
        deferredGetAppointments = q.defer();
        return deferredGetAppointments.promise;
    })

    it('should initialize appointment information', function() {

        var controller = createController();

        expect(mockAppointmentService.getAppointments)
            .toHaveBeenCalledWith({ "fromDate": moment(appointmentCheckInTagDate).startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
                                    "toDate": moment(appointmentCheckInTagDate).endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
                                    "patient": appointmentCheckInTagPatientUuid, status: "SCHEDULED" });

        deferredGetAppointments.resolve([
            { "timeSlot":
                {
                    "appointmentBlock":
                    {
                      "location": { uuid: "abc" }
                    }
                }
            },
            { "timeSlot":
                {
                    "appointmentBlock":
                    {
                        "location":  { uuid: "def" }
                    }
                }
            },
            { "timeSlot":
                {
                    "appointmentBlock":
                    {
                        "location":  { uuid: "def" }
                    }
                }
            }
        ])

        $rootScope.$apply(); // see testing section of http://docs.angularjs.org/api/ng/service/$q

        expect($scope.appointmentsToCheckIn.length).toBe(1);
        expect($scope.otherAppointmentsOnSameDay.length).toBe(2);

    });
});