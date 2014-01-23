

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(AppointmentType) {

        return {
            getAppointmentTypes: function(searchString) {

                // TODO update to actually query by search param! I believe this reloads every time
                return AppointmentType.query().$promise
                    .then(function(res){
                        return res.results;
                    });

                }
        };

    });