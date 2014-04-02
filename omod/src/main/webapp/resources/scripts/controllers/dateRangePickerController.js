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
                },
                clear: function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $scope.startDate = '';
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
                },
                clear: function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    $scope.endDate = '';
                }
            };
        };

        initializeStartDatePicker();
        initializeEndDatePicker();

        $scope.$watch('startDate', function(newValue) {
            var eventData = {
                senderId : $scope.senderId,
                data : newValue
            };
            $scope.$emit('dateRangePickerApp.changeStartDate', eventData);
        });
        $scope.$watch('endDate', function(newValue) {
            var eventData = {
                senderId: $scope.senderId,
                data: newValue
            };
            $scope.$emit('dateRangePickerApp.changeEndDate', eventData);
        });
    }]);
