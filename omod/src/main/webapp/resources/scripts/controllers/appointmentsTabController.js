angular.module('appointmentscheduling')
    .controller('AppointmentsTabCtrl', ['$scope',

        function ($scope) {
            $scope.init = function() {

                // TODO kind of hacky because it depends on the format/implementation of the tab to always be this href format
                jq("a[href='#org.openmrs.module.appointmentschedulingui.tab']").click(function() {
                    $scope.$broadcast('appointmentRequests.loadAppointmentRequests');
                    $scope.$broadcast('appointmentRequests.loadAppointments');
                })

            }
        }])


