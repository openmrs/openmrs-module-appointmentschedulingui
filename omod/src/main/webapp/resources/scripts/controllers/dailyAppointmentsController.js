angular.module('appointmentscheduling.dailyAppointments')
    .controller('DailyAppointmentsController', ['$scope','AppointmentService',
           'LocationService', 'ngGridHelper', 'filterFilter',  'RESTErrorResponse', 'dailyAppointmentsHelper' ,
function ($scope, AppointmentService, LocationService, ngGridHelper, filterFilter, RESTErrorResponse, dailyAppointmentsHelper) {

    $scope.showNoDailyAppointments = false;
    $scope.showLoadingMessage = false;
    $scope.dailyAppointments = [];
    $scope.totalDailyAppointments = [];
    $scope.filteredScheduledAppointments = [];
    $scope.paginatedScheduledAppointments = [];
    $scope.dailyAppointmentsGrid = dailyAppointmentsHelper.setUpGrid();

    $scope.filterObjects = {};
    $scope.filterDate = Date.now();
    $scope.datePicker = dailyAppointmentsHelper.setupDatePicker($scope);
    $scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: ""}];

    $scope.initializeFilters = function (){

        // reset the client-side filters
        // note that we don't reset the appointment status filter since that holds state even if we do another server-side request
        $scope.filterObjects.provider = "";
        $scope.filterObjects.appointmentTypes = "";

        $scope.providers = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders")];
        $scope.providerFilter = $scope.providers[0];

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
        $scope.locationFilter = dailyAppointmentsHelper.selectLocationToFilter($scope.locations);
    });

    var getSearchParams = function () {
        var params = {};
        params.date =  moment(new Date($scope.filterDate)).format('YYYY-MM-DD');
        params.location = $scope.locationFilter.uuid;
        return params;
    }

    $scope.updatePagingData = function(){

        $scope.paginatedScheduledAppointments =  $scope.setPagingData($scope.filteredScheduledAppointments);
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.updateSort =  function () {
        if ($scope.sortInfo.fields.length == 0) { return; }

        // sort just on whatever the first item is in the sortInfo list
        // (note that we put scopeInfo on the scope in ngGridHelper
        var direction = $scope.sortInfo.directions[0];
        var field = $scope.sortInfo.fields[0];

        $scope.filteredScheduledAppointments.sort(function (a, b) {
            if (direction == "asc") {
                if (!a[field]) {
                    return -1;
                }
                if (!b[field]) {
                    return 1;
                }
                else {
                    return a[field] > b[field] ? 1 : -1;
                }
            } else {
                if (!a[field]) {
                    return 1;
                }
                if (!b[field]) {
                    return -1;
                }
                else {
                    return a[field] > b[field] ? -1 : 1;
                }
            }
        })

    }

    // set up pagination and sorting
    ngGridHelper.includePagination($scope, $scope.dailyAppointmentsGrid, $scope.updatePagingData);
    ngGridHelper.includeSorting($scope, $scope.dailyAppointmentsGrid,
        { fields: ['startDatetime', 'provider'], directions: ['asc', 'asc'] },
        $scope.updatePagingData, $scope.updateSort);

    $scope.getDailyAppointments = function(){

        if($scope.filterDate && $scope.locationFilter){

            dailyAppointmentsHelper.initializeMessages($scope);

            AppointmentService.getDailyAppointmentsDataSet(getSearchParams()).then( function(results){
                $scope.dailyAppointments = results.rows;
                dailyAppointmentsHelper.findProvidersFromGrid($scope);
                dailyAppointmentsHelper.manageMessages($scope);
                $scope.updateFilter();
            })
            .catch(function(response) {
                    var errorResponse = new RESTErrorResponse(response);
                    var message = errorResponse.response.data.exception.message;
                    emr.errorMessage(message);
                    dailyAppointmentsHelper.manageMessages($scope);
             });


            $scope.pagingOptions.currentPage = 1;
        }
    };

    $scope.updateFilter = function() {
        // do a deep clone so that we can modify the filterBlocks array without losing any data
        var filteredAppts = jq().extend(true, [], $scope.dailyAppointments);     // bit of a hack that we use jq() instead of jq so it is easy to mock

        $scope.filteredScheduledAppointments = dailyAppointmentsHelper
            .filterByAppointmentStatusType(filteredAppts, $scope.filterObjects.appointmentStatusType);
        $scope.filteredScheduledAppointments = dailyAppointmentsHelper.
            filterByProvider($scope.filteredScheduledAppointments, $scope.filterObjects.provider);
        $scope.filteredScheduledAppointments = dailyAppointmentsHelper.
            filterByAppointmentType($scope.filteredScheduledAppointments, $scope.filterObjects.appointmentTypes);

        $scope.updateSort();
        $scope.updatePagingData();
    }

    // bound to the provider dropdown via ng-change
    $scope.newSelectedProvider = function(provider){
        if(provider == emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders"))
            $scope.filterObjects.provider = '';
        else $scope.filterObjects.provider =  provider;
        $scope.updateFilter();
    };

    // bound to the status type dropdown via ng-change
    $scope.newSelectedAppointmentStatusType = function(appointmentStatusType){
        if(appointmentStatusType == emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentStatuses")) {
            $scope.filterObjects.appointmentStatusType = '';
        } else {
            $scope.filterObjects.appointmentStatusType =  appointmentStatusType;
        }
        $scope.updateFilter();
    };


    $scope.$on('selectMultipleAppointmentTypesApp.selectionChanged', function (event, eventData) {
        $scope.appointmentTypeFilter = eventData.data;
        $scope.filterObjects.appointmentTypes = dailyAppointmentsHelper.getUuidsListFromAppointmentTypesList($scope.appointmentTypeFilter);
        $scope.updateFilter();
    });

    // date and location are filtered server-side, so we need to initialize the filters and do a new search request here
    $scope.$watch('filterDate', function(){
        $scope.initializeFilters();
        $scope.getDailyAppointments();

    });

    // date and location are filtered server-side, so we need to initialize the filters and do a new search request here
    $scope.$watch('locationFilter', function(){
        $scope.initializeFilters();
        $scope.getDailyAppointments();

    });

}]);
