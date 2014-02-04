

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(AppointmentType, TimeSlot) {

        return {

            // returns ref representation
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({"q":searchString}).$promise
                    .then(function(res) {
                        return res.results;
                    });

            },

            getTimeSlots: function(params) {

                if (params['v'] == undefined) {
                    params['v'] = 'default';
                }

                return TimeSlot.query(params).$promise
                    .then(function(res) {
                        return res.results;
                    });
            }
        };

    });