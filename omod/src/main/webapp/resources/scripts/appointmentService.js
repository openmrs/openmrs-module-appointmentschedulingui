

angular.module('appointmentscheduling.appointmentService', ['appointmentscheduling.appointmentResources'])
    .factory('AppointmentService', function(AppointmentType) {

        return {
            getAppointmentTypes: function(searchString) {
                return AppointmentType.query({"q":searchString}).$promise
                    .then(function(res){
                        return res.results;
                    });

                }
        };

    });