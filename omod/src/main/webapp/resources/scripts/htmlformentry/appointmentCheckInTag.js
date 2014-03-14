angular.module('appointmentscheduling.appointmentCheckInTag', ['appointmentscheduling.appointmentService'])
    .controller('AppointmentCheckInTagCtrl', function ($scope, AppointmentService) {

        /**
         * Private utility methods
         */
        var getAppointmentsForPatientOnDate = function() {

            $scope.appointmentsToCheckIn = [];
            $scope.otherAppointmentsOnSameDay = [];

            // get the query parameters
            var patientUuid = appointmentCheckInTagPatientUuid;
            var date = getValue('encounterDate.value') ? getValue('encounterDate.value') : appointmentCheckInTagDate;
            var locationUuid = getValue('encounterLocation.value') ? locationIdToUuidMap[getValue('encounterLocation.value')] : appointmentCheckInTagLocationUuid;

            // we need to manually format here because the default moment format displays a time zone offset as -5:00 (which is ISO 6801)
            // but currently WS-REST only accepts the format -500 (RFC 822) (the 'ZZ' instead of 'Z' specifies this format)

            // TODO note that we are not handling appointments in the RESCHEDULED state -- should probably fix this

            var params = { fromDate: moment(date).startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
                            toDate: moment(date).endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
                            patient: patientUuid, status: "SCHEDULED" }

            AppointmentService.getAppointments(params).then(function(results) {

                // break up into appointments at this location and appointments at other locations
                angular.forEach(results, function(appointment) {
                    if (appointment.timeSlot.appointmentBlock.location.uuid == locationUuid) {
                        $scope.appointmentsToCheckIn.push(appointment);
                    }
                    else {
                        $scope.otherAppointmentsOnSameDay.push(appointment);
                    }
                })
            });
        }

        var registerEventHandlers = function () {

            jq(getField('encounterLocation.value')).change(function() {
                getAppointmentsForPatientOnDate();
            });
            jq(getField('encounterDate.value')).change(function() {
                getAppointmentsForPatientOnDate();
            })

        }

        /**
         * Model
         */

        $scope.appointmentsToCheckIn;
        $scope.otherAppointmentsOnSameDay;

        /**
         * Methods
         */

        $scope.init = function () {
            getAppointmentsForPatientOnDate();
            registerEventHandlers();
        }

        $scope.init();
    });
