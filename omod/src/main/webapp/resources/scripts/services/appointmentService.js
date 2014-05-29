angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(Appointment, AppointmentType, AppointmentStatusType, AppointmentBlock, TimeSlot, ScheduledAppointmentBlock, AppointmentAllowingOverbook, DataSet) {

        return {

            /**
             * Fetches Appointment Types
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching appointment types (REST full representation by default)
             */
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({'q':searchString, 'v': 'full'}).$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);

            },

            /**
             * Fetches Appointment Status Types
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching appointment status types (REST full representation by default)
             */
            getAppointmentStatusTypes: function() {
                return AppointmentStatusType.query().$promise
                    .then(function(res) {
                        return res.results;
                    }, emr.handleNotLoggedIn);

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
                    }, emr.handleNotLoggedIn);
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
                    }, emr.handleNotLoggedIn);

            },

            /**
             * Saves the passed in Appointment Block
             *
             * @param appointmentBlock
             * @returns $promise with the result of the save
             */
            saveAppointmentBlock: function(appointmentBlock)  {
                return AppointmentBlock.save(appointmentBlock).$promise
                    .catch(emr.handleNotLoggedIn);
            },

            /**
             * Deletes the passed Appointment Block
             *
             * @param appointmentBlockUuid
             * @returns $promise with result of the delete
             */
            deleteAppointmentBlock: function(appointmentBlockUuid) {
                return AppointmentBlock.delete({ 'uuid': appointmentBlockUuid }).$promise
                    .catch(emr.handleNotLoggedIn);
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
                    }, emr.handleNotLoggedIn);
            },

            /**
             * Saves an Appointment
             *
             * @param appointment to save
             * @returns $promise with results
             */
            saveAppointment: function(appointment, allowOverbook) {
                if (allowOverbook) {
                    return AppointmentAllowingOverbook.save(appointment).$promise
                        .catch(emr.handleNotLoggedIn);
                }
                else {
                    return Appointment.save(appointment).$promise
                        .catch(emr.handleNotLoggedIn);
                }
            },

            /**
             * Marks an appointment as CANCELLED
             * @param appointment
             */
            cancelAppointment: function(appointment) {
                appointment.status = 'CANCELLED';
                return Appointment.save(appointment).$promise
                    .catch(emr.handleNotLoggedIn);
            },


            /**
             * Fetches DataSet of Daily Appointments (as defined in AppointmentSchedulingUIDataSetDefinitionLibrary) for a given date and location
             *
             * @param date - The appointment date
             * @param location - The appointment location
             * @return  $promise of array of matching appointments
             */
            getDailyAppointmentsDataSet: function(params) {

                // TODO put this uuid in a constant file somewhere
                params['uuid'] = 'c1bf0730-e69e-11e3-ac10-0800200c9a66';

                return DataSet.get(params).$promise
                    .then(function(res) {
                        return res;   // the dataset resource does not return a "results" top-level key
                    }, emr.handleNotLoggedIn);

            },


            // TODO: REMOVE

            getScheduledAppointmentBlocks: function(params){
                    return ScheduledAppointmentBlock.query(params).$promise.then(function(res){
                        return res.results;
                    }, emr.handleNotLoggedIn);
            }
        };

    });