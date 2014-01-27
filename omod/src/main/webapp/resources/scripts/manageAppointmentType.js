$( function(){
    $(document).on('click', '.deleteAppointmentType', function(event) {
        var appointmentTypeId = $(event.target).attr("data-appointment-type-id");
        createDeleteAppointmentTypeDialog(appointmentTypeId,$(this));
        showDeleteAppointmentTypeDialog();
    });

    $(document).on('click', '.editAppointmentType', function(event) {
        var editUrl = $(event.target).attr("data-edit-url");
        alert(editUrl);

        window.location.assign(editUrl);
    });

    addDefaultRowWhenAppointmentTableEmpty();
});


function createDeleteAppointmentTypeDialog(appointmentTypeId, deleteElement) {
    deleteAppointmentTypeDialog = emr.setupConfirmationDialog({
        selector: '#delete-appointment-type-dialog',
        actions: {
            confirm: function() {
                jq('#delete-appointment-type-dialog' + ' .icon-spin').css('display', 'inline-block').parent().addClass('disabled');
                deleteAppointmentTypeWithCallback(appointmentTypeId, deleteElement);
            },
            cancel: function() {
                deleteAppointmentTypeDialog.close();
            }
        }
    });
}


function showDeleteAppointmentTypeDialog () {
    deleteAppointmentTypeDialog.show();
    return false;
}

function deleteAppointmentTypeWithCallback(appointmentTypeId, deleteElement) {
    emr.getFragmentActionWithCallback('appointmentschedulingui', 'manageAppointmentTypes', 'retireAppointmentType'
    , { appointmentTypeId: appointmentTypeId}
    , function (data) {
            deleteAppointmentTypeDialog.close();
           // window.location.reload();
            deleteElement.parents("tr").remove();
            addDefaultRowWhenAppointmentTableEmpty();
            emr.successMessage(data.message);
        }
    , function (err) {
            emr.handleError(err.message);
        }
    );
}

function verifyIfAppointmentTableEmpty() {
    return $('#appointmentTypesTable tr').length == 1? true : false;
}

function addDefaultRowWhenAppointmentTableEmpty(){

    if(verifyIfAppointmentTableEmpty()){
        var defaultMessage = $('#appointmentTypesTable').attr("empty-value-message");
        $('#appointmentTypesTable').append('<tr><td>'+ defaultMessage +'</td><td></td><td></td><td></td></tr>');
    }
}




