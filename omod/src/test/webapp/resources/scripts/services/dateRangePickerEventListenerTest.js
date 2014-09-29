describe('dateRangePickerEventListener Factory', function () {
    var scope,
        factory;

    beforeEach(function() {
        module('scheduleAppointmentDateRangePickerApp');

        inject(function($rootScope, $injector) {
            scope = $rootScope.$new();
            factory = $injector.get('dateRangePickerEventListener');
        });
    });

    describe('it must listen for a dateRangePickerApp.startDateChanged event', function () {
        var senderId = "sender 1";
        var date = '15';
        var eventData = {
            senderId: senderId,
            data: date
        };

        it('should update the fromDate field with the new value, when a dateRangePickerApp.startDateChanged event from the same sender id is received', function () {
           factory.subscribe(scope, senderId);
           scope.$emit('dateRangePickerApp.startDateChanged', eventData);

           expect(scope.fromDate).toBe(date);
        });
        it('should not update the fromDate field with the new value, when a dateRangePickerApp.startDateChanged event from different sender id is received', function () {
            scope.fromDate = "1"

            factory.subscribe(scope, "sender 2");
            scope.$emit('dateRangePickerApp.startDateChanged', eventData);

            expect(scope.fromDate).toBe("1");
        });

    });

    describe('it must listen for a dateRangePickerApp.endDateChanged event', function () {
        var senderId = "sender 1";
        var date = '10';
        var eventData = {
            senderId: senderId,
            data: date
        };

        it('should update the toDate field with the new value, when a dateRangePickerApp.endDateChanged event from the same sender id is received', function () {
            factory.subscribe(scope, senderId);
            scope.$emit('dateRangePickerApp.endDateChanged', eventData);

            expect(scope.toDate).toBe(date);
        });
        it('should not update the toDate field with the new value, when a dateRangePickerApp.endDateChanged event from different sender id is received', function () {
            scope.toDate = "2"

            factory.subscribe(scope, "sender 2");
            scope.$emit('dateRangePickerApp.startDateChanged', eventData);

            expect(scope.toDate).toBe("2");
        });
    });
})