angular.module('scheduleAppointmentDateRangePickerApp')
    .controller('dateRangePickerController', ['$scope', function($scope){
        $scope.now = new Date();

        var initializeStartDatePicker = function () {
            if ($scope.fromDate){
                $scope.startDate = new Date($scope.fromDate);
            }

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
                },
                set: function(date) {
                    $scope.startDate = date;
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
                },
                set: function(date) {
                    $scope.endDate = date;
                }
            };
        };

        initializeStartDatePicker();
        initializeEndDatePicker();

        // emits events when a date changes
        $scope.$watch('startDate', function(newValue) {
            var eventData = {
                senderId : $scope.senderId,
                data : newValue
            };
            $scope.$emit('dateRangePickerApp.startDateChanged', eventData);
        });
        $scope.$watch('endDate', function(newValue) {
            var eventData = {
                senderId: $scope.senderId,
                data: newValue
            };
            $scope.$emit('dateRangePickerApp.endDateChanged', eventData);
        });

        // listens for events to update a date
        $scope.$on('dateRangePickerApp.changeDate', function(event, eventData) {
            if (eventData.senderId === $scope.senderId) {

                $scope.startDateOptions.set(eventData.startDate ? moment(eventData.startDate).format("DD-MMMM-YYYY") : null);
                $scope.endDateOptions.set(eventData.endDate ? moment(eventData.endDate).format("DD-MMMM-YYYY") : null);

                // trigger any callback that may have been passed in as a parameter
                if (eventData.callback) {
                    eventData.callback();
                }
            }

        });

    }]);
