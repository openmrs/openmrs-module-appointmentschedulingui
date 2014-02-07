

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, TimeSlot) {

        return {

            /**
             * Fetches Appointment Types
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching appointment types (REST ref representation by default)
             */
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({"q":searchString}).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            /**
             * Fetches Time Slots based on parameters in param map
             *
             * @param fromDate: only time slots after this date
             * @param toDate: only time slots before this date
             * @param appointmentType: uuid of appointmentType to match against
             * @param provider; uuid of provider to match against
             * @param location: uuid of location to match against
             * @returns $promise of array of matching time slots (REST default representation by default)
             */
            getTimeSlots: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return TimeSlot.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });
            },

            /**
             * Saves an appointment
             *
             * @param appointment to save
             * @returns $promise with results
             */
            saveAppointment: function(appointment) {
                return Appointment.save(appointment).$promise
            }
        };

    });