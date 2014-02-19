

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, AppointmentBlock, TimeSlot) {

        return {

            // TODO write up the various tests?

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

            getAppointmentBlocks: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return AppointmentBlock.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            // TODO service method to create time slot for appointment block? make sure this works properly with editing
            // TODO what about the bug Dave saw when editing appointment blocks?

            saveAppointmentBlock: function(appointmentBlock) {

                var params = {};
                var postData = angular.copy(appointmentBlock);

                // need to pull the uuid off the object because OpenMRS API doesn't like getting it
                if (postData.uuid) {
                    params = { uuid: appointmentBlock.uuid };
                    delete postData.uuid;
                }

                return AppointmentBlock.save(params, postData).$promise
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

                // TODO add the same stuff here as I've added to saveAppointmentBlock?

                return Appointment.save(appointment).$promise
            }
        };

    });