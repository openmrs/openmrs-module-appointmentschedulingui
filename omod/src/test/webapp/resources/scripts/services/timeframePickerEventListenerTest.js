describe('timeframePickerEventListener Factory', function () {
    var scope,
        factory;

    beforeEach(function() {
        module('scheduleAppointmentTimeframePickerApp');

        inject(function($rootScope, $injector) {
            scope = $rootScope.$new();
            factory = $injector.get('timeframePickerEventListener');
        });
    });

    describe('it must listen for a timeframePickerApp.changeFromDate event', function () {
        it('should update the fromDate field with the new value, when a timeframePickerApp.changeFromDate event is received', function () {
           var date = '15';

           factory.subscribe(scope);
           scope.$emit('timeframePickerApp.changeFromDate', date);

           expect(scope.fromDate).toBe(date);
        })
    });

    describe('it must listen for a timeframePickerApp.changeEndDate event', function () {
        it('should update the toDate field with the new value, when a timeframePickerApp.changeEndDate event is reveiced', function () {
            var date = '10';

            factory.subscribe(scope);
            scope.$emit('timeframePickerApp.changeEndDate', date);

            expect(scope.toDate).toBe(date);
        });
    });
})