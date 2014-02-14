angular.module('appointmentscheduling.scheduleProviders', ['appointmentscheduling.appointmentService', 'providerService','locationService','ui.bootstrap', 'ui.calendar' ])
    .controller('ScheduleProvidersCtrl', function ($scope, $filter, AppointmentService, ProviderService, LocationService) {

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

                dayClick: function(date) { $scope.createAppointmentBlock(date) }
            }
        };

        // model
        $scope.location = undefined;
        $scope.provider = undefined;
        $scope.appointmentType = undefined;
        $scope.appointmentTypes = [];

        $scope.date = undefined
        $scope.startTime = undefined;
        $scope.endTime = undefined;
        $scope.locations = [];

        // TODO create tool tip? add appointment type?
        // TODO clicking on a day opens schedule appt for that day

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

            AppointmentService.getAppointmentBlocks( { fromDate: moment(start).format(),
                                                       toDate: moment(end).format(),
                                                       limit:100 }).then(function (results) {

                appointmentBlocks = [];

                angular.forEach(results, function(result) {
                    appointmentBlocks.push( { title: result.provider.person.display + ", " + result.location.display, start: result.startDate, end: result.endDate, allDay: false} )
                })

                callback(appointmentBlocks);
            })
        } ];

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

                // TODO: trigger refresh?

                $scope.showCreateAppointmentBlock = false;
                $scope.showCalendar = true;
            }).catch(function () {
                    // error callback
                    emr.errorMessage("appointmentschedulingui.scheduleProviders.errorSavingAppointmentBlock");
                })
        }
    });