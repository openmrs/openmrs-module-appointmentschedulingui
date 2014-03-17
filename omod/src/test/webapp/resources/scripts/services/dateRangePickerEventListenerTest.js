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

    describe('it must listen for a dateRangePickerApp.changeStartDate event', function () {
        it('should update the fromDate field with the new value, when a dateRangePickerApp.changeStartDate event is received', function () {
           var date = '15';

           factory.subscribe(scope);
           scope.$emit('dateRangePickerApp.changeStartDate', date);

           expect(scope.fromDate).toBe(date);
        })
    });

    describe('it must listen for a dateRangePickerApp.changeEndDate event', function () {
        it('should update the toDate field with the new value, when a dateRangePickerApp.changeEndDate event is reveiced', function () {
            var date = '10';

            factory.subscribe(scope);
            scope.$emit('dateRangePickerApp.changeEndDate', date);

            expect(scope.toDate).toBe(date);
        });
    });
})