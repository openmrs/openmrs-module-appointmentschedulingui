describe('timeframepicker directive', function() {

    describe('two timepickers must never be open at the same time', function () {
        it('closes the "end timepicker" when the "start timepicker" is open');
        it('closes the "start timepicker" when the the "end timepicker" is open');
    });

    describe('when a date changes a notification is sent', function () {
        it('sends a notification when the start date changes');
        it('sends a notification when the end date changes');
    });
})