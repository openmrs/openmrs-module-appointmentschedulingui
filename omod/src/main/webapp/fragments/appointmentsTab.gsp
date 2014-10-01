
<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.buttonTitle")}",
            link: '${ui.pageLink("coreapps", "findpatient/findPatient", [ app: 'appointmentschedulingui.schedulingAppointmentApp'])}' },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" }
    ];

    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-appointments-tab'), ['appointmentscheduling']);
    })

</script>

<div id="appointmentscheduling-appointments-tab">

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient ]) }

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient ]) }

</div>
