angular.module('appointmentscheduling.scheduleProviders', ['appointmentscheduling.appointmentService', 'providerService','locationService','ui.bootstrap', 'ui.calendar' ])
    .controller('ScheduleProvidersCtrl', function ($scope, $filter, AppointmentService, ProviderService, LocationService) {

        /**
         * Model
         */

        // stores the appointment block we are currently creating/editing/viewing
        $scope.appointmentBlock = {};

        // bound to the location and provider filters on the calendar view
        $scope.locationFilter;
        $scope.providerFilter;

        // bound to the appointmentType typeahead in the appointment block form
        $scope.appointmentType;

        // locations to display in the locations drop-down
        $scope.locations = [];


        // TODO: default to current location
        // initialize the location list
        var locationSearchParams = {};
        if (supportsAppointmentsTagUuid) {
            locationSearchParams['tag'] = supportsAppointmentsTagUuid;
        }
        LocationService.getLocations(locationSearchParams).then(function (result) {
            $scope.locations = result;
        });

        // control booleans for show/hide the calendar the appointment block form views
        $scope.showCalendar = true;
        $scope.showAppointmentBlockForm = false;

        // stores all appointment blocks events within the current calendar view
        var appointmentBlocks = [];

        /* config object */
        $scope.uiConfig = {

            // configure the calendar
            calendar:{
                ignoreTimezone: true,  // does this parameter do anything? we want to ignore the time zone since we always want the schedule to be relative to the *server* time
                editable: false,
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

            // note that we *do not* send the associated time zone because we always want to operate on "server time"
            var params = { fromDate: moment(start).format("YYYY-MM-DDTHH:mm:ss.SSS"),
                            toDate: moment(end).format("YYYY-MM-DDTHH:mm:ss.SSS"),
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

                    // parse the dates from strings into data objects, **ignoring the time zone, since we always want to display in the server's time zone**
                    result.startDate = moment(result.startDate, "YYYY-MM-DDTHH:mm:ss.SSS").toDate();
                    result.endDate = moment(result.endDate, "YYYY-MM-DDTHH:mm:ss.SSS").toDate();

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
            // note that we *do not* send the associated time zone because we always want to operate on "server time"

            var appointmentBlockToUpdate = { 'types': appointmentTypeUuids,
                'location': $scope.appointmentBlock.location.uuid,
                'startDate': moment($scope.appointmentBlock.startDate)
                    .hours(moment($scope.appointmentBlock.startDate).hours())
                    .minutes(moment($scope.appointmentBlock.startDate).minutes())
                    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
                'endDate': moment($scope.appointmentBlock.startDate)
                    .hours(moment($scope.appointmentBlock.endDate).hours())
                    .minutes(moment($scope.appointmentBlock.endDate).minutes())
                    .format("YYYY-MM-DDTHH:mm:ss.SSS")
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