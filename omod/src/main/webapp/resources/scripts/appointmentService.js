angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, AppointmentBlock, TimeSlot, ScheduledAppointmentBlock) {

        return {

            // TODO write up the various tests?

            /**
             * Fetches Appointment Types
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching appointment types (REST ref representation by default)
             */
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({'q':searchString}).$promise
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

            getAppointmentBlocks: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return AppointmentBlock.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            // TODO what about the bug Dave saw when editing appointment blocks?

            saveAppointmentBlock: function(appointmentBlock)  {
                return AppointmentBlock.save(appointmentBlock).$promise
            },

            deleteAppointmentBlock: function(appointmentBlockUuid) {
                return AppointmentBlock.delete({ 'uuid': appointmentBlockUuid }).$promise;
            },

            /**
             * Saves an appointment
             *
             * @param appointment to save
             * @returns $promise with results
             */
            saveAppointment: function(appointment) {
                return Appointment.save(appointment).$promise
            },

            getScheduledAppointmentBlocks: function(params){
                return ScheduledAppointmentBlock.query(params).$promise.then(function(res){
                    return res.results;
                });
            }
        };

    });