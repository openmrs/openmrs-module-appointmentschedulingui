angular.module('appointmentscheduling.scheduleProviders', ['appointmentscheduling.appointmentService', 'providerService','locationService','ui.bootstrap', 'ui.calendar' ])
    .controller('ScheduleProvidersCtrl', function ($scope, $filter, $timeout, $compile, AppointmentService, ProviderService, LocationService) {

        // model
        $scope.location;
        $scope.provider;
        $scope.appointmentType;
        $scope.appointmentTypes = [];
        $scope.locationFilter;
        $scope.providerFilter;

        $scope.date = undefined
        $scope.startTime = undefined;
        $scope.endTime = undefined;
        $scope.locations = [];

        $scope.tooltipLocation;
        $scope.tooltipProvider;
        $scope.tooltipDate;
        $scope.tooltipStartTime;
        $scope.tooltipStopTime;
        $scope.tooltipAppointmentBlockUuid;


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

                eventClick: function(event) {
                    $scope.tooltipLocation = event.location;
                    $scope.tooltipProvider = event.provider;
                    $scope.tooltipDate = moment(event.start).format('MMM D');
                    $scope.tooltipStartTime = moment(event.start).format('h:mm a');
                    $scope.tooltipStopTime = moment(event.end).format('h:mm a');
                    $scope.tooltipAppointmentBlockUuid = event.uuid;
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
                            event: 'unfocus'
                        },
                        content: {
                            text:  jq('#tooltip'),
                            button: true
                        }
                    });
                }
            }
        };

        // initialize all locations into array
        // TODO: limit to mirebalais hospital location
        LocationService.getLocations().then(function (result) {
            $scope.locations = result;
        });

        $scope.showCalendar = true;
        $scope.showCreateAppointmentBlock = false;

        // appointment blocks
        var appointmentBlocks = [];

        $scope.appointmentBlocksSource = [ function (start, end, callback) {

            var params = { fromDate: moment(start).format(),
                            toDate: moment(end).format(),
                            limit:100 }

            if ($scope.providerFilter) {
                params['provider'] = $scope.providerFilter.uuid;
            }

            if ($scope.locationFilter) {
                params['location'] = $scope.locationFilter.uuid;
            }

            AppointmentService.getAppointmentBlocks(params).then(function (results) {

                appointmentBlocks = [];

                angular.forEach(results, function(result) {
                    appointmentBlocks.push( { title: result.provider.person.display + ", " + result.location.display,
                        start: result.startDate,
                        end: result.endDate,
                        provider: result.provider,
                        location: result.location,
                        uuid: result.uuid,
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
                    angular.forEach($scope.appointmentTypes, function(appointmentType) {
                        if (appointmentType.uuid == result.uuid) {
                            include = false;
                        }
                    })
                    return include;
                })

            });
        }

        $scope.addAppointmentType = function() {
            $scope.appointmentTypes.push($scope.appointmentType);
            $scope.appointmentType = undefined;
        }

        $scope.removeAppointmentType = function(appointmentType) {
            $scope.appointmentTypes = $filter('filter')($scope.appointmentTypes, "!" + appointmentType.uuid);
        }

        $scope.createAppointmentBlock = function(date) {
            $scope.date = date;
            $scope.startTime = date;
            $scope.endTime = date;
            $scope.provider = $scope.providerFilter;
            $scope.location = $scope.locationFilter;
            $scope.showCalendar = false;
            $scope.showCreateAppointmentBlock = true;
        }

        $scope.saveAppointmentBlock = function() {

            // TODO right now only adds first appointment Type
            var appointmentBlock = { 'types': [ $scope.appointmentTypes[0].uuid ],
                'location': $scope.location.uuid,
                'startDate': moment($scope.date).hours(moment($scope.startTime).hours()).minutes(moment($scope.startTime).minutes()).format(),
                'endDate': moment($scope.date).hours(moment($scope.endTime).hours()).minutes(moment($scope.endTime).minutes()).format()

            };

            // add provider if specified
            if ($scope.provider) {
                appointmentBlock['provider'] = $scope.provider.uuid;
            }

            // zero out the entries
            $scope.provider = undefined;
            $scope.location = undefined;
            $scope.appointmentTypes = [];


            AppointmentService.saveAppointmentBlock(appointmentBlock).then(function() {
                $scope.refreshCalendarEvents();
                $scope.showCreateAppointmentBlock = false;
                $scope.showCalendar = true;

            }).catch(function () {
                    // error callback
                    emr.errorMessage("appointmentschedulingui.scheduleProviders.errorSavingAppointmentBlock");
                })
        }

        $scope.deleteAppointmentBlock = function(appointmentBlockUuid) {
            AppointmentService.deleteAppointmentBlock(appointmentBlockUuid).then($scope.refreshCalendarEvents());
        }
    });