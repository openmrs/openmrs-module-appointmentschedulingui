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
            scope.$on('dateRangePickerApp.startDateChanged', startDateListener);

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
            scope.$on('dateRangePickerApp.endDateChanged', endDateListener);

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
            scope.$on('dateRangePickerApp.startDateChanged', startDateListener);
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
            scope.$on('dateRangePickerApp.endDateChanged', endDateListener);
            var fakeEvent = jasmine.createSpyObj('fakeEvent', ['preventDefault', 'stopPropagation']);

            scope.endDateOptions.clear(fakeEvent);
            scope.$apply();

            expect(endDateListener).toHaveBeenCalledWith(jasmine.any(Object), eventData);
            expect(scope.endDate).toBe('');

        });

        describe('set should set start and end date', function () {

            var someDate = new Date();

            it('set start date', function () {
                scope.startDateOptions.set(someDate);
                expect(scope.startDate).toBe(moment(someDate).format("DD MMM YYYY"));
            });

            it('set end start date', function() {
                scope.endDateOptions.set(someDate);
                expect(scope.endDate).toBe(moment(someDate).format("DD MMM YYYY"));
            });
        });

        describe('should update dates when receiving events', function() {

            var someDate = new Date();
            var anotherDate = new Date();

            it('set start date and end date and trigger callback when date event triggered and correct sender Id', function() {

                var mock = jasmine.createSpyObj('mock', ['callback']);

                scope.senderId = 'correctId';

                var eventData = {
                    startDate: someDate,
                    endDate: anotherDate,
                    senderId: 'correctId',
                    callback: mock.callback
                }

                scope.$emit("dateRangePickerApp.changeDate", eventData);
                scope.$apply();

                expect(scope.startDate).toBe(moment(someDate).format("DD MMM YYYY"));
                expect(scope.endDate).toBe(moment(anotherDate).format("DD MMM YYYY"));
                expect(mock.callback).toHaveBeenCalled();
            });

            it('should set end date to null when date event triggered has no end date', function() {

                var mock = jasmine.createSpyObj('mock', ['callback']);

                scope.senderId = 'correctId';
                scope.endDate = new Date();

                var eventData = {
                    startDate: someDate,
                    senderId: 'correctId'
                }

                scope.$emit("dateRangePickerApp.changeDate", eventData);
                scope.$apply();

                expect(scope.startDate).toBe(moment(someDate).format("DD MMM YYYY"));
                expect(scope.endDate).toBeNull();
            });

            it('should not set start date when date event triggered has no start date', function() {

                var mock = jasmine.createSpyObj('mock', ['callback']);

                scope.senderId = 'correctId';
                scope.startDate = new Date();

                var eventData = {
                    endDate: someDate,
                    senderId: 'correctId'
                }

                scope.$emit("dateRangePickerApp.changeDate", eventData);
                scope.$apply();

                expect(scope.startDate).toBeNull();
                expect(scope.endDate).toBe(moment(someDate).format("DD MMM YYYY"));
            });

            it('should not set start date and end date when date event triggered and incorrect sender Id', function() {

                var mock = jasmine.createSpyObj('mock', ['callback']);

                scope.senderId = 'correctId';

                var eventData = {
                    startDate: someDate,
                    endDate: anotherDate,
                    senderId: 'incorrectId',
                    callback: mock.callback
                }

                scope.$emit("dateRangePickerApp.changeDate", eventData);
                scope.$apply();

                expect(scope.startDate).toBeUndefined();
                expect(scope.endDate).toBeUndefined();
                expect(mock.callback).not.toHaveBeenCalled();
            });



        })
    });
})
