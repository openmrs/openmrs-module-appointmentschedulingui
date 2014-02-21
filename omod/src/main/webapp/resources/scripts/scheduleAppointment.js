
angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduleAppointmentCtrl', function ($scope, AppointmentService, filterFilter) {

        // model
        $scope.appointmentType = undefined;
        $scope.fromDate = undefined;
        $scope.toDate = undefined;
        $scope.filterText = '';
        $scope.timeSlots = [];
        $scope.filteredTimeSlots = [];
        $scope.selectedTimeSlot = undefined;
        $scope.appointmentReason = '';
        $scope.allAppointmentTypes = [];
        $scope.timeframe= {
            end: {
                opened: false,
                open: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.timeframe.end.opened = true;
                    $scope.timeframe.start.opened = false;
                }
            },
            start: {
                opened: false,
                open: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.timeframe.start.opened = true;
                    $scope.timeframe.end.opened = false;
                }
            }
        }

        // initialize all appointment types array
        AppointmentService.getAppointmentTypes().then(function (result) {
            $scope.allAppointmentTypes = result;
        });

        $scope.showTimeSlotsGrid = false;
        $scope.showNoTimeSlotsMessage = false;
        $scope.showLoadingMessage = false;
        $scope.showScheduleAppointment = true;
        $scope.showConfirmAppointment = false;
        $scope.showAllAppointmentTypesModal = false;
        $scope.searchButtonDisabled = false;
        $scope.confirmAppointmentButtonsDisabled = false;

        $scope.now = new Date();

        $scope.pagingOptions = {
            pageSizes: [5,10,20],
            pageSize: 5,
            currentPage: 1
        };
        $scope.totalServerItems = 0;
        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.timeSlotOptions = {
            data: 'filteredTimeSlots',
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            multiSelect: false,
            enableSorting: false,
            selectedItems: [],
            columnDefs: [   { field: 'date', displayName: emr.message("appointmentschedulingui.scheduleAppointment.timeSlot") },
                            { field: 'appointmentBlock.provider.person.display', displayName: emr.message("uicommons.provider") },
                            { field: 'appointmentBlock.location.display', displayName: emr.message("uicommons.location") } ]
        };
        $scope.setPagingData = function(){
            var page = $scope.pagingOptions.currentPage,
                pageSize = $scope.pagingOptions.pageSize,
                data = $scope.filteredTimeSlots;

            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.filteredTimeSlots = pagedData;
            $scope.totalServerItems = $scope.timeSlots.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

        $scope.findAvailableTimeSlots = function() {

            $scope.searchButtonDisabled = true;
            $scope.showLoadingMessage= true;
            $scope.showTimeSlotsGrid = false;

            var params = { 'appointmentType' : $scope.appointmentType.uuid,
                           'v': 'custom:(uuid,startDate,endDate,appointmentBlock:(provider:(person:ref),location:ref))' }

            if ($scope.fromDate) {
                params['fromDate'] = moment($scope.fromDate).format();
            }

            if ($scope.toDate) {
                params['toDate'] = moment($scope.toDate).endOf('day').format();
            }

            AppointmentService.getTimeSlots(params).then(function (results) {
                angular.forEach(results, function(result) {
                    result['date'] = moment(result.startDate).format("DD MMM YYYY") + ", "
                          + moment(result.startDate).format("h:mm a") + " - " + moment(result.endDate).format("h:mm a");
                })

                $scope.showLoadingMessage = false;
                $scope.timeSlots = results;

                $scope.showTimeSlotsGrid = results.length > 0;
                $scope.showNoTimeSlotsMessage = !$scope.showTimeSlotsGrid;

                $scope.updateFilter();
                $scope.searchButtonDisabled = false;
            })
                .catch(function() {
                    emr.errorMessage("appointmentschedulingui.scheduleAppointment.invalidSearchParameters");
                    $scope.searchButtonDisabled = false;
                });
        }

        $scope.updateFilter = function() {
            $scope.filteredTimeSlots = filterFilter($scope.timeSlots, function(row) {
                return row.appointmentBlock.location.display.toLowerCase().indexOf($scope.filterText.toLowerCase()) != -1
                    || row.appointmentBlock.provider.person.display.toLowerCase().indexOf($scope.filterText.toLowerCase()) != -1;
            });

            $scope.setPagingData();
        }

        $scope.$watch('pagingOptions', $scope.updateFilter, true);

        $scope.selectTimeSlot = function() {
            $scope.selectedTimeSlot = $scope.timeSlotOptions.selectedItems[0];
            $scope.showScheduleAppointment = false;
            $scope.showConfirmAppointment = true;
        }

        $scope.cancelConfirmAppointment = function () {
            $scope.showConfirmAppointment = false;
            $scope.showScheduleAppointment = true;
        }

        $scope.confirmAppointment = function() {

            $scope.confirmAppointmentButtonsDisabled = true;

            var appointment = { 'appointmentType': $scope.appointmentType.uuid,
                                'status': 'SCHEDULED',
                                'timeSlot': $scope.selectedTimeSlot.uuid,
                                'reason': $scope.appointmentReason,
                                'patient': patientUuid  // from global scope, defined in scheduleAppointment.gsp
                                };

            AppointmentService.saveAppointment(appointment).then(function() {

                // success callback
                emr.navigateTo({
                    provider: 'coreapps',
                    page: 'findpatient/findPatient',
                    query: { app: 'appointmentschedulingui.schedulingAppointmentApp' }
                });
            }).catch(function () {
                // error callback
                emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorSavingAppointment");
            })
        }

        $scope.backToPatientSearch = function() {
            emr.navigateTo({
                provider: 'coreapps',
                page: 'findpatient/findPatient',
                query: { app: 'appointmentschedulingui.schedulingAppointmentApp' }
            });
        }

        $scope.selectAppointmentType = function(type) {
            $scope.appointmentType = type;
            $scope.showAllAppointmentTypesModal = false;
        }

    });