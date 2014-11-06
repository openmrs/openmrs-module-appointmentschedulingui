<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeJavascript("uicommons", "angular.min.js")

    ui.includeJavascript("appointmentschedulingui", "app.js")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [

].flatten()
]) %>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.home.title") }",
            link: '${ ui.pageLink("appointmentschedulingui", "home") }' },
        { label: "${ ui.message("appointmentschedulingui.appointmentRequests.title") }",
            link: "${ ui.pageLink("appointmentschedulingui", "appointmentRequests") }" }];


    // bootstrap appointmentscheduling app (will be used by underlying fragments)
    jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-appointment-requests'), ['appointmentscheduling']);
    })

</script>

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div id="appointmentscheduling-appointment-requests" class="container">
    <h1>${ ui.message("appointmentschedulingui.appointmentRequests.title") }</h1>

    ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ enablePagination: true, canBook: canBook ]) }

    ${ ui.includeFragment("appointmentschedulingui", "scheduleAppointment", [ returnUrl: ui.pageLink('appointmentschedulingui', 'appointmentRequests') ]) }

</div>
