angular.module('appointmentscheduling.scheduledAppointmentBlocks', ['appointmentscheduling.appointmentService', 'locationService', 'ui.bootstrap', 'ngGrid'])
    .controller('ScheduledAppointmentBlockController', function ($scope, AppointmentService, LocationService) {

    var locationSearchParams = {};
    if (supportsAppointmentsTagUuid) {
        locationSearchParams['tag'] = supportsAppointmentsTagUuid;
    };

    LocationService.getLocations(locationSearchParams).then(function (result){
            $scope.locations = result;
            appointmentHelper.setUpLocationFilter($scope);
    });

    $scope.filterDate = Date.now();
    $scope.datePicker = appointmentHelper.setupDatePicker($scope);

    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;
    $scope.filterOptions = {
      filterText: ''  ,
      useExternalFilter: false
    };

    $scope.filterObjects = { provider: "", serviceType: "", appointmentBlock: ""};

    $scope.newSelectedProvider = function(provider){
        if(provider == 'All providers') $scope.filterObjects.provider = '';
        else $scope.filterObjects.provider = 'provider:' + provider + ';';
        $scope.updateFilters();
    };

    $scope.newSelectedServiceType = function(serviceType){
        if(serviceType == 'All service types') $scope.filterObjects.serviceType = '';
        else $scope.filterObjects.serviceType = 'service: ' + serviceType + ';';
        $scope.updateFilters();
    };

    $scope.newSelectedAppointmentBlock = function(appointmentBlock){
        if(appointmentBlock == 'All appointment blocks') $scope.filterObjects.appointmentBlock = '';
        else {
            var filterTextAppointmentBlock =  appointmentBlock.replace(/:/g, "\\x3a");
            $scope.filterObjects.appointmentBlock = 'time:' + filterTextAppointmentBlock + ';';
        }
        $scope.updateFilters();
    };

    $scope.updateFilters = function () {
        $scope.filterOptions.filterText = $scope.filterObjects.provider + $scope.filterObjects.serviceType + $scope.filterObjects.appointmentBlock;
    }

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
        var location = $scope.locationFilter;
        var params = { 'date' : moment(date).format('YYYY-MM-DD'),
                       'location' : location.uuid};

        appointmentHelper.initializeMessages($scope);

        AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
            parsedScheduledAppointmentBlocks = appointmentParser.parseScheduledAppointmentBlocks(results);
            $scope.scheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;
            $scope.totalScheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;
            appointmentHelper.findProvidersFromGrid($scope);
            appointmentHelper.findServiceTypesFromGrid($scope);
            appointmentHelper.findAppointmentBlockFromGrid($scope);
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