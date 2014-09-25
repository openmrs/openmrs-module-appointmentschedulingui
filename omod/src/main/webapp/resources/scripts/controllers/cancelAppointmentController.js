angular.module('appointmentscheduling')
    .controller('CancelAppointmentCtrl', ['$scope', '$timeout', 'AppointmentService', function ($scope, $timeout, AppointmentService) {


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
            AppointmentService.cancelAppointment($scope.appointmentToCancel).then(function(result) {
                // success callback
                var canceledAppointment = result;
                var eventData = {
                    uuid: canceledAppointment.uuid
                };
                $scope.$emit('appointmentscheduling.cancelAppointment.success', eventData);
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

        $scope.$on('appointmentscheduling.cancelAppointment', function(event, eventData) {
            $scope.confirmCancelAppointment(eventData.uuid);
        });

    }]);