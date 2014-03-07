describe('timeframepicker controller', function() {
    var scope;

    beforeEach(module('scheduleAppointmentTimeframePickerApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('timeframePickerController', {$scope: scope});
    }));

    describe('two timepickers must never be open at the same time', function () {
        var fakeEvent = jasmine.createSpyObj('fakeEvent', ['preventDefault', 'stopPropagation']);

        it('closes the "end timepicker" when the "start timepicker" is open', function () {
            scope.startDateOptions.open(fakeEvent);

            expect(scope.startDateOptions.opened).toBeTruthy();
            expect(scope.endDateOptions.opened).toBeFalsy();
        });

        it('closes the "start timepicker" when the the "end timepicker" is open', function() {
            scope.endDateOptions.open(fakeEvent);

            expect(scope.startDateOptions.opened).toBeFalsy();
            expect(scope.endDateOptions.opened).toBeTruthy();
        });
    });

    describe('when a date changes a notification is sent', function () {
        it('sends a notification when the start date changes', function () {
            var newDate = 'new date';

            var startDateListener = jasmine.createSpy('startDateListener');
            scope.$on('timeframePickerApp.changeFromDate', startDateListener);

            scope.startDate = newDate;
            scope.$apply();

            expect(startDateListener).toHaveBeenCalledWith(jasmine.any(Object), newDate);
        });

        it('sends a notification when the end date changes', function () {
            var newDate = 'new date';

            var endDateListener = jasmine.createSpy('endDateListener');
            scope.$on('timeframePickerApp.changeEndDate', endDateListener);

            scope.endDate = newDate;
            scope.$apply();

            expect(endDateListener).toHaveBeenCalledWith(jasmine.any(Object), newDate);

        });
    });
})
