angular.module('appointmentscheduling.scheduleAppointment')
    .controller('ConfirmAppointmentCtrl', ['$scope', 'AppointmentService', function ($scope, AppointmentService) {
        $scope.appointmentReason = '';

        $scope.confirmAppointment = function() {

            $scope.confirmAppointmentButtonsDisabled = true;

            if ($scope.selectedTimeSlot.full) {

                var confirmOverbook = emr.setupConfirmationDialog({
                    selector: '#confirm-overbook-dialog',
                    actions: {
                        confirm: function() {
                            saveAppointment();
                        },
                        cancel: function() {
                            $scope.cancelConfirmAppointment();
                            $scope.confirmAppointmentButtonsDisabled = false;
                            $scope.$parent.$digest();
                        }

                    }
                });

                confirmOverbook.show();
            }
            else {
                saveAppointment();
            }

        }

        var saveAppointment = function() {

            var appointment = { 'appointmentType': $scope.appointmentType.uuid,
                'status': 'SCHEDULED',
                'timeSlot': $scope.selectedTimeSlot.uuid,
                'reason': $scope.appointmentReason,
                'patient': patientUuid  // from global scope, defined in scheduleAppointment.gsp
            };

            AppointmentService.saveAppointment(appointment, true).then(function() {

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
