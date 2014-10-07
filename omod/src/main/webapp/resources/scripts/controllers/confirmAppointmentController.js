angular.module('appointmentscheduling')
    .controller('ConfirmAppointmentCtrl', ['$scope', 'AppointmentService', function ($scope, AppointmentService) {

        // this controller expects to inherit scope from another controller (ie, the schedule appointment controller)

        $scope.appointmentReason = '';

        $scope.init = function(canOverbook) {
            $scope.canOverbook = canOverbook;
        },

        $scope.confirmAppointment = function() {

            $scope.confirmAppointmentButtonsDisabled = true;

            if ($scope.selectedTimeSlot.requiresOverbook && $scope.canOverbook) {

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
                'patient': $scope.patientUuid
            };

            AppointmentService.saveAppointment(appointment,  $scope.canOverbook).then(function() {

                // if an associated appointment request has been set (would be set in the parent scope (scheduleAppointmentController), mark it as fulfilled
                if ($scope.selectedAppointmentRequest && $scope.selectedAppointmentRequest.appointmentType.uuid == $scope.appointmentType.uuid) {
                    AppointmentService.markAppointmentRequestFulfilled($scope.selectedAppointmentRequest);
                }

                // success callback
                if ($scope.returnUrl) {
                    emr.navigateTo({ url: $scope.returnUrl });
                } else {
                    emr.navigateTo({
                        provider: 'appointmentschedulingui',
                        page: 'sessionInfo',
                        query: { patientUuid: $scope.patientUuid }
                    });
                }

            }).catch(function () {
                    // error callback
                    emr.errorMessage("appointmentschedulingui.scheduleAppointment.errorSavingAppointment");
                })
        }

    }])
