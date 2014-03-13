angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, AppointmentBlock, TimeSlot, ScheduledAppointmentBlock) {

        return {

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

            /**
             * Fetches Appointment Blocks based on parameters in param map
             *
             * @param appointmentType - uuid of type of the appointment this block must support
             * @param fromDate - (optional) earliest start date.
             * @param toDate - (optional) latest start date.
             * @param provider - (optional) uuid of the appointment block's provider.
             * @param location - (optional) uuid of the appointment block's location. (or predecessor location)
             * @returns $promise of array of matching appointment blocks (REST default representation by default)
             */
            getAppointmentBlocks: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return AppointmentBlock.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            /**
             * Saves the passed in Appointment Block
             *
             * @param appointmentBlock
             * @returns $promise with the result of the save
             */
            saveAppointmentBlock: function(appointmentBlock)  {
                return AppointmentBlock.save(appointmentBlock).$promise
            },

            /**
             * Deletes the passed Appointment Block
             *
             * @param appointmentBlockUuid
             * @returns $promise with result of the delete
             */
            deleteAppointmentBlock: function(appointmentBlockUuid) {
                return AppointmentBlock.delete({ 'uuid': appointmentBlockUuid }).$promise;
            },

            /**
             * Fetches Appointments based on parameters in params map
             *
             * @param fromDate (optional) - The appointment start date
             * @param toDate (optional) - The appointment end date
             * @param location (optional) - The appointment location
             * @param provider (optional) - The appointment provider
             * @param appointmentType (optional) - The appointment type
             * @param status (optional) - The appointment status
             * @param patient (optional) - The patient
             * @return  $promise of array of matching appointment (REST default representation by default)
             */
            getAppointments: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return Appointment.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            /**
             * Saves an Appointment
             *
             * @param appointment to save
             * @returns $promise with results
             */
            saveAppointment: function(appointment) {
                return Appointment.save(appointment).$promise
            },

            /**
             * Marks an appointment as CANCELLED
             * @param appointment
             */
            cancelAppointment: function(appointment) {
                appointment.status = 'CANCELLED';
                return Appointment.save(appointment).$promise
            },

            getScheduledAppointmentBlocks: function(params){
                return ScheduledAppointmentBlock.query(params).$promise.then(function(res){
                    return res.results;
                });
            }
        };

    });