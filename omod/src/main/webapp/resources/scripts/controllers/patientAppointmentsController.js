angular.module('appointmentscheduling')
    .controller('PatientAppointmentsCtrl', ['$scope', 'AppointmentService','filterFilter', 'ngGridHelper', 'dateRangePickerEventListener',
                                 function ($scope, AppointmentService, filterFilter, ngGridHelper, dateRangePickerEventListener) {


        $scope.showAppointments = true;
        $scope.showAppointmentsGrid = false;
        $scope.filteredAppointments = [];
        $scope.allAppointments = [];
        $scope.patient = {};
        $scope.pagingOptions = {};
        $scope.fromDate = new Date();
        $scope.locale = '';

        $scope.appointmentToCancel = null;
        $scope.appointmentCancelReason = '';

        $scope.init = function(patientUuid, canBook, loadOnInit, hideActionButtons, enablePagination, locale) {
            $scope.enablePagination = enablePagination;
            $scope.patientUuid = patientUuid;
            $scope.canBook = canBook;
            $scope.locale = typeof locale != 'undefined' ? locale : 'en';
            $scope.defineAppointmentsGrid(hideActionButtons);

            if (loadOnInit == null || loadOnInit) {
                dateRangePickerEventListener.subscribe($scope, 'patientAppointments');
                $scope.findAppointments();
            }
        };


        $scope.defineAppointmentsGrid = function (hideActionButtons) {

            $scope.appointmentsGrid = {
                data: 'filteredAppointments',
                rowHeight: 50,
                multiSelect: false,
                enableSorting: false,
                i18n: jsLocale,
                selectedItems: [],
                columnDefs: [ { field: 'date', width: '19%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.date"),
                    cellTemplate: "<div>{{ row.getProperty(\'dateFormatted\') }}<br/>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>" },
                    { field: 'appointmentType.display', width: '19%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.serviceType") },
                    { field: 'timeSlot.appointmentBlock.provider.person.display', width: '19%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.provider") },
                    { field: 'timeSlot.appointmentBlock.location.display', width: '19%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.location") },
                    { field: 'displayStatus', width: '15%', displayName: emr.message("appointmentschedulingui.scheduleAppointment.status") } ],
                plugins: [new ngGridFlexibleHeightPlugin()]

            };

            if (!hideActionButtons) {
                $scope.appointmentsGrid.columnDefs.push( { displayName: emr.message("appointmentschedulingui.scheduleAppointment.actions"), cellTemplate: '<span><i class="delete-item icon-remove" ng-show="canBook && isCancellable(row.getProperty(\'status\'))" ng-click="cancelAppointment(row.getProperty(\'uuid\'))" ' +
                    'title="{{ row.getProperty(\'tooltip\') }}"></i></span>'  })
            }

            if ($scope.enablePagination) {
                ngGridHelper.includePagination($scope, $scope.appointmentsGrid, $scope.updateFilter);
            }

        }

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };

        var getSearchParams = function () {
            var params = { 'patient' : $scope.patientUuid };
            if ($scope.fromDate) { params['fromDate'] = moment($scope.fromDate).startOf('day').format();}
            if ($scope.toDate) { params['toDate'] = moment($scope.toDate).endOf('day').format(); }
            return params;
        };

        $scope.findAppointments = function() {
            clearPreviousResults();
            $scope.showLoadingAppointmentsGrid = true;
            $scope.showNoAppointmentsMessage = false;

            AppointmentService.getAppointments(getSearchParams()).then(function (results) {
                angular.forEach(results, function(result) {
                    result['dateFormatted'] = moment(result.timeSlot.appointmentBlock.startDate).locale($scope.locale).format("DD MMM YYYY");
                    result['startTimeFormatted'] = moment(result.timeSlot.appointmentBlock.startDate).locale($scope.locale).format("h:mm A");
                    result['endTimeFormatted']= moment(result.timeSlot.appointmentBlock.endDate).locale($scope.locale).format("h:mm A");
                    result['tooltip'] = emr.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.tooltip");
                    result['displayStatus'] = emr.message("appointmentschedulingui.scheduleAppointment.status.type." + result["status"].type.toLowerCase());
                });

                results.sort(function(a, b) {
                    if (a.timeSlot.appointmentBlock.startDate > b.timeSlot.appointmentBlock.startDate) {
                        return 1;
                    } else if (a.timeSlot.appointmentBlock.startDate < b.timeSlot.appointmentBlock.startDate) {
                        return -1;
                    } return 0;
                });

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

            if(results && results.length == 0) {
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
            if ($scope.enablePagination) {
                $scope.filteredAppointments = $scope.setPagingData($scope.filteredAppointments);
            }

            if (!$scope.$$phase) $scope.$apply();
        }

        $scope.cancelAppointment = function(uuid) {
            var eventData = {
                uuid: uuid
            };
            $scope.$broadcast('appointmentscheduling.cancelAppointment', eventData);
        }

        $scope.updateCanceledAppointment = function(uuid) {
            if ($scope.allAppointments) {
                for (var i= 0; i < $scope.allAppointments.length; i++) {
                    var appointment = $scope.allAppointments[i];
                    if ( appointment.uuid == uuid) {
                        appointment.status.code = "CANCELLED";
                        appointment.status.name = "Cancelled";
                        appointment.status.type = "CANCELLED";
                        appointment.displayStatus = emr.message("appointmentschedulingui.scheduleAppointment.status.type." + appointment.status.type.toLowerCase());
                    }

                }
                $scope.updateFilter();
            }
        }

        $scope.$on('appointmentscheduling.cancelAppointment.success', function(event, eventData) {
            $scope.updateCanceledAppointment(eventData.uuid);
        });

        $scope.isCancellable = function(status) {
            // only scheduled appointments can be cancelled
            return status.type == 'SCHEDULED';
        }

        $scope.$watch(
            "fromDate",
            function(oldValue, newValue) {
                if(oldValue !== newValue) {
                    $scope.findAppointments();
                }
            }

        );

        $scope.$watch(
            "toDate",
            function(oldValue, newValue) {
                if(oldValue !== newValue) {
                    $scope.findAppointments();
                }
            }
        );

        // events emitted by other controllers that this controller handles

        // hide display if the schedule appointment app opens it's confirm dialog
        $scope.$on('appointmentscheduling.scheduleAppointment.openConfirmDialog', function(event, eventData) {
             $scope.showAppointments = false;
        });

         // show display if the schedule appointment app closes it's confirm dialog
         $scope.$on('appointmentscheduling.scheduleAppointment.cancelConfirmDialog', function(event, eventData) {
             $scope.showAppointments = true;
         });

         // due to a error I can't solve, we get caught in infinite angular digest lope if we initialize appointment appointments
         // when a grid is not visible--so for use casese (like the appointments tab) where the grid may not be visible on load
         // we allow loading the appointments on init to be disabled (see loadOnInit in the init method above) and provide
         // an event that other components can broadcast when the appointments should be loaded
         // this does have the added benefit of not making the REST request until we actually need the data

         $scope.$on('appointmentRequests.loadAppointments', function () {
             dateRangePickerEventListener.subscribe($scope, 'patientAppointments');
             $scope.findAppointments();
         })


     }])





















