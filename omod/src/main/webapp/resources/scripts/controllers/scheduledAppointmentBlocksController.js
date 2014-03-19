angular.module('appointmentscheduling.scheduledAppointmentBlocks')
    .controller('ScheduledAppointmentBlockController', ['$scope','AppointmentService',
           'LocationService', 'ngGridPaginationFactory', 'filterFilter',
function ($scope, AppointmentService, LocationService, ngGridPaginationFactory, filterFilter) {
    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;
    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.filteredScheduledAppointmentBlocks = [];
    $scope.scheduledAppointmentBlocksGrid = scheduledAppointmentBlocksHelper.setUpGrid($scope);

    $scope.filterDate = Date.now();
    $scope.datePicker = scheduledAppointmentBlocksHelper.setupDatePicker($scope);
    $scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: ""}];
    $scope.serviceFilter = $scope.services[0];
    $scope.serviceFilterChange = false

    $scope.initializeFilterObject = function (){
        $scope.filterObjects = { provider: "", serviceType: "", appointmentBlock: ""};
    }

    var locationSearchParams = {};
    if (supportsAppointmentsTagUuid) {
        locationSearchParams['tag'] = supportsAppointmentsTagUuid;
    };

    LocationService.getLocations(locationSearchParams).then(function (result){
        $scope.locations = result;
        scheduledAppointmentBlocksHelper.setUpLocationFilter($scope);
    });

    $scope.updatePagingData = function(){

        $scope.filteredScheduledAppointmentBlocks =  $scope.setPagingData($scope.filteredScheduledAppointmentBlocks);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    ngGridPaginationFactory.includePagination($scope, $scope.scheduledAppointmentBlocksGrid, $scope.updatePagingData);

    var getSearchParams = function () {
        var params = {};
        params.date =  moment(new Date($scope.filterDate)).format('YYYY-MM-DD');
        params.location = $scope.locationFilter.uuid;
        params.appointmentType = $scope.serviceFilter.uuid;
        return params;
    }

    $scope.getScheduledAppointmentBlocks = function(){

        if($scope.filterDate && $scope.locationFilter){

            scheduledAppointmentBlocksHelper.initializeMessages($scope);

            AppointmentService.getScheduledAppointmentBlocks(getSearchParams()).then( function(results){
                parsedScheduledAppointmentBlocks = appointmentParser.parseScheduledAppointmentBlocks(results);

                $scope.scheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;
                $scope.totalScheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;

                scheduledAppointmentBlocksHelper.findProvidersFromGrid($scope);
                scheduledAppointmentBlocksHelper.findAppointmentBlockFromGrid($scope);

                if(!$scope.serviceFilterChange)
                    scheduledAppointmentBlocksHelper.findServiceTypesFromGrid($scope);

                scheduledAppointmentBlocksHelper.manageMessages($scope);
                $scope.initializeFilterObject();
                $scope.updateFilter();
            })
            .catch(function() {
                 emr.errorMessage("appointmentschedulingui.scheduleAppointment.invalidSearchParameters");
                 scheduledAppointmentBlocksHelper.manageMessages($scope);
             });

            $scope.pagingOptions.currentPage = 1;
        }

    };

    $scope.updateFilter = function() {
        $scope.filteredScheduledAppointmentBlocks = filterFilter($scope.scheduledAppointmentBlocks,
            {date: $scope.filterObjects.appointmentBlock, provider: $scope.filterObjects.provider });
        $scope.updatePagingData();
    }

    $scope.newSelectedProvider = function(provider){
        if(provider == emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders"))
            $scope.filterObjects.provider = '';
        else $scope.filterObjects.provider =  provider;
        $scope.updateFilter();
    };

    $scope.newSelectedServiceType = function(){
        $scope.serviceFilterChange =true;
    };

    $scope.newSelectedAppointmentBlock = function(appointmentBlock){
        if(appointmentBlock == emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks"))
            $scope.filterObjects.appointmentBlock = '';
        else $scope.filterObjects.appointmentBlock =  appointmentBlock ;
        $scope.updateFilter();
    };

    $scope.$watch('filterDate', $scope.getScheduledAppointmentBlocks,true);
    $scope.$watch('locationFilter', $scope.getScheduledAppointmentBlocks,true);
    $scope.$watch('serviceFilter', $scope.getScheduledAppointmentBlocks,true);

}]);
