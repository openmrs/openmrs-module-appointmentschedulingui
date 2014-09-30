
angular.module('appointmentscheduling.requestAppointment')
    .controller('RequestAppointmentCtrl', function ($scope, AppointmentService, ProviderService) {

        // TODO handle editing a request form
        $scope.appointmentRequest = {};

        $scope.timeFrameUnits = [ {} ];

        $scope.validation = {

            appointmentTypeChosen: false,
            ifValueEnteredThenCorrespondingUnitsBeSet: true,
            minBeforeOrEqualToMax: true,

            isValid: function () {
                return this.appointmentTypeChosen && this.ifValueEnteredThenCorrespondingUnitsBeSet
                    && this.minBeforeOrEqualToMax;
            }
        }

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

        // backing function for the provider autocomplete
        $scope.getProviders = function (searchString) {
            // TODO sort???
            return ProviderService.getProviders({'q': searchString, 'v': 'default'});
        }

        $scope.validateAppointmentRequest = function() {
            // must have picked an appointment type; if a min/max value has been entered, corresponding min/max unit must be selected, and vice versa

            $scope.validation.appointmentTypeChosen = $scope.appointmentRequest.appointmentType ? true : false;

            $scope.validation.ifValueEnteredThenCorrespondingUnitsBeSet =
                ( ($scope.appointmentRequest.minTimeFrameUnits && $scope.appointmentRequest.minTimeFrameValue)
                    || (!$scope.appointmentRequest.minTimeFrameUnits && !$scope.appointmentRequest.minTimeFrameValue) )
                && ( ($scope.appointmentRequest.maxTimeFrameUnits && $scope.appointmentRequest.maxTimeFrameValue)
                    || (!$scope.appointmentRequest.maxTimeFrameUnits && !$scope.appointmentRequest.maxTimeFrameValue) );

            // compare dates, but only if all min/max values have bee set
            $scope.validation.minBeforeOrEqualToMax =
                !($scope.appointmentRequest.minTimeFrameValue && $scope.appointmentRequest.maxTimeFrameValue && $scope.appointmentRequest.minTimeFrameUnits && $scope.appointmentRequest.maxTimeFrameUnits)
                ||  (moment().add(parseInt($scope.appointmentRequest.minTimeFrameValue), $scope.appointmentRequest.minTimeFrameUnits.toLowerCase()).startOf('day') <
                     moment().add(parseInt($scope.appointmentRequest.maxTimeFrameValue), $scope.appointmentRequest.maxTimeFrameUnits.toLowerCase()).startOf('day'))

            return $scope.validation.isValid();
        }

        $scope.verifyTimeFrameValues = function() {

            if (isNaN($scope.appointmentRequest.minTimeFrameValue)) {
                $scope.appointmentRequest.minTimeFrameValue = '';
            }

            if (isNaN($scope.appointmentRequest.maxTimeFrameValue)) {
                $scope.appointmentRequest.maxTimeFrameValue = '';

            }

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
                // success callback
                redirectToReturnPage();
            }).
            catch(function () {
                // error callback
                emr.errorMessage("appointmentschedulingui.requestAppointment.errorRequestingAppointment");
            })


        }

        $scope.cancel = function () {
            redirectToReturnPage();
        }

        var redirectToReturnPage = function () {
            emr.navigateTo({
                provider: $scope.returnProvider,
                page: $scope.returnPage,
                query: { patientId: $scope.appointmentRequest.patient }
            });
        }

    });
