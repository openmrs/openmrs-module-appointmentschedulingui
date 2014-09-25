angular.module('appointmentscheduling')
    .controller('TimeZoneWarningCtrl', function ($scope) {

        $scope.invalidTimeZone =  function () {
            // TODO is this negation safe?  will the comparison always work?
            var clientTimeZoneOffset =  -(new Date().getTimezoneOffset());
            return clientTimeZoneOffset != serverTimeZoneOffset;
        }

    });
