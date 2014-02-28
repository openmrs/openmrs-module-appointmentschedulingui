angular.module('timeframePickerApp', []).directive('timeframepicker', function() {
    var initializeStartDatePicker = function (scope) {
        scope.startDateOptions = {
            opened: false,
            open: function(event) {
                event.preventDefault();
                event.stopPropagation();

                scope.startDateOptions.opened = true;
                scope.endDateOptions.opened = false;
            }
        };
    }

    var initializeEndDatePicker = function (scope) {
        scope.endDateOptions = {
            opened: false,
            open: function(event) {
                event.preventDefault();
                event.stopPropagation();

                scope.startDateOptions.opened = false;
                scope.endDateOptions.opened = true;
            }
        }
    };

    return {
        restrict: 'E',
        scope: { headermessage: '@headermessage' },
        templateUrl: '../ms/uiframework/resource/appointmentschedulingui/partials/timeframepicker.html',

        link: function($scope) {
            $scope.now = new Date();
            initializeStartDatePicker($scope);
            initializeEndDatePicker($scope);

            $scope.$watch('startDate', function(newValue) {
                $scope.$emit('timeframePickerApp.changeFromDate', newValue);
            });
            $scope.$watch('endDate', function(newValue) {
                $scope.$emit('timeframePickerApp.changeEndDate', newValue);
            });
        }
    };

});