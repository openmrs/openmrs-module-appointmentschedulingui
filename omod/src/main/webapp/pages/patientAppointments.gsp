<%
    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("appointmentschedulingui","app.js")

%>

<!-- TODO return url to dashboard, fix name of final breadcrumb -->

<script type="text/javascript" xmlns="http://www.w3.org/1999/html">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }",
            link: '${ ui.urlBind("/" + contextPath + dashboardUrl, [ patientId: patient.patient.id ] ) }' },
        { label: "${ ui.message("appointmentschedulingui.patientAppointments")}" }
    ];

    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-patient-appointments'), ['appointmentscheduling']);
    })


</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div id="appointmentscheduling-patient-appointments">

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient, loadOnInit: true, hideActionButtons: true, enablePagination: true ]) }

    <% if (featureToggles.isFeatureEnabled("requestAppointments")) { %>
        ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient, loadOnInit: true, hideActionButtons: true ]) }
    <% } %>

</div>
