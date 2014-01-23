
angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap'])
    .controller('SelectAppointmentTypeCtrl', function ($scope, AppointmentService) {

        $scope.selected = undefined;

        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

    });
