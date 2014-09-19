
angular.module('appointmentscheduling.requestAppointment')
    .controller('RequestAppointmentCtrl', function ($scope, AppointmentService, ProviderService) {

        // TODO handle editing a request form
        // TODO validation on field exit of the actual values of the days/months/years; max greater than min, value not a number
        // TODO better error handling--catch if bad response

        $scope.appointmentRequest = {};

        $scope.timeFrameUnits = [ {} ];

        $scope.init = function(patientUuid, requestedByUuid, returnProvider, returnPage) {

            $scope.appointmentRequest.patient = patientUuid;
            $scope.appointmentRequest.requestedBy = requestedByUuid;

            $scope.returnProvider = returnProvider;
            $scope.returnPage = returnPage;

            // set up the time frame unit options
            AppointmentService.getTimeFrameUnits().then(function(timeFrameUnits) {
                angular.forEach(timeFrameUnits, function(timeFrameUnit) {
                    $scope.timeFrameUnits.push({ display: emr.message("appointmentschedulingui.timeframeunits." + timeFrameUnit),
                        value: timeFrameUnit });
                });
            });

        },

        // backing functional for the appointment type autocomplete
        $scope.getAppointmentTypes = function(searchString) {
            return AppointmentService.getAppointmentTypes(searchString);
        }

        // backing function for the provider automcomplete
        $scope.getProviders = function (searchString) {
            // TODO sort???
            return ProviderService.getProviders({'q': searchString, 'v': 'default'});
        }

        $scope.validateAppointmentRequest = function() {
            // must have picked an appointment type; if a min/max value has been entered, corresponding min/max unit must be selected, and vice versa
            return $scope.appointmentRequest.appointmentType
                && ( ($scope.appointmentRequest.minTimeFrameUnits && $scope.appointmentRequest.minTimeFrameValue)
                    || (!$scope.appointmentRequest.minTimeFrameUnits && !$scope.appointmentRequest.minTimeFrameValue) )
                && ( ($scope.appointmentRequest.maxTimeFrameUnits && $scope.appointmentRequest.maxTimeFrameValue)
                    || (!$scope.appointmentRequest.maxTimeFrameUnits && !$scope.appointmentRequest.maxTimeFrameValue) );
        }


        $scope.saveAppointmentRequest = function() {

            // default requested time to now
            $scope.appointmentRequest.requestedOn = moment().format();

            // annoying that we have to do this, but I can't seem to get the typeahead to store the uuid without also displaying the uuid when selected, so the submit model is slightly different than the display model
            var appointmentRequestToSave = {
                status: 'PENDING',
                requestedOn: moment().format(),
                patient: $scope.appointmentRequest.patient,
                requestedBy: $scope.appointmentRequest.requestedBy,
                appointmentType: $scope.appointmentRequest.appointmentType.uuid,
                provider: $scope.appointmentRequest.provider ? $scope.appointmentRequest.provider.uuid : null,
                minTimeFrameValue: $scope.appointmentRequest.minTimeFrameValue ? $scope.appointmentRequest.minTimeFrameValue : null,
                minTimeFrameUnits: $scope.appointmentRequest.minTimeFrameUnits ? $scope.appointmentRequest.minTimeFrameUnits : null,
                maxTimeFrameValue: $scope.appointmentRequest.maxTimeFrameValue ? $scope.appointmentRequest.maxTimeFrameValue : null,
                maxTimeFrameUnits: $scope.appointmentRequest.maxTimeFrameUnits ? $scope.appointmentRequest.maxTimeFrameUnits : null,
                notes: $scope.appointmentRequest.notes ? $scope.appointmentRequest.notes : null
            }

            AppointmentService.saveAppointmentRequest(appointmentRequestToSave).then(function() {
                emr.navigateTo({
                    provider: $scope.returnProvider,
                    page: $scope.returnPage,
                    query: { patientId: $scope.appointmentRequest.patient }
                });
            })

            // TODO handle failure case

        }


    });
