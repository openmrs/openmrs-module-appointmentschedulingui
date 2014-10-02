
<script type="text/javascript">

    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-appointments-tab'), ['appointmentscheduling']);
    })

</script>

<div id="appointmentscheduling-appointments-tab">

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient ]) }

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient ]) }

</div>
