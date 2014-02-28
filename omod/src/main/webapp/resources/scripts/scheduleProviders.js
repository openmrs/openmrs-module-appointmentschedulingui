angular.module('appointmentscheduling.scheduleProviders', ['appointmentscheduling.appointmentService', 'providerService','locationService','ui.bootstrap', 'ui.calendar' ])
    .controller('ScheduleProvidersCtrl', function ($scope, $filter, AppointmentService, ProviderService, LocationService) {

        /**
         * Private Utility methods
         */

        var initializeLocationFilter = function () {

            // initialize the location list
            var locationSearchParams = {};
            if (supportsAppointmentsTagUuid) {
                locationSearchParams['tag'] = supportsAppointmentsTagUuid;
            }

            LocationService.getLocations(locationSearchParams).then(function (result) {
                $scope.locations = result;

                // set the default filter location to the session location if session location in list
                if (sessionLocationUuid) {
                    angular.forEach($scope.locations, function(location) {
                        if (location.uuid == sessionLocationUuid) {
                            $scope.locationFilter = location;
                        }
                    })
                }
                // if no match, just set the default filter to the first option (we never want to display *all* blocks)
                if (!$scope.locationFilter && $scope.locations && $scope.locations.length > 0) {
                    $scope.locationFilter = $scope.locations[0];
                }

                // need to refresh the calendar after this
                $scope.refreshCalendarEvents();
            });

        }

        /**
         * Model
         */

        // stores the appointment block we are currently creating/editing/viewing
        $scope.appointmentBlock = {};

        // bound to the location and provider filters on the calendar view
        $scope.locationFilter;
        $scope.providerFilter;

        // locations to display in the locations drop-down
        $scope.locations = [];
        initializeLocationFilter();

        // bound to the appointmentType typeahead in the appointment block form
        $scope.appointmentType;

        // control booleans for show/hide the calendar the appointment block form views
        $scope.showCalendar = true;
        $scope.showAppointmentBlockForm = false;

        // stores all appointment blocks events within the current calendar view
        var appointmentBlocks = [];

        /* config object */
        $scope.uiConfig = {

            // configure the calendar
            calendar:{
                ignoreTimezone: false,  // does this parameter do anything?
                weekends: false,
                header:{
                    left: 'month basicWeek basicDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                allDaySlot: false,

                dayClick: function(date) {
                    $scope.createAppointmentBlock(date)
                },

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
                            event: 'click'   // show a tooltip when an event is clicked
                        },
                        hide: {
                            event: 'unfocus click', // hide a tooltip when it loses focus or when one of the links within the tool-tip is clicked
                            target: jq('.tooltip-link')
                        },
                        content: {
                            // every time a tooltip is loaded, populate it's content with the content of the tooltip div (which is bound to $scope.appointmentBlock, which is updated on eventClick)
                            text: function (event, api) {
                                return jq('#tooltip');
                            },
                            button: true
                        }
                    });
                }
            }
        };


        // model for the calendar, which is an array of sources for the calendar
        // in this case, we have a single source function that fetches matching blocks via REST
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

                    var title = (result.provider ? result.provider.person.display + ", " : "");
                    angular.forEach(result.types, function(type) {
                        title = title + type.display + ", "
                    })
                    title = title.slice(0,-2); // remove trailing comma

                    // parse the dates from strings into data objects
                    result.startDate = new Date(result.startDate);
                    result.endDate = new Date(result.endDate);

                    appointmentBlocks.push( { title: title,
                        start: result.startDate,
                        end: result.endDate,
                        appointmentBlock: result,
                        allDay: false} )
                })

                callback(appointmentBlocks);  // this callback actually does the rendering
            })
        } ];

        $scope.refreshCalendarEvents = function() {
            $scope.calendar.fullCalendar('refetchEvents');    // triggers a refresh of the calendar model (i.e., the function in the appointmentBlocksSource is called to regenerate the events)
        };

        // sort-of hack to make sure we refresh when providerFilter is cleared
        $scope.$watch('providerFilter', function(newValue, oldValue) {
            if (!newValue && oldValue) {
                $scope.refreshCalendarEvents();
            }
        });

        $scope.getProviders = function (searchString) {
            // TODO sort???
            return ProviderService.getProviders({'q': searchString, 'v': 'default'});
        }

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString).then(function (results) {

                // filter out any types that have already been selected
                return $filter('filter')(results, function(result) {
                    var include = true;
                    angular.forEach($scope.appointmentBlock.types, function(appointmentType) {
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

        $scope.removeAppointmentType = function(type) {
            $scope.appointmentBlock.types = $filter('filter')($scope.appointmentBlock.types, "!" + type.uuid);
        }

        $scope.createAppointmentBlock = function(date) {

            $scope.appointmentBlock = {
                uuid: undefined,
                startDate: new Date(date).setHours(8),
                endDate: new Date(date).setHours(11),
                provider: $scope.providerFilter,
                location: $scope.locationFilter,
                types: []
            }

            $scope.appointmentType = '';
            $scope.showCalendar = false;
            $scope.showAppointmentBlockForm = true;
        }

        $scope.editAppointmentBlock = function() {
            $scope.appointmentType = '';
            $scope.showCalendar = false;
            $scope.showAppointmentBlockForm = true;
        }
        // TODO validation--check for overbookings

        $scope.saveAppointmentBlock = function() {

            var appointmentTypeUuids = [];
            angular.forEach($scope.appointmentBlock.types, function(type) {
                appointmentTypeUuids.push(type.uuid);
            });

            // create the object we want to send back via REST

            // we need to manually format here becauset the default moment format displays a time zone offset as -5:00 (which is ISO 6801)
            // but currently WS-REST only accepts the format -500 (RFC 822) (the 'ZZ' instead of 'Z' specifies this format)

            var appointmentBlockToUpdate = { 'types': appointmentTypeUuids,
                'location': $scope.appointmentBlock.location.uuid,
                'startDate': moment($scope.appointmentBlock.startDate)
                    .hours(moment($scope.appointmentBlock.startDate).hours())
                    .minutes(moment($scope.appointmentBlock.startDate).minutes())
                    .format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
                'endDate': moment($scope.appointmentBlock.startDate)
                    .hours(moment($scope.appointmentBlock.endDate).hours())
                    .minutes(moment($scope.appointmentBlock.endDate).minutes())
                    .format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
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
                        $scope.refreshCalendarEvents();  // this isn't technically necessary, but for some reason if we don't do this the edit/delete buttons on the tooltips no longer work
                    }
                }
            });

            deleteAppointmentBlockModal.show();
        }

        $scope.validateStartTime = function () {
            if ($scope.appointmentBlock.startDate > $scope.appointmentBlock.endDate) {
                $scope.appointmentBlock.startDate = new Date($scope.appointmentBlock.endDate);
            }
        }

        $scope.validateEndTime = function () {
            if ($scope.appointmentBlock.endDate < $scope.appointmentBlock.startDate) {
                $scope.appointmentBlock.endDate = new Date($scope.appointmentBlock.startDate);
            }
        }



    });