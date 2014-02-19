angular.module('appointmentscheduling.scheduleProviders', ['appointmentscheduling.appointmentService', 'providerService','locationService','ui.bootstrap', 'ui.calendar' ])
    .controller('ScheduleProvidersCtrl', function ($scope, $timeout, $compile, AppointmentService, ProviderService, LocationService) {

        // model

        // used to store the appointment block we are currently creating/editing/viewing
        $scope.appointmentBlock = {};

        $scope.appointmentType;
        $scope.locationFilter;
        $scope.providerFilter;
        $scope.locations = [];

        $scope.showCalendar = true;
        $scope.showAppointmentBlockForm = false;

        // appointment blocks
        var appointmentBlocks = [];

        /* config object */
        $scope.uiConfig = {
            calendar:{
                editable: false,
                header:{
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                allDaySlot: false,

                dayClick: function(date) { $scope.createAppointmentBlock(date) },

                eventClick: function(event, element) {
                    $scope.appointmentBlock = event.appointmentBlock;
                },

                eventRender: function(event, element) {
                    element.qtip({
                        position: {
                            my: 'bottom center',
                            at: 'center'
                        },
                        show: {
                            event: 'click'
                        },
                        hide: {
                            event: 'unfocus click',
                            target: jq('.tooltip-button')
                        },
                        content: {
                            text: function (event, api) {
                                return jq('#tooltip');
                            },
                            button: true
                        }
                    });

                    $timeout(function () {$compile(element)($scope);})
                }
            }
        };

        // initialize all locations into array
        // TODO: limit to mirebalais hospital location
        LocationService.getLocations().then(function (result) {
            $scope.locations = result;
        });

        $scope.appointmentBlocksSource = [ function (start, end, callback) {

            var params = { fromDate: moment(start).format(),
                            toDate: moment(end).format(),
                            limit:100 }            // TODO need to increase this limit?

            if ($scope.providerFilter) {
                params['provider'] = $scope.providerFilter.uuid;
            }

            if ($scope.locationFilter) {
                params['location'] = $scope.locationFilter.uuid;
            }

            AppointmentService.getAppointmentBlocks(params).then(function (results) {

                appointmentBlocks = [];

                angular.forEach(results, function(result) {
                    appointmentBlocks.push( { title: (result.provider ? result.provider.person.display : "") + ", " + result.location.display,
                        start: result.startDate,
                        end: result.endDate,
                        appointmentBlock: result,
                        allDay: false} )
                })

                callback(appointmentBlocks);
            })
        } ];

        $scope.refreshCalendarEvents = function() {
            $scope.calendar.fullCalendar('refetchEvents');
        };

        // sort-of hack to make sure we refresh when providerFilter is cleared
        $scope.$watch('providerFilter', function(newValue, oldValue) {
            if (!newValue && oldValue) {
                $scope.refreshCalendarEvents();
            }
        });

        $scope.getProviders = function (searchString) {
            // TODO sort???
            return ProviderService.getProviders(searchString);
        }

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString).then(function (results) {

                // filter out any types that have already been selected
                return $filter('filter')(results, function(result) {
                    var include = true;
                    angular.forEach($scope.appointmentBlock.appointmentTypes, function(appointmentType) {
                        if (appointmentType.uuid == result.uuid) {
                            include = false;
                        }
                    })
                    return include;
                })

            });
        }

        $scope.addAppointmentType = function() {
            $scope.appointmentBlock.types.push($scope.appointmentType);
            $scope.appointmentType = undefined;
        }

        $scope.removeAppointmentType = function(appointmentType) {
            $scope.appointmentBlock.types = $filter('filter')($scope.appointmentTypes, "!" + appointmentType.uuid);
        }

        $scope.createAppointmentBlock = function(date) {
            $scope.appointmentBlock.uuid = undefined;
            $scope.appointmentBlock.startDate = date;
            $scope.appointmentBlock.endDate = date;
            $scope.appointmentBlock.provider = $scope.providerFilter;
            $scope.appointmentBlock.location = $scope.locationFilter;
            $scope.appointmentBlock.types = [];
            $scope.showCalendar = false;
            $scope.showAppointmentBlockForm = true;
        }

        // TODO validation--check for overbookings

        $scope.saveAppointmentBlock = function() {

            var appointmentTypeUuids = [];
            angular.forEach($scope.appointmentBlock.types, function(type) {
                appointmentTypeUuids.push(type.uuid);
            });

            var appointmentBlockToUpdate = { 'types': appointmentTypeUuids,
                'location': $scope.appointmentBlock.location.uuid,
                'startDate': moment($scope.appointmentBlock.startDate).hours(moment($scope.appointmentBlock.startDate).hours()).minutes(moment($scope.appointmentBlock.startDate).minutes()).format(),
                'endDate': moment($scope.appointmentBlock.startDate).hours(moment($scope.appointmentBlock.endDate).hours()).minutes(moment($scope.appointmentBlock.endDate).minutes()).format()
            };

            // add provider and uuid if specified
            if ($scope.appointmentBlock.provider) {
                appointmentBlockToUpdate.provider = $scope.appointmentBlock.provider.uuid;
            }

            if ($scope.appointmentBlock.uuid) {
                appointmentBlockToUpdate.uuid = $scope.appointmentBlock.uuid;
            }


            // zero out current appointment block reference
            $scope.appointmentBlock = {}


            AppointmentService.saveAppointmentBlock(appointmentBlockToUpdate).then(function() {
                $scope.refreshCalendarEvents();
                $scope.showAppointmentBlockForm = false;
                $scope.showCalendar = true;

            }).catch(function () {
                    // TODO get this message resolve properly
                    // error callback
                    emr.errorMessage("appointmentschedulingui.scheduleProviders.errorSavingAppointmentBlock");
                })
        }

        $scope.showDeleteAppointmentBlockModal = function () {

            var deleteAppointmentBlockModal = emr.setupConfirmationDialog({
                selector: '#delete-appointment-block-modal',
                actions: {
                    confirm: function() {
                        AppointmentService.deleteAppointmentBlock($scope.appointmentBlock.uuid).then(function() {
                            deleteAppointmentBlockModal.close();
                            $scope.refreshCalendarEvents();
                        }).catch(function () {
                                // TODO get this message resolve properly
                                // error callback
                                emr.errorMessage("appointmentschedulingui.scheduleProviders.errorDeletingAppointmentBlock");
                                deleteAppointmentBlockModal.close();
                            })
                    },
                    cancel: function() {
                        deleteAppointmentBlockModal.close();
                    }
                }
            });

            deleteAppointmentBlockModal.show();
        }

    });