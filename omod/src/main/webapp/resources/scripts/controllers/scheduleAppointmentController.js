angular.module('appointmentscheduling.scheduleAppointment')
    .controller('ScheduleAppointmentCtrl',['$scope', 'AppointmentService', 'filterFilter',
        'dateRangePickerEventListener', 'ngGridPaginationFactory', function ($scope, AppointmentService, filterFilter,
                                                     dateRangePickerEventListener, ngGridPaginationFactory) {
        $scope.filterText = '';
        $scope.timeSlots = [];
        $scope.filteredTimeSlots = [];
        $scope.allAppointmentTypes = [];
        $scope.includeSlotsThatRequireOverbook = false;

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
            rowTemplate: "<div ng-class=\"{ highlighted: row.getProperty(\'requiresOverbook') }\"><div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div ng-cell></div></div></div>",   // just the standard row template but with a wrapped div for adding row highlighting when a slot is full
            columnDefs: [   { field: 'date', displayName: emr.message('appointmentschedulingui.scheduleAppointment.timeSlot'),
                                    cellTemplate: "<div>{{ row.getProperty(\'dateFormatted\') }}<br/>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>"},
                            { field: 'appointmentBlock.provider.person.display', displayName: emr.message('uicommons.provider') },
                            { field: 'appointmentBlock.location.display', displayName: emr.message('uicommons.location') },
                            { field: 'appointments', displayName: emr.message('appointmentschedulingui.scheduleAppointment.appointments'),
                                    cellTemplate: "<div>{{ row.getProperty(\'countOfAppointments\') }} " + emr.message('appointmentschedulingui.scheduleAppointment.scheduled')
                                        + "<br/>({{ row.getProperty(\'unallocatedMinutesAbsValue\') }} {{ row.getProperty(\'minutesMessage\') }})</div>" } ]
        };

        dateRangePickerEventListener.subscribe($scope);

        // initialize allAppointmentTypes variable
        AppointmentService.getAppointmentTypes().then(function (result) {
            $scope.allAppointmentTypes = result;
        });

        // backing functional for the appointment type autocomplete
        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

        $scope.findAvailableTimeSlots = function() {
            initializeMessagesBeforeSearch();
            clearPreviousResults();

            AppointmentService.getTimeSlots(getSearchParams()).then(function (results) {
                angular.forEach(results, function(result) {
                    result['dateFormatted'] = moment(result.startDate).format("DD MMM YYYY");
                    result['startTimeFormatted'] = moment(result.startDate).format("h:mm A");
                    result['endTimeFormatted']= moment(result.endDate).format("h:mm A");
                    result['requiresOverbook'] = result.unallocatedMinutes - $scope.appointmentType.duration < 0;
                    result['unallocatedMinutesAbsValue'] = Math.abs(result.unallocatedMinutes);
                    result['minutesMessage'] = (result.unallocatedMinutes < 0
                        ? emr.message('appointmentschedulingui.scheduleAppointment.minutesOverbooked')
                        : emr.message('appointmentschedulingui.scheduleAppointment.minutesAvailable'));
                })
                initializeMessagesAfterSearch(results);
                $scope.updateFilter();
                $scope.searchButtonDisabled = false;
                $scope.pagingOptions.currentPage = 1;
            })
            .catch(function() {
                emr.errorMessage("appointmentschedulingui.scheduleAppointment.invalidSearchParameters");
                $scope.searchButtonDisabled = false;
            });
        }

        var clearPreviousResults = function () {
            $scope.timeSlots = [];
            $scope.filteredTimeSlots = [];
        };

        var initializeMessagesBeforeSearch = function () {
            $scope.searchButtonDisabled = true;
            $scope.showNoTimeSlotsMessage = false;
            $scope.showLoadingMessage = true;
        };

        var getSearchParams = function () {
            var params = { 'appointmentType' : $scope.appointmentType.uuid,
                           'includeFull' : $scope.includeSlotsThatRequireOverbook };
            if ($scope.fromDate) { params['fromDate'] = moment($scope.fromDate).format();}
            if ($scope.toDate) { params['toDate'] = moment($scope.toDate).endOf('day').format(); }
            return params;
        };

        var initializeMessagesAfterSearch = function (results) {
            $scope.showLoadingMessage = false;
            $scope.timeSlots = results;

            if(results.length == 0) {
                $scope.showNoTimeSlotsMessage = true;
                $scope.showTimeSlotsGrid = false;
            } else {
                $scope.showTimeSlotsGrid = true;
            }
        };

        $scope.updateFilter = function() {
            $scope.filteredTimeSlots = filterFilter($scope.timeSlots, function(row) {
                return row.appointmentBlock.location.display.toLowerCase().indexOf($scope.filterText.toLowerCase()) != -1
                    || (row.appointmentBlock.provider && row.appointmentBlock.provider.person.display.toLowerCase().indexOf($scope.filterText.toLowerCase()) != -1);
            });
            updatePagination();
        }

        var updatePagination = function () {
            $scope.filteredTimeSlots = $scope.setPagingData($scope.filteredTimeSlots);
            if (!$scope.$$phase) $scope.$apply();
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

        $scope.$watch(
            "filterText",
            function() {
                $scope.pagingOptions.currentPage = 1;
            }
        );
    }]);
