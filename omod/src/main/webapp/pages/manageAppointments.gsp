<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "manageAppoinment.css")
%>


<script type="text/javascript">
    <% if (breadcrumbOverride) { %>
        var breadcrumbs = _.flatten([
        ${ breadcrumbOverride },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" ,
            link: '${ ui.urlBind("/" + contextPath + dashboardUrl, [ patientId: patient.patient.id ] ) }'}
    ] );
    <% } else { %>
        var breadcrumbs = [
            { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
            { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" ,
                link: '${ ui.urlBind("/" + contextPath + dashboardUrl, [ patientId: patient.patient.id ] ) }'},
            { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.buttonTitle") }",
                link: "${ ui.pageLink("coreapps", "findpatient/findPatient", [app: "appointmentschedulingui.schedulingAppointmentApp"]) }" }

        ];
    <% } %>


     jq(function() {
        angular.bootstrap(jq('#appointmentscheduling-manageAppointments'), ['appointmentscheduling']);
    })

</script>

<div>

    ${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

    <div id="appointmentscheduling-manageAppointments">

        ${ ui.includeFragment("appointmentschedulingui", "patientAppointments", [ patient: patient.patient, enablePagination: true ]) }

        ${ ui.includeFragment("appointmentschedulingui", "patientAppointmentRequests", [ patient: patient.patient, canBook: canBook ]) }

        <% if (canBook) { %>
            ${ ui.includeFragment("appointmentschedulingui", "scheduleAppointment", [ patient: patient.patient, returnUrl: returnUrl  ]) }
        <% } %>

    </div>

</div>