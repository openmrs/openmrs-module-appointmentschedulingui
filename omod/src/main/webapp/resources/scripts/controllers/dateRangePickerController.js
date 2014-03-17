angular.module('scheduleAppointmentDateRangePickerApp')
    .controller('dateRangePickerController', ['$scope', function($scope){
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
            $scope.$emit('dateRangePickerApp.changeStartDate', newValue);
        });
        $scope.$watch('endDate', function(newValue) {
            $scope.$emit('dateRangePickerApp.changeEndDate', newValue);
        });
    }]);
