angular.module('appointmentscheduling')
    .controller('AppointmentsTabCtrl', ['$scope',

        function ($scope) {
            $scope.init = function() {

                // TODO kind of hacky because it depends on the format/implementation of the tab to always be this href format
                // don't load the appointments and appointment requests until the appt tab is select (we are running into a angular error I can't solve if we try to pre-load these)
                jq("a[href='#appointmentschedulingui.tab']").click(function() {
                    $scope.$broadcast('appointmentRequests.loadAppointmentRequests');
                    $scope.$broadcast('appointmentRequests.loadAppointments');
                })

            }
        }])


