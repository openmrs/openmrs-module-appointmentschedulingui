angular.module('appointmentscheduling.scheduleAppointment')
    .controller('ConfirmAppointmentCtrl', ['$scope', 'AppointmentService', function ($scope, AppointmentService) {
        $scope.appointmentReason = '';

        $scope.confirmAppointment = function() {

            $scope.confirmAppointmentButtonsDisabled = true;

            var appointment = { 'appointmentType': $scope.appointmentType.uuid,
                'status': 'SCHEDULED',
                'timeSlot': $scope.selectedTimeSlot.uuid,
                'reason': $scope.appointmentReason,
                'patient': patientUuid  // from global scope, defined in scheduleAppointment.gsp
            };

            AppointmentService.saveAppointment(appointment).then(function() {

                // success callback
                emr.navigateTo({
                    provider: 'appointmentschedulingui',
                    page: 'sessionInfo',
                    query: { patientUuid: patientUuid }
                });
            }).catch(function () {
                    // error callback
                    emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorSavingAppointment");
                })
        }

    }])
