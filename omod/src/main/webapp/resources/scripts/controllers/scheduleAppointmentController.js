angular.module('appointmentscheduling.scheduleAppointment')
    .controller('ScheduleAppointmentCtrl',['$scope', 'AppointmentService', 'filterFilter',
        'timeframePickerEventListener', 'ngGridPaginationFactory', function ($scope, AppointmentService, filterFilter,
                                                     timeframePickerEventListener, ngGridPaginationFactory) {

        timeframePickerEventListener.subscribe($scope);

        // model
        $scope.filterText = '';
        $scope.timeSlots = [];
        $scope.filteredTimeSlots = [];

        $scope.allAppointmentTypes = [];

        // initialize all appointment types array
        AppointmentService.getAppointmentTypes().then(function (result) {
            $scope.allAppointmentTypes = result;
        });

        $scope.showTimeSlotsGrid = false;
        $scope.showNoTimeSlotsMessage = false;
        $scope.showLoadingMessage = false;
        $scope.showScheduleAppointment = true;
        $scope.showAllAppointmentTypesModal = false;
        $scope.searchButtonDisabled = false;
        $scope.confirmAppointmentButtonsDisabled = false;



        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.timeSlotOptions = {
            data: 'filteredTimeSlots',
            rowHeight: 50,
            multiSelect: false,
            enableSorting: false,
            selectedItems: [],
            columnDefs: [   { field: 'date', displayName: emr.message('appointmentschedulingui.scheduleAppointment.timeSlot'),
                                    cellTemplate: "<div>{{ row.getProperty(\'dateFormatted\') }}<br/>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>"},
                            { field: 'appointmentBlock.provider.person.display', displayName: emr.message('uicommons.provider') },
                            { field: 'appointmentBlock.location.display', displayName: emr.message('uicommons.location') },
                            { field: 'appointments', displayName: emr.message('appointmentschedulingui.scheduleAppointment.appointments'),
                                    cellTemplate: "<div>{{ row.getProperty(\'countOfAppointments\') }} " + emr.message('appointmentschedulingui.scheduleAppointment.scheduled')
                                        + "<br/>({{ row.getProperty(\'unallocatedMinutes\') }} " + emr.message('appointmentschedulingui.scheduleAppointment.minutesAvailable') + ")</div>" } ]
        };

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

        $scope.findAvailableTimeSlots = function() {

            $scope.searchButtonDisabled = true;
            $scope.showNoTimeSlotsMessage = false;
            $scope.showLoadingMessage = true;

            $scope.timeSlots = [];
            $scope.filteredTimeSlots = [];

            var params = { 'appointmentType' : $scope.appointmentType.uuid }
                         //  'v': 'custom:(uuid,startDate,endDate,countOfAppointments,appointmentBlock:(provider:(person:ref),location:ref))' }

            if ($scope.fromDate) {
                params['fromDate'] = moment($scope.fromDate).format();
            }

            if ($scope.toDate) {
                params['toDate'] = moment($scope.toDate).endOf('day').format();
            }

            AppointmentService.getTimeSlots(params).then(function (results) {
                angular.forEach(results, function(result) {
                    result['dateFormatted'] = moment(result.startDate).format("DD MMM YYYY");
                    result['startTimeFormatted'] = moment(result.startDate).format("h:mm A");
                    result['endTimeFormatted']= moment(result.endDate).format("h:mm A");
                })

                $scope.showLoadingMessage = false;
                $scope.timeSlots = results;

                $scope.showTimeSlotsGrid = true;
                $scope.showNoTimeSlotsMessage = results.length == 0;

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
                    || (row.appointmentBlock.provider && row.appointmentBlock.provider.person.display.toLowerCase().indexOf($scope.filterText.toLowerCase()) != -1);
            });

            $scope.updatePagination();
        }

        $scope.updatePagination = function () {
            $scope.filteredTimeSlots = $scope.setPagingData($scope.filteredTimeSlots);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        ngGridPaginationFactory.includePagination($scope, $scope.timeSlotOptions, $scope.updateFilter);

        $scope.selectTimeSlot = function() {
            $scope.selectedTimeSlot = $scope.timeSlotOptions.selectedItems[0];
            $scope.showScheduleAppointment = false;
        }

        $scope.selectAppointmentType = function(type) {
            $scope.appointmentType = type;
            $scope.showAllAppointmentTypesModal = false;
        }

        $scope.backToPatientSearch = function() {
            emr.navigateTo({
                provider: 'coreapps',
                page: 'findpatient/findPatient',
                query: { app: 'appointmentschedulingui.schedulingAppointmentApp' }
            });
        }

        $scope.cancelConfirmAppointment = function () {
            $scope.showScheduleAppointment = true;
        }

    }]);
