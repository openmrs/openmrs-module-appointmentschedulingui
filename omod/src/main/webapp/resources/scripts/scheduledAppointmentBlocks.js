angular.module('appointmentscheduling.scheduledAppointmentBlocks', ['appointmentscheduling.appointmentService', 'locationService', 'ui.bootstrap', 'ngGrid'])
    .controller('ScheduledAppointmentBlockController', function ($scope, AppointmentService, LocationService) {

    $scope.filterDate = Date.now();
    $scope.datePicker = appointmentHelper.setupDatePicker($scope);

    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;

    function setFilterLocationToSessionLocation(){
        if( sessionLocationUuid){
        angular.forEach($scope.locations, function(location) {
            if (location.uuid == sessionLocationUuid) {
                $scope.locationFilter = location;
            }
        });
        }
    }

    function setFilterLocationToDefault(){
        if( $scope.locations && $scope.locations.length > 0) {
            $scope.locationFilter = $scope.locations[0];
        }
    }

    function setUpLocationFilter() {

        var locationSearchParams = {};

        if (supportsAppointmentsTagUuid) {
                locationSearchParams['tag'] = supportsAppointmentsTagUuid;
        };

        LocationService.getLocations(locationSearchParams).then(function (result) {
            $scope.locations = result;

            setFilterLocationToSessionLocation();

            if (!$scope.locationFilter){
                setFilterLocationToDefault();
            }
        });
    };

    $scope.locations = [];
    setUpLocationFilter();

    $scope.pagingOptions = {
        pageSizes: [5],
        pageSize: 5,
        currentPage: 1
    };

    $scope.scheduledAppointmentBlocksGrid = appointmentHelper.setUpGrid($scope);

    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.totalServerItems = 0;
    $scope.updatePagingData = function() {
        appointmentHelper.setPagingData($scope);
    };

    $scope.getScheduledAppointmentBlocks = function(){
        var date = new Date($scope.filterDate);
        var params = { 'date' : moment(date).format('YYYY-MM-DD'),
                       'location' : $scope.locationFilter.uuid};

        appointmentHelper.initializeMessages($scope);

        AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
            appointmentParser.parseScheduledAppointmentBlocks(results);

            $scope.scheduledAppointmentBlocks = results;
            $scope.totalScheduledAppointmentBlocks = results;

            appointmentHelper.manageMessages($scope);
            appointmentHelper.setPagingData($scope);
        });
    };

    $scope.$watch('pagingOptions', $scope.updatePagingData, true);
    $scope.$watch('filterDate', $scope.getScheduledAppointmentBlocks, true);
    $scope.$watch('locationFilter', function(newValue, oldValue) {
            if (newValue!= oldValue) {
                $scope.getScheduledAppointmentBlocks();
            }
    })

});