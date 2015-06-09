angular.module('appointmentscheduling')
    .controller('ScheduleAppointmentCtrl',['$scope', '$rootScope','$timeout', 'AppointmentService', 'filterFilter',
        'dateRangePickerEventListener', 'ngGridHelper', function ($scope, $rootScope, $timeout, AppointmentService, filterFilter,
                                                     dateRangePickerEventListener, ngGridHelper) {
        $scope.filterText = '';
        $scope.timeSlots = [];
        $scope.filteredTimeSlots = [];
        $scope.allAppointmentTypes = [];
        $scope.includeSlotsThatRequireOverbook = false;
        $scope.patientDisplay = '';
        $scope.locale = '';

        $scope.showTimeSlotsGrid = false;
        $scope.showNoTimeSlotsMessage = false;
        $scope.showLoadingMessage = false;
        $scope.showScheduleAppointment = false;
        $scope.showConfirmAppointment = false;
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
            i18n: jsLocale,
            selectedItems: [],
            rowTemplate: "<div ng-class=\"{ highlighted: row.getProperty(\'requiresOverbook') }\"><div ng-style=\"{ 'cursor': row.cursor }\" ng-repeat=\"col in renderedColumns\" ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" ng-style=\"{height: rowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div ng-cell></div></div></div>",   // just the standard row template but with a wrapped div for adding row highlighting when a slot is full
            columnDefs: [   { field: 'date', displayName: emr.message('appointmentschedulingui.scheduleAppointment.timeSlot'),
                                    cellTemplate: "<div>{{ row.getProperty(\'dateFormatted\') }}<br/>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>"},
                            { field: 'appointmentBlock.provider.person.display', displayName: emr.message('uicommons.provider') },
                            { field: 'appointmentBlock.location.display', displayName: emr.message('uicommons.location') },
                            { field: 'appointments', displayName: emr.message('appointmentschedulingui.scheduleAppointment.appointments'),
                                    cellTemplate: "<div>{{ row.getProperty(\'countOfAppointments\') }} " + emr.message('appointmentschedulingui.scheduleAppointment.scheduled')
                                        + "<br/>({{ row.getProperty(\'unallocatedMinutesAbsValue\') }} {{ row.getProperty(\'minutesMessage\') }})</div>" } ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };

        $scope.init = function(patientUuid, returnUrl, locale) {
            $scope.patientUuid = patientUuid;
            $scope.showScheduleAppointment = patientUuid ? true : false;
            $scope.locale = typeof locale != 'undefined' ? locale : 'en';
            if (returnUrl) {
                $scope.returnUrl = returnUrl;
            }
        },

        dateRangePickerEventListener.subscribe($scope, 'scheduleAppointment');

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
                    result['dateFormatted'] = moment(result.startDate).locale($scope.locale).format("DD MMM YYYY");
                    result['startTimeFormatted'] = moment(result.startDate).locale($scope.locale).format("h:mm A");
                    result['endTimeFormatted']= moment(result.endDate).locale($scope.locale).format("h:mm A");
                    result['requiresOverbook'] = result.unallocatedMinutes - $scope.appointmentType.duration < 0;
                    result['unallocatedMinutesAbsValue'] = Math.abs(result.unallocatedMinutes);
                    result['minutesMessage'] = (result.unallocatedMinutes < 0
                        ? emr.message('appointmentschedulingui.scheduleAppointment.minutesOverbooked')
                        : emr.message('appointmentschedulingui.scheduleAppointment.minutesAvailable'));
                })

                initializeMessagesAfterSearch(results);
                $scope.pagingOptions.currentPage = 1;
                $scope.updateFilter();
                $scope.searchButtonDisabled = false;
                $timeout(scrollToTimeSlotSearchResults);

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
                           'includeFull' : $scope.includeSlotsThatRequireOverbook,
                           'excludeTimeSlotsPatientAlreadyBookedFor': $scope.patientUuid };
            if ($scope.fromDate) { params['fromDate'] = moment($scope.fromDate).format();}
            if ($scope.toDate) { params['toDate'] = moment($scope.toDate).endOf('day').format(); }
            return params;
        };

        var initializeMessagesAfterSearch = function (results) {
            $scope.showLoadingMessage = false;
            $scope.timeSlots = results;

            if(results && results.length == 0) {
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

        var scrollToTimeSlotSearchResults = function () {
            jq('#selectAppointment').get(0).scrollIntoView();
        }

        ngGridHelper.includePagination($scope, $scope.timeSlotOptions, $scope.updateFilter);

        $scope.selectTimeSlot = function() {
            $rootScope.$broadcast('appointmentscheduling.scheduleAppointment.openConfirmDialog'); // the patientAppointments and patientAppointmentRequest modules listen for this event and hide themselves when they receive it
            $scope.selectedTimeSlot = $scope.timeSlotOptions.selectedItems[0];
            $scope.showScheduleAppointment = false;
            $scope.showConfirmAppointment = true;
        }

        $scope.selectAppointmentType = function(type) {
            $scope.appointmentType = type;
            $scope.showAllAppointmentTypesModal = false;
        }

        $scope.backToPatientSearch = function() {
            if ($scope.returnUrl) {
                emr.navigateTo({ url: $scope.returnUrl });
            } else {
                emr.navigateTo({
                    provider: 'coreapps',
                    page: 'findpatient/findPatient',
                    query: { app: 'appointmentschedulingui.schedulingAppointmentApp' }
                });
            }
        }

        $scope.cancelConfirmAppointment = function () {
            $rootScope.$broadcast('appointmentscheduling.scheduleAppointment.cancelConfirmDialog'); // the patientAppointments and patientAppointmentRequest modules listen for this event and show themselves when they receive it
            $scope.selectedTimeSlot = $scope.timeSlotOptions.selectedItems[0];
            $scope.showScheduleAppointment = true;
            $scope.showConfirmAppointment = false;
        }

        $scope.$watch(
            "filterText",
            function() {
                $scope.pagingOptions.currentPage = 1;
            }
        );

        $scope.$watch(
            "appointmentType",
            function() {
                clearPreviousResults();
                $scope.showTimeSlotsGrid = false;
            }
        );

        // events emitted by other controllers that this controller handles

        // currently, the patientAppointmentRequestsController emits this event when the user clicks on the "book" icon associated with an appointment request
        $scope.$on('appointmentscheduling.patientAppointmentRequests.requestSelected', function(event, eventData) {

            $scope.selectedAppointmentRequest = eventData.appointmentRequest;  // set so that we know to mark this request as fulfilled when booking an appointment
            $scope.appointmentType = eventData.appointmentRequest.appointmentType;
            $scope.filterText = eventData.appointmentRequest.provider ? eventData.appointmentRequest.provider.person.display : '';

            $scope.patientUuid = eventData.appointmentRequest.patient ? eventData.appointmentRequest.patient.uuid : $scope.patientUuid;
            $scope.patientDisplay = eventData.appointmentRequest.patient ? eventData.appointmentRequest.patient.person.display : '';

            // if dates have been specified, 1) set them on the scope, and 2) broadcast these dates to the date range picker
            //if (eventData.appointmentRequest.startDate || eventData.appointmentRequest.endDate) {
            var changeDateData = {
                senderId: 'scheduleAppointment',
                startDate: eventData.appointmentRequest.startDate,
                endDate: eventData.appointmentRequest.endDate
            }

            $scope.fromDate = eventData.appointmentRequest.startDate;
            $scope.toDate = eventData.appointmentRequest.endDate;

            $scope.$broadcast('dateRangePickerApp.changeDate', changeDateData);

            $scope.showScheduleAppointment = true;
            $scope.findAvailableTimeSlots();

        });

    }]);
