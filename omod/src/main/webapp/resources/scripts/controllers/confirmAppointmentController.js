angular.module('appointmentscheduling.scheduleAppointment')
    .controller('ConfirmAppointmentCtrl', ['$scope', 'AppointmentService', function ($scope, AppointmentService) {
        $scope.appointmentReason = '';

        $scope.confirmAppointment = function() {

            $scope.confirmAppointmentButtonsDisabled = true;

            if ($scope.selectedTimeSlot.full && canOverbook) {    // canOverbook is global var from scheduleAppointments.gsp

                var confirmOverbook = emr.setupConfirmationDialog({
                    selector: '#confirm-overbook-dialog',
                    actions: {
                        confirm: function() {
                            confirmOverbook.close();
                            saveAppointment();
                        },
                        cancel: function() {
                            confirmOverbook.close();
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

            AppointmentService.saveAppointment(appointment, canOverbook).then(function() {    // canOverbook is global var from scheduleAppointments.gsp

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
