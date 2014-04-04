angular.module('appointmentscheduling.scheduleAppointment')
    .controller('UpcomingAppointmentsCtrl', ['$scope', '$timeout', 'AppointmentService','filterFilter', 'ngGridPaginationFactory', 'dateRangePickerEventListener',
                                 function ($scope, $timeout, AppointmentService, filterFilter, ngGridPaginationFactory, dateRangePickerEventListener) {
        $scope.appointmentToCancel = null;
        $scope.appointmentCancelReason = '';

        $scope.showAppointmentsGrid = false;
        $scope.filteredAppointments = [];
        $scope.allAppointments = [];
        $scope.patient = {};
        $scope.pagingOptions = {};
        $scope.fromDate = new Date();

        $scope.init = function(patientUuid, canOverBook) {
            $scope.patient = patientUuid;
            $scope.canOverBook = canOverBook;
            $scope.findAppointments();
        }

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };

        $scope.appointmentOptions = {
            data: 'filteredAppointments',
            rowHeight: 50,
            multiSelect: false,
            enableSorting: false,
            selectedItems: [],
            columnDefs: [ { field: 'date', displayName: emr.message("appointmentschedulingui.scheduleAppointment.date"),
                cellTemplate: "<div>{{ row.getProperty(\'dateFormatted\') }}<br/>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>" },
                { field: 'appointmentType.display', displayName: emr.message("appointmentschedulingui.scheduleAppointment.serviceType") },
                { field: 'timeSlot.appointmentBlock.provider.person.display', displayName: emr.message("appointmentschedulingui.scheduleAppointment.provider") },
                { field: 'timeSlot.appointmentBlock.location.display', displayName: emr.message("appointmentschedulingui.scheduleAppointment.location") },
                { field: 'displayStatus', width: '15%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.status") },
                { displayName: emr.message("appointmentschedulingui.scheduleAppointment.actions"), cellTemplate: '<span><i class="delete-item icon-remove" ng-show="canOverBook" ng-click="confirmCancelAppointment(row.getProperty(\'uuid\'))" ' +
                    'title="{{ row.getProperty(\'tooltip\') }}"></i></span>'  }
            ]};


        var getSearchParams = function () {
            var params = { 'patient' : $scope.patient,
                'statusType' : 'SCHEDULED'
             };
            if ($scope.fromDate) { params['fromDate'] = moment($scope.fromDate).format();}
            if ($scope.toDate) { params['toDate'] = moment($scope.toDate).endOf('day').format(); }
            return params;
        };

        $scope.findAppointments = function() {
            clearPreviousResults();
            $scope.showLoadingAppointmentsGrid = true;
            $scope.showNoAppointmentsMessage = false;

            AppointmentService.getAppointments(getSearchParams()).then(function (results) {
                angular.forEach(results, function(result) {
                    result['dateFormatted'] = moment(result.timeSlot.appointmentBlock.startDate).format("DD MMM YYYY");
                    result['startTimeFormatted'] = moment(result.timeSlot.appointmentBlock.startDate).format("h:mm A");
                    result['endTimeFormatted']= moment(result.timeSlot.appointmentBlock.endDate).format("h:mm A");
                    result['tooltip'] = emr.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.tooltip");
                    result['displayStatus'] = emr.message("appointmentschedulingui.scheduleAppointment.status." + result["status"].name.toLowerCase());
                })

                initializeMessagesAfterSearch(results);
                $scope.pagingOptions.currentPage = 1;
                $scope.updateFilter();
            })
            .catch(function(e) {
                console.log(e);
                emr.errorMessage("appointmentschedulingui.scheduleAppointment.invalidSearchParameters");
            });
        }


        var initializeMessagesAfterSearch = function (results) {
            $scope.showLoadingAppointmentsGrid = false;
            $scope.allAppointments = results;

            if(results.length == 0) {
                $scope.showNoAppointmentsMessage = true;
                $scope.showAppointmentsGrid = false;
            } else {
                $scope.showAppointmentsGrid = true;
                $scope.showNoAppointmentsMessage = false;
            }
        };


        var clearPreviousResults = function () {
            $scope.allAppointments = [];
            $scope.filteredAppointments = [];
        };

        $scope.updateFilter = function() {
            $scope.filteredAppointments = filterFilter($scope.allAppointments, function(row) {
                return row;
            });
            updatePagination();
        }

        var updatePagination = function () {
            $scope.filteredAppointments = $scope.setPagingData($scope.filteredAppointments);
            if (!$scope.$$phase) $scope.$apply();
        }

        ngGridPaginationFactory.includePagination($scope, $scope.appointmentOptions, $scope.updateFilter);
        dateRangePickerEventListener.subscribe($scope, 'upcomingAppointments');

        $scope.confirmCancelAppointment = function(uuid) {
            $scope.appointmentToCancel = { uuid: uuid };
            $timeout(function() {
                angular.element('#confirm-cancel-appointment .confirm').focus();
            });
        }

        $scope.doCancelAppointment = function() {
            if ($scope.appointmentCancelReason.length > 0 ) {
                $scope.appointmentToCancel.cancelReason = $scope.appointmentCancelReason;
            }
            AppointmentService.cancelAppointment($scope.appointmentToCancel).then(function() {
                // success callback
                location.href = location.href;
            }).catch(function (e) {
                    // error callback
                    console.log(e);
                    emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorCancelingAppointment");
                })
            $scope.appointmentToCancel = null;
        }

        $scope.doNotCancelAppointment = function() {
            $scope.appointmentToCancel = null;
        }

        $scope.$watch(
            "fromDate",
            $scope.findAppointments
        );

        $scope.$watch(
            "toDate",
            $scope.findAppointments
        );

    }])





















