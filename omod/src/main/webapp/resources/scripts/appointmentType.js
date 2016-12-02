// TODO redo using angular?

function confirmButtonEventListerner(errorMessage){
    $(document).on('click', '.confirm', function(event) {
        if(checkIfDurationIsValid())
            $('#appointmentTypeForm').submit();
        else
            printErrorMessage(errorMessage);
    });
}

function checkIfInteger(duration) {
    return isNaN(duration)? false : true;
}

function checkIfDurationIsValid(){
    var duration = $('#duration-field').val();
    return (checkIfInteger(duration) && duration > 0) ? true : false;
}

function printErrorMessage(errorMessage){
    var durationFieldError = $('.field-error').eq(1);
    durationFieldError.text(errorMessage);
    durationFieldError.removeAttr('style');

}