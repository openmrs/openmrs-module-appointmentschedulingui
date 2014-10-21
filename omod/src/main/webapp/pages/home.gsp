<%
    ui.decorateWith("appui", "standardEmrPage")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.home.title") }",
            link: '${ ui.pageLink("appointmentschedulingui", "home") }' }
    ];
</script>

<div id="apps">

    <% if (context.hasPrivilege("App: appointmentschedulingui.scheduleAdmin")) { %>
        <a class="button app big" href="${ ui.pageLink("appointmentschedulingui", "manageAppointmentTypes") }"
                id="appointmentschedulingui-manageAppointmentTypes-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.appointmenttype.label") }
        </a>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.scheduleAdmin")) { %>
        <a class="button app big" href="${ ui.pageLink("appointmentschedulingui", "scheduleProviders") }"
                id="appointmentschedulingui-scheduleProviders-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.scheduleProviders.app.title") }
        </a>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.bookAppointments")) { %>
        <a class="button app big" href="${ ui.pageLink("coreapps", "findpatient/findPatient", [app: "appointmentschedulingui.schedulingAppointmentApp"]) }"
                id="appointmentschedulingui-schedulingAppointmentAppLink-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.buttonTitle") }
        </a>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.viewAppointments")) { %>
        <a class="button app big" href="${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }"
                id="appointmentschedulingui-scheduledAppointments-homepageLink-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }
        </a>
    <% } %>

    <% if (featureToggles.isFeatureEnabled("requestAppointments")) { %>

        <% if (context.hasPrivilege("Task: appointmentschedulingui.bookAppointments")) { %>
            <a class="button app big" href="${ ui.pageLink("appointmentschedulingui", "appointmentRequests") }">
                <i class="icon-calendar"></i>
                ${ ui.message("appointmentschedulingui.appointmentRequests.title") }
            </a>
        <% } %>

    <% } %>

</div>