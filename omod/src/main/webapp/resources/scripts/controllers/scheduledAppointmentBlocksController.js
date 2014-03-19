angular.module('appointmentscheduling.scheduledAppointmentBlocks')
    .controller('ScheduledAppointmentBlockController', ['$scope','AppointmentService',
           'LocationService', 'ngGridPaginationFactory',
function ($scope, AppointmentService, LocationService, ngGridPaginationFactory) {
    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;
    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.scheduledAppointmentBlocksGrid = scheduledAppointmentBlocksHelper.setUpGrid($scope);

    $scope.filterDate = Date.now();
    $scope.datePicker = scheduledAppointmentBlocksHelper.setupDatePicker($scope);
    $scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: ""}];
    $scope.serviceFilter = $scope.services[0];
    $scope.serviceFilterChange = false

    $scope.filterOptions = { filterText: '', useExternalFilter: false};
    $scope.filterObjects = { provider: "", serviceType: "", appointmentBlock: ""};

    var locationSearchParams = {};
    if (supportsAppointmentsTagUuid) {
        locationSearchParams['tag'] = supportsAppointmentsTagUuid;
    };

    LocationService.getLocations(locationSearchParams).then(function (result){
        $scope.locations = result;
        scheduledAppointmentBlocksHelper.setUpLocationFilter($scope);
    });

    $scope.updatePagingData = function(){

        $scope.scheduledAppointmentBlocks =  $scope.setPagingData($scope.totalScheduledAppointmentBlocks);
        $scope.totalServerItems = $scope.totalScheduledAppointmentBlocks.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    ngGridPaginationFactory.includePagination($scope, $scope.scheduledAppointmentBlocksGrid, $scope.updatePagingData);

    $scope.getScheduledAppointmentBlocks = function(){

        var getDateParam = function () {
            var date = new Date(Date.now());
            if($scope.filterDate)
                date = new Date($scope.filterDate);
            return moment(date).format('YYYY-MM-DD');
        };

        var getLocationParam = function (){
            return $scope.locationFilter.uuid;
        };

        var getServiceTypeParam = function () {
            return $scope.serviceFilter.uuid;
        };

        if($scope.filterDate && $scope.locationFilter){

            var params = {};
            params.date =  getDateParam();
            params.location = getLocationParam();
            params.appointmentType = getServiceTypeParam();

            scheduledAppointmentBlocksHelper.initializeMessages($scope);

            AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
                parsedScheduledAppointmentBlocks = appointmentParser.parseScheduledAppointmentBlocks(results);

                $scope.scheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;
                $scope.totalScheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;

                scheduledAppointmentBlocksHelper.findProvidersFromGrid($scope);
                scheduledAppointmentBlocksHelper.findAppointmentBlockFromGrid($scope);

                if(!$scope.serviceFilterChange)
                    scheduledAppointmentBlocksHelper.findServiceTypesFromGrid($scope);

                scheduledAppointmentBlocksHelper.manageMessages($scope);
                $scope.updatePagingData();
            })
            .catch(function() {
                 emr.errorMessage("appointmentschedulingui.scheduleAppointment.invalidSearchParameters");
                 scheduledAppointmentBlocksHelper.manageMessages($scope);
             });

            $scope.pagingOptions.currentPage = 1;
        }

    };

    $scope.newSelectedProvider = function(provider){
        if(provider == emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders"))
            $scope.filterObjects.provider = '';
        else $scope.filterObjects.provider = emr.message("appointmentschedulingui.dailyScheduledAppointments.provider") + ':' + provider + ';';
        $scope.updateFilters();
    };

    $scope.newSelectedServiceType = function(){
        $scope.serviceFilterChange =true;
    };

    $scope.newSelectedAppointmentBlock = function(appointmentBlock){
        if(appointmentBlock == emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks"))
            $scope.filterObjects.appointmentBlock = '';
        else {
            var filterTextAppointmentBlock =  appointmentBlock.replace(/:/g, "\\x3a");
            $scope.filterObjects.appointmentBlock = emr.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") + ':' + filterTextAppointmentBlock + ';';
        }
        $scope.updateFilters();
    };

    $scope.updateFilters = function () {
        $scope.filterOptions.filterText = $scope.filterObjects.provider + $scope.filterObjects.serviceType + $scope.filterObjects.appointmentBlock;
    }

    $scope.$watch('filterDate', $scope.getScheduledAppointmentBlocks,true);
    $scope.$watch('locationFilter', $scope.getScheduledAppointmentBlocks,true);
    $scope.$watch('serviceFilter', $scope.getScheduledAppointmentBlocks,true);

    var filtersDateAndLocationInitialized = function(){
        return $scope.filterDate && $scope.locationFilter;
    }
}]);
