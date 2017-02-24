
<%
    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("appointmentschedulingui","app.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/appointmentsTabController.js")
    ui.includeCss("appointmentschedulingui", "appointmentsTab.css")
%>

<script type="text/javascript">

    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-appointments-tab'), ['appointmentscheduling']);
    })

</script>

<div id="appointmentscheduling-appointments-tab" ng-controller="AppointmentsTabCtrl" ng-init="init()" ng-cloak>

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient, loadOnInit: false, hideActionButtons: true, enablePagination: true ]) }

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient, loadOnInit: false, hideActionButtons: true ]) }

</div>
