
angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduleAppointmentCtrl', function ($scope, AppointmentService) {

        // model
        $scope.appointmentType = undefined;
        $scope.fromDate = undefined;
        $scope.toDate = undefined;
        $scope.timeSlots = [];

        $scope.timeSlotOptions = {
            data: 'timeSlots',
            multiSelect: false,
            enableSorting: false,
            columnDefs: [   { field: 'startDate', displayName: 'Time Slot' },
                            { field: 'appointmentBlock.provider.person.display', displayName: 'Provider' },
                            { field: 'appointmentBlock.location.name', displayName: 'Location' } ]
        };

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

        $scope.findAvailableTimeSlots = function() {

            // TODO don't enable button if use hasn't selected a appointmentType
            var params = { 'appointmentType' : $scope.appointmentType.uuid }

            if ($scope.fromDate) {
                params['fromDate'] = $scope.fromDate;
            }

            if ($scope.toDate) {
                params['toDate'] = $scope.toDate;
            }

            AppointmentService.getTimeSlots(params).then(function (results) {
                $scope.timeSlots = results;
            });

        }

    });
