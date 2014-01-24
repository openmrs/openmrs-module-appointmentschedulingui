$( function(){
    $(document).on('click', '.delete-item', function(event) {
        var appointmentTypeId = $(event.target).attr("data-appointment-type-id");
        createDeleteAppointmentTypeDialog(appointmentTypeId,$(this));
        showDeleteAppointmentTypeDialog();
    });
});


function createDeleteAppointmentTypeDialog(appointmentTypeId, deleteElement) {
    deleteAppointmentTypeDialog = emr.setupConfirmationDialog({
        selector: '#delete-appointment-type-dialog',
        actions: {
            confirm: function() {
                jq('#delete-appointment-type-dialog' + ' .icon-spin').css('display', 'inline-block').parent().addClass('disabled');
                deleteAppointmentTypeWithCallback(appointmentTypeId);
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

function deleteAppointmentTypeWithCallback(appointmentTypeId) {
    emr.getFragmentActionWithCallback('appointmentschedulingui', 'manageAppointmentTypes', 'retireAppointmentType'
    , { appointmentTypeId: appointmentTypeId}
    , function (data) {
            deleteAppointmentTypeDialog.close();
            window.location.reload();
            emr.successMessage(data.message);
        }
    , function (err) {
            emr.handleError(err.message);
        }
    );
}




