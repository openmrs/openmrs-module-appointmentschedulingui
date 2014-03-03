angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduleAppointmentCtrl', function ($scope, $timeout, AppointmentService, filterFilter) {

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

        $scope.appointmentToCancel = null;

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
            rowHeight: 50,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
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
                    provider: 'appointmentschedulingui',
                    page: 'sessionInfo',
                    query: { patientUuid: patientUuid }
                });
            }).catch(function () {
                // error callback
                emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorSavingAppointment");
            })
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

        $scope.confirmCancelAppointment = function(uuid) {
            $scope.appointmentToCancel = { uuid: uuid };
            $timeout(function() {
                angular.element('#confirm-cancel-appointment .confirm').focus();
            });
        }

        $scope.doCancelAppointment = function() {
            AppointmentService.cancelAppointment($scope.appointmentToCancel).then(function() {
                // success callback
                location.href = location.href;
            }).catch(function () {
                // error callback
                emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorCancelingAppointment");
            })
            $scope.appointmentToCancel = null;
        }

        $scope.doNotCancelAppointment = function() {
            $scope.appointmentToCancel = null;
        }
    });
