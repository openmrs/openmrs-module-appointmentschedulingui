describe('date range picker controller', function() {
    var scope;

    beforeEach(module('scheduleAppointmentDateRangePickerApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('dateRangePickerController', {$scope: scope});
    }));

    describe('two date pickers must never be open at the same time', function () {
        var fakeEvent = jasmine.createSpyObj('fakeEvent', ['preventDefault', 'stopPropagation']);

        it('closes the "end date picker" when the "start date picker" is open', function () {
            scope.startDateOptions.open(fakeEvent);

            expect(scope.startDateOptions.opened).toBeTruthy();
            expect(scope.endDateOptions.opened).toBeFalsy();
        });

        it('closes the "start date picker" when the the "end date picker" is open', function() {
            scope.endDateOptions.open(fakeEvent);

            expect(scope.startDateOptions.opened).toBeFalsy();
            expect(scope.endDateOptions.opened).toBeTruthy();
        });
    });

    describe('when a date changes a notification is sent', function () {
        it('sends a notification when the start date changes', function () {
            scope.senderId = "sender 1";
            var newDate = 'new date';
            var eventData = {
                senderId: scope.senderId,
                data:newDate
            };

            var startDateListener = jasmine.createSpy('startDateListener');
            scope.$on('dateRangePickerApp.changeStartDate', startDateListener);

            scope.startDate = newDate;
            scope.$apply();

            expect(startDateListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);
        });

        it('sends a notification when the end date changes', function () {
            scope.senderId = "sender 1";
            var newDate = 'new date';
            var eventData = {
                senderId: scope.senderId,
                data:newDate
            };
            var endDateListener = jasmine.createSpy('endDateListener');
            scope.$on('dateRangePickerApp.changeEndDate', endDateListener);

            scope.endDate = newDate;
            scope.$apply();

            expect(endDateListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);
        });

        it('sends a notification with empty date when start clear date is selected', function () {
            scope.startDate = 'old date';
            scope.senderId = "sender 1";
            var eventData = {
                senderId: scope.senderId,
                data:''
            };
            var startDateListener = jasmine.createSpy('startDateListener');
            scope.$on('dateRangePickerApp.changeStartDate', startDateListener);
            var fakeEvent = jasmine.createSpyObj('fakeEvent', ['preventDefault', 'stopPropagation']);

            scope.startDateOptions.clear(fakeEvent);
            scope.$apply();

            expect(startDateListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);
            expect(scope.startDate).toBe('');
        });

        it('sends a notification with empty date when end clear date is selected', function () {
            scope.endDate = 'old date';
            scope.senderId = "sender 1";
            var eventData = {
                senderId: scope.senderId,
                data:''
            };
            var endDateListener = jasmine.createSpy('endDateListener');
            scope.$on('dateRangePickerApp.changeEndDate', endDateListener);
            var fakeEvent = jasmine.createSpyObj('fakeEvent', ['preventDefault', 'stopPropagation']);

            scope.endDateOptions.clear(fakeEvent);
            scope.$apply();

            expect(endDateListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);
            expect(scope.endDate).toBe('');

        });
    });
})
