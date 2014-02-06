

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, TimeSlot) {

        return {

            // returns ref representation
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({"q":searchString}).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            // returns default representation by default
            getTimeSlots: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return TimeSlot.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });
            },

            saveAppointment: function(appointment) {
                return Appointment.save(appointment).$promise;
            }
        };

    });