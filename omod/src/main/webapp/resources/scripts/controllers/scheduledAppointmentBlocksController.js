angular.module('appointmentscheduling.scheduledAppointmentBlocks')
    .controller('ScheduledAppointmentBlockController', ['$scope','AppointmentService',
           'LocationService', 'ngGridPaginationFactory', 'filterFilter',  'RESTErrorResponse', 'Parse', 'scheduledAppointmentBlocksHelper' ,
function ($scope, AppointmentService, LocationService, ngGridPaginationFactory, filterFilter, RESTErrorResponse, Parse, scheduledAppointmentBlocksHelper) {
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

    $scope.initializeFilters = function (){
        $scope.filterObjects = { provider: "", appointmentBlock: ""};

        $scope.providers = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders")];
        $scope.providerFilter = $scope.providers[0];

        $scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: null}];
        $scope.serviceFilter = $scope.services[0];

        $scope.appointmentBlocks = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks")];
        $scope.appointmentBlockFilter = $scope.appointmentBlocks[0];
    }

    var locationSearchParams = {};
    if (supportsAppointmentsTagUuid) {
        locationSearchParams['tag'] = supportsAppointmentsTagUuid;
    };

    LocationService.getLocations(locationSearchParams).then(function (result){
        $scope.locations = result;
        $scope.locationFilter = scheduledAppointmentBlocksHelper.selectLocationToFilter($scope.locations);
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
                parsedScheduledAppointmentBlocks = Parse.scheduledAppointmentBlocks(results);

                $scope.scheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;
                $scope.totalScheduledAppointmentBlocks = parsedScheduledAppointmentBlocks;

                scheduledAppointmentBlocksHelper.findProvidersFromGrid($scope);
                scheduledAppointmentBlocksHelper.findAppointmentBlockFromGrid($scope);

                if($scope.filterDateOrLocationChanged) {
                    scheduledAppointmentBlocksHelper.findServiceTypesFromGrid($scope);
                }

                scheduledAppointmentBlocksHelper.manageMessages($scope);
                $scope.updateFilter();
            })
            .catch(function(response) {
                    var errorResponse = new RESTErrorResponse(response);
                    var message = errorResponse.response.data.exception.message;
                    emr.errorMessage(message);
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

    $scope.newSelectedAppointmentBlock = function(appointmentBlock){
        if(appointmentBlock == emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks"))
            $scope.filterObjects.appointmentBlock = '';
        else $scope.filterObjects.appointmentBlock =  appointmentBlock ;
        $scope.updateFilter();
    };

    $scope.$watch('filterDate', function(){
        $scope.initializeFilters();
        $scope.filterDateOrLocationChanged = true;
        $scope.getScheduledAppointmentBlocks();

    });

    $scope.$watch('locationFilter', function(){
        $scope.initializeFilters();
        $scope.filterDateOrLocationChanged = true;
        $scope.getScheduledAppointmentBlocks();

    });

    $scope.$watch('serviceFilter', function(newService, oldService){
        if(newService.uuid != oldService.uuid) {
            $scope.filterDateOrLocationChanged = false;
            $scope.getScheduledAppointmentBlocks();
        }

    });

}]);
