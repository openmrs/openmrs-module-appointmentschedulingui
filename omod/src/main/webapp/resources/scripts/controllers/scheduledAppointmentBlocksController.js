angular.module('appointmentscheduling.scheduledAppointmentBlocks')
    .controller('ScheduledAppointmentBlockController', ['$scope','AppointmentService',
           'LocationService', 'ngGridPaginationFactory', 'filterFilter',  'RESTErrorResponse', 'Parse', 'scheduledAppointmentBlocksHelper' ,
function ($scope, AppointmentService, LocationService, ngGridPaginationFactory, filterFilter, RESTErrorResponse, Parse, scheduledAppointmentBlocksHelper) {

    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;
    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.filteredScheduledAppointmentBlocks = [];
    $scope.paginatedScheduledAppointmentBlocks = [];
    $scope.displayPhoneNumber = emr.message("appointmentschedulingui.dailyScheduledAppointments.phoneNumber");
    $scope.displayDossierNumber = emr.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber");
    $scope.displayPatientId = emr.message("appointmentschedulingui.dailyScheduledAppointments.patientId");
    $scope.scheduledAppointmentBlocksGrid = scheduledAppointmentBlocksHelper.setUpGrid();

    $scope.filterDate = Date.now();
    $scope.datePicker = scheduledAppointmentBlocksHelper.setupDatePicker($scope);
    $scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: ""}];

    $scope.initializeFilters = function (){
        $scope.filterObjects = { provider: "", appointmentBlock: ""};

        $scope.providers = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders")];
        $scope.providerFilter = $scope.providers[0];

        $scope.appointmentBlocks = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks")];
        $scope.appointmentBlockFilter = $scope.appointmentBlocks[0];

        if (!$scope.appointmentStatusTypes ) {
            $scope.appointmentStatusTypes = [];
            $scope.appointmentStatusTypes.push({ localizedDisplayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentStatuses"),
                                                 value: ''});
            $scope.appointmentStatusTypeFilter = $scope.appointmentStatusTypes[0].value;
        }

    }

    // initialize appointment status types
    AppointmentService.getAppointmentStatusTypes().then(function (result) {
        for (var i = 0; i < result.length; i++){
            $scope.appointmentStatusTypes.push({ localizedDisplayName: emr.message("appointmentschedulingui.scheduleAppointment.status.type." + result[i].toLowerCase()),
                                                 value: result[i]});
        }
    });

    var locationSearchParams = {};
    if (supportsAppointmentsTagUuid) {
        locationSearchParams['tag'] = supportsAppointmentsTagUuid;
    };

    LocationService.getLocations(locationSearchParams).then(function (result){
        $scope.locations = result;
        $scope.locationFilter = scheduledAppointmentBlocksHelper.selectLocationToFilter($scope.locations);
    });

    $scope.updatePagingData = function(){

        $scope.paginatedScheduledAppointmentBlocks =  $scope.setPagingData($scope.filteredScheduledAppointmentBlocks);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    ngGridPaginationFactory.includePagination($scope, $scope.scheduledAppointmentBlocksGrid, $scope.updatePagingData);

    var getSearchParams = function () {
        var params = {};
        params.date =  moment(new Date($scope.filterDate)).format('YYYY-MM-DD');
        params.location = $scope.locationFilter.uuid;
        params.appointmentType = getUuidsListFromAppointmentTypesList($scope.appointmentTypeFilter);
        return params;
    }

    var getUuidsListFromAppointmentTypesList = function (appointmentTypesList) {
        var appointmentTypeUuidsList = [];
        if (appointmentTypesList) {
            for (var index = 0; index < appointmentTypesList.length; index++) {
                appointmentTypeUuidsList.push(appointmentTypesList[index].uuid);
            }
        }
        return appointmentTypeUuidsList;
    }

    $scope.getScheduledAppointmentBlocks = function(){

        if($scope.filterDate && $scope.locationFilter){

            scheduledAppointmentBlocksHelper.initializeMessages($scope);

            AppointmentService.getScheduledAppointmentBlocks(getSearchParams()).then( function(results){
                $scope.scheduledAppointmentBlocks = Parse.scheduledAppointmentBlocks(results);

                scheduledAppointmentBlocksHelper.findProvidersFromGrid($scope);
                scheduledAppointmentBlocksHelper.findAppointmentBlockFromGrid($scope);

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
        // do a deep clone so that we can modify the filterBlocks array without losing any data
        var filteredBlocks = jq().extend(true, [], $scope.scheduledAppointmentBlocks);     // bit of a hack that we use jq() instead of jq so it is easy to mock
        filteredBlocks = filterFilter(filteredBlocks,
            {date: $scope.filterObjects.appointmentBlock, provider: $scope.filterObjects.provider });
        $scope.filteredScheduledAppointmentBlocks = filterByAppointmentStatusType(filteredBlocks,
            $scope.filterObjects.appointmentStatusType);
        $scope.updatePagingData();
    }

    var filterByAppointmentStatusType = function(appointmentBlocksToFilter, appointmentStatusType){

        if (appointmentStatusType && appointmentStatusType.length > 0 ) {
            if (appointmentBlocksToFilter) {
                for (var i= appointmentBlocksToFilter.length-1; i>=0; i--) {
                    var appointmentBlock = appointmentBlocksToFilter[i];
                    var patients = appointmentBlock.patients;
                    if (patients) {
                        var filteredPatients = patients.filter(function(patient) {
                            return (patient.appointmentStatus.type == appointmentStatusType );
                        });
                        if (filteredPatients && filteredPatients.length > 0) {
                            appointmentBlock.patients = filteredPatients;
                        } else {
                            appointmentBlocksToFilter.splice(i,1);
                        }
                    }
                }
            }
        }

        return appointmentBlocksToFilter;
    };

    $scope.newSelectedProvider = function(provider){
        if(provider == emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders"))
            $scope.filterObjects.provider = '';
        else $scope.filterObjects.provider =  provider;
        $scope.updateFilter();
    };

    $scope.newSelectedAppointmentStatusType = function(appointmentStatusType){
        if(appointmentStatusType == emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentStatuses")) {
            $scope.filterObjects.appointmentStatusType = '';
        } else {
            $scope.filterObjects.appointmentStatusType =  appointmentStatusType;
        }
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
        $scope.getScheduledAppointmentBlocks();

    });

    $scope.$watch('locationFilter', function(){
        $scope.initializeFilters();
        $scope.getScheduledAppointmentBlocks();

    });

    $scope.$on('selectMultipleAppointmentTypesApp.selectionChanged', function (event, eventData) {
        $scope.appointmentTypeFilter = eventData.data;
        $scope.getScheduledAppointmentBlocks();
    });


}]);
