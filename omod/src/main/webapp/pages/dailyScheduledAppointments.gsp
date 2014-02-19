<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title") }", link: "${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }" }];
</script>

<div class="container">

    <h1>${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }</h1>
    <div class="appointment-filters">
        <i class="icon-arrow-left icon-large"></i>
        <span>${ ui.format(new java.util.Date().format("dd MMM yyyy"))}</span>
        <i class="icon-arrow-right icon-large"></i>
    </div>

    <table id="dailyScheduledAppointments" empty-value-message='${ ui.message("uicommons.dataTable.emptyTable") }'>
        <thead>
        <tr>
            <th style="width: 20%">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") }</th>
            <th style="width: 20%">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.provider") }</th>
            <th style="width: 30%">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.patientName") }</th>
            <th style="width: 10%">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.patientId") }</th>
            <th style="width: 20%">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber") }</th>
        </tr>
        </thead>
        <tbody>

        <% if ( (scheduledAppointmentBlocks == null)
                || (scheduledAppointmentBlocks!= null && scheduledAppointmentBlocks.size() == 0)) { %>
        <tr>
            <td>${ ui.message("uicommons.dataTable.emptyTable") }</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <% } %>


        <% scheduledAppointmentBlocks.each { scheduledAppointmentBlock -> %>

        <tr>
            <td>${ ui.format(scheduledAppointmentBlock.startDate.format("HH:mm a"))} -
                ${ ui.format(scheduledAppointmentBlock.endDate.format('HH:mm a')) }
            </td>
            <td>${ ui.format(scheduledAppointmentBlock.provider) }</td>
            <td>
                <% scheduledAppointmentBlock.appointments.each { appointment -> %>
                <div> ${ ui.format(appointment.patient.givenName)}      ${ ui.format(appointment.patient.familyName)}
                        (  ${ ui.format(appointment.appointmentType.name)} )</div>
                <% } %>
            </td>
            <td>
                <% scheduledAppointmentBlock.appointments.each { appointment -> %>
                <div>  ${appointment.patient.getPatientIdentifier(primaryPatientIdentifierType).identifier} </div>
                <% } %>
            </td>
            <td>
                <% scheduledAppointmentBlock.appointments.each { appointment ->
                    def dossierIdentifier = appointment.patient.getPatientIdentifier(dossierPatientIdentifierType);
                %>
                <div>
                <%= dossierIdentifier != null ? dossierIdentifier.identifier : ui.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber.notFound") %>
                </div>
                <% } %>
            </td>
        </tr>
        <% } %>
        </tbody>
    </table>
</div>

${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#dailyScheduledAppointments",
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
