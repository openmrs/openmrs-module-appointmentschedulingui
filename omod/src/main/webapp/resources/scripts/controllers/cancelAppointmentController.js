angular.module('appointmentscheduling.scheduleAppointment')
    .controller('CancelAppointmentCtrl', ['$scope', '$timeout', 'AppointmentService', function ($scope, $timeout, AppointmentService) {
        $scope.appointmentToCancel = null;
        $scope.appointmentCancelReason = '';

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

    }])





















