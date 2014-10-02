
<%
    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("appointmentschedulingui","app.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/appointmentsTabController.js")
%>

<script type="text/javascript">

    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-appointments-tab'), ['appointmentscheduling']);
    })

</script>

<div id="appointmentscheduling-appointments-tab" ng-controller="AppointmentsTabCtrl" ng-init="init()">

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient, loadOnInit: false ]) }

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient, loadOnInit: false ]) }

</div>
