angular.module('scheduleAppointmentTimeframePickerApp', [])
    .controller('timeframePickerController', function($scope){
        $scope.now = new Date();

        var initializeStartDatePicker = function () {
            $scope.startDateOptions = {
                opened: false,
                open: function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $scope.startDateOptions.opened = true;
                    $scope.endDateOptions.opened = false;
                }
            };
        };

        var initializeEndDatePicker = function () {
            $scope.endDateOptions = {
                opened: false,
                open: function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $scope.startDateOptions.opened = false;
                    $scope.endDateOptions.opened = true;
                }
            };
        };

        initializeStartDatePicker();
        initializeEndDatePicker();

        $scope.$watch('startDate', function(newValue) {
            $scope.$emit('timeframePickerApp.changeFromDate', newValue);
        });
        $scope.$watch('endDate', function(newValue) {
            $scope.$emit('timeframePickerApp.changeEndDate', newValue);
        });
    });
