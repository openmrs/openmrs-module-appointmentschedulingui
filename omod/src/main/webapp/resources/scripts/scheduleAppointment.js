
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

        $scope.timeSlotOptions = {
            data: 'filteredTimeSlots',
            multiSelect: false,
            enableSorting: false,
            selectedItems: [],
            columnDefs: [   { field: 'date', displayName: emr.message("appointmentschedulingui.scheduleAppointment.timeSlot") },
                            { field: 'appointmentBlock.provider.person.display', displayName: emr.message("uicommons.provider") },
                            { field: 'appointmentBlock.location.display', displayName: emr.message("uicommons.location") } ]
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

                $scope.showTimeSlotsGrid = results.length > 1;
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
        }

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
