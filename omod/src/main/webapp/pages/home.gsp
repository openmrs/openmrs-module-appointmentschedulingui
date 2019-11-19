<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appoinmenthome.css")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.home.title") }",
            link: '${ ui.pageLink("appointmentschedulingui", "home") }' }
    ];
</script>

<div id="apps" class="row">

    <% if (context.hasPrivilege("App: appointmentschedulingui.appointmentTypes")) { %>
        <div  class="col-6 col-sm-2 col-md-3 col-lg-2 homeList schedulingList ml-3">
        <a class="btn btn-default btn-lg button app big align-self-center" type="button" href="${ ui.pageLink("appointmentschedulingui", "manageAppointmentTypes") }"
                id="appointmentschedulingui-manageAppointmentTypes-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.appointmenttype.label") }
        </a>
        </div>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.providerSchedules")) { %>
        <div class="col-6 col-sm-2 col-md-3 col-lg-2 homeList schedulingList ml-3">        
        <a class="btn btn-default btn-lg button app big align-self-center" type="button" href="${ ui.pageLink("appointmentschedulingui", "scheduleProviders") }"
                id="appointmentschedulingui-scheduleProviders-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.scheduleProviders.app.title") }
        </a>
        </div>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.viewAppointments")) { %>
        <div  class="col-6 col-sm-2 col-md-3 col-lg-2 homeList schedulingList ml-3">        
        <a class="btn btn-default btn-lg button app big align-self-center" type="button" href="${ ui.pageLink("coreapps", "findpatient/findPatient", [app: "appointmentschedulingui.schedulingAppointmentApp"]) }"
                id="appointmentschedulingui-manageAppointments-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.buttonTitle") }
        </a>
        </div>
    <% } %>

    <% if (context.hasPrivilege("App: appointmentschedulingui.viewAppointments")) { %>
        <div  class="col-6 col-sm-2 col-md-3 col-lg-2 homeList schedulingList ml-3">       
        <a class="btn btn-default btn-lg button app big align-self-center dailyappoinment" type="button" href="${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }"
                id="appointmentschedulingui-scheduledAppointments-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }
        </a>
        </div>
    <% } %>

    <% if (context.hasPrivilege("Task: appointmentschedulingui.bookAppointments")) { %>
        <div  class="col-6 col-sm-2 col-md-3 col-lg-2 homeList schedulingList ml-3">        
        <a class="btn btn-default btn-lg button app big align-self-center" type="button" href="${ ui.pageLink("appointmentschedulingui", "appointmentRequests") }"
             id="appointmentschedulingui-appointmentRequests-app">
            <i class="icon-calendar"></i>
            ${ ui.message("appointmentschedulingui.appointmentRequests.title") }
        </a>
        </div>
    <% } %>

</div>