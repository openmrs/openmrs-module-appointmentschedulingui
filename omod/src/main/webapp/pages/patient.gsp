<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title") }", link: "${ ui.pageLink("coreapps", "findpatient/findPatient?app=appointmentschedulingui.schedulingAppointmentApp") }" },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" , link: '${ui.pageLink("coreapps", "patientdashboard/patientDashboard", [patientId: patient.id])}'},
    ];
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<script type="text/javascript">
    jq(function() {
        jq('#actions .cancel').click(function() {
            emr.navigateTo({url: emr.pageLink("coreapps", "findpatient/findPatient", {app: 'appointmentschedulingui.schedulingAppointmentApp'})})
        });
        jq('#actions .confirm').click(function() {
            emr.navigateTo({
                provider: "appointmentschedulingui",
                page: "scheduleAppointment",
                query: {
                    patientId: "${ patient.id }",
                    returnUrl: "${ ui.escapeJs(ui.pageLink("appointmentschedulingui", "findPatient")) }",
                    breadcrumbOverride: "${ ui.escapeJs(breadcrumbOverride) }"
                }
            });
        });
        jq('#actions button').first().focus();
    });
</script>

<div class="container">

    <h1>${ ui.message("appointmentschedulingui.scheduleAppointment.confirmPatientQuestion") }</h1>

    <div id="actions" class="half-width">
        <button class="confirm big right">
            <i class="icon-arrow-right"></i>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.yes") }
        </button>

        <button class="cancel big">
            <i class="icon-arrow-left"></i>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.no") }
        </button>
    </div>

    <div id="scheduleAppointment">
        <h2> ${ ui.message("appointmentschedulingui.scheduleAppointment.upcomingAppointments") } </h2>

        <table id="scheduledAppointmentTable" empty-value-message='${ ui.message("uicommons.dataTable.emptyTable") }'>
            <thead>
            <tr>
                <th style="width: 30%">${ ui.message("appointmentschedulingui.scheduleAppointment.date") }</th>
                <th style="width: 30%">${ ui.message("appointmentschedulingui.appointmenttype.title") }</th>
                <th style="width: 20%">${ ui.message("appointmentschedulingui.scheduleAppointment.provider") }</th>
                <th style="width: 20%">${ ui.message("appointmentschedulingui.scheduleAppointment.location") }</th>
            </tr>
            </thead>
            <tbody>

            <% if ( (upcomingAppointmentList == null)
                    || (upcomingAppointmentList!= null && upcomingAppointmentList.size() == 0)) { %>
            <tr>
                <td>${ ui.message("uicommons.dataTable.emptyTable") }</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <% } %>

            <% upcomingAppointmentList.each { appointment -> %>

            <tr>
                <td>${ ui.format(appointment.timeSlot.appointmentBlock.startDate.format('dd MMM yyyy'))}
                    | ${ ui.format(appointment.timeSlot.appointmentBlock.startDate.format('HH:mm a'))} -
                    ${ ui.format(appointment.timeSlot.appointmentBlock.endDate.format('HH:mm a')) }</td>
                <td>${ ui.format(appointment.appointmentType) }</td>
                <td>${ ui.format(appointment.timeSlot.appointmentBlock.provider.name)}</td>
                <td>${ ui.format(appointment.timeSlot.appointmentBlock.location.name)}</td>
            </tr>
            <% } %>
            </tbody>
        </table>
    </div>
</div>

${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#appointmentTypesTable",
        options: [
                bFilter: false,
                bJQueryUI: true,
                bLengthChange: false,
                iDisplayLength: 10,
                sPaginationType: '\"full_numbers\"',
                bSort: false,
                sDom: '\'ft<\"fg-toolbar ui-toolbar ui-corner-bl ui-corner-br ui-helper-clearfix datatables-info-and-pg \"ip>\''
        ]
]) }
