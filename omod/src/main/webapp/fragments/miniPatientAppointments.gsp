<%
    ui.includeCss("appointmentschedulingui", "miniPatientAppointments.css")
%>
<div class="info-section">
    <div class="info-header">
        <i class="icon-calendar"></i>
        <h3>${ ui.message("appointmentschedulingui.appointments.label").toUpperCase() }</h3>
        <% if (context.hasPrivilege("App: appointmentschedulingui.viewAppointments")) { %>
        <a href='${ui.pageLink("appointmentschedulingui", "manageAppointments", [patientId: patient.id, returnUrl: ui.urlBind("/" + contextPath + dashboardUrl, [ patientId: patient.patient.id ] )])}' class="right">
            <i class="icon-share-alt edit-action" title="${ ui.message("coreapps.edit") }"></i>
        </a>
        <% } %>
    </div>
    <div class="info-body">
        <% if (patientAppointments.size == 0){ %>
            ${ ui.message("general.none")}
        <% } else { %>
        <ul id="miniPatientAppointments">
            <% patientAppointments.each{ appointment -> %>
            <li>
                ${ui.formatDatetimePretty(appointment.timeSlot.startDate)} -
                <% if(ui.formatDatePretty(appointment.timeSlot.startDate).equals(ui.formatDatePretty(appointment.timeSlot.endDate))) { %>
                    ${timeFormatter.format(appointment.timeSlot.endDate)}
                <% } else { %>
                    ${ui.formatDatetimePretty(appointment.timeSlot.endDate)}
                <% } %>
                <% if (appointment.status.name == 'Missed'){ %>
                    <span class="status-lozenge">${ui.message("appointmentschedulingui.scheduleAppointment.status.type.missed")}</span>
                <% } %>
                <br>
                ${ui.format(appointment.appointmentType.displayString)},
                ${ui.format(appointment.timeSlot.appointmentBlock.provider)}
            <% } %>
            </li>
        </ul>
        <%}%>
    </div>
</div>

<% if (patientAppointmentRequests.size > 0){ %>
    <div class="info-section">
        <div class="info-header">
            <i class="icon-calendar"></i>
            <h3>${ ui.message("appointmentschedulingui.appointmentRequests.title").toUpperCase() }</h3>
            <% if (context.hasPrivilege("App: appointmentschedulingui.viewAppointments")) { %>
            <a href='${ui.pageLink("appointmentschedulingui", "manageAppointments", [patientId: patient.id, returnUrl: ui.urlBind("/" + contextPath + dashboardUrl, [ patientId: patient.patient.id ] )])}' class="right">
                <i class="icon-share-alt edit-action" title="${ ui.message("coreapps.edit") }"></i>
            </a>
            <% } %>
        </div>
        <div class="info-body">
            <ul id="miniPatientAppointmentRequests">
                <% patientAppointmentRequests.each{ appointmentRequest -> %>
                    <li>
                        <% if (appointmentRequest.provider) { %>
                            ${ui.format(appointmentRequest.appointmentType.displayString)}, ${ui.format(appointmentRequest.provider)}
                        <% } else { %>
                            ${ui.format(appointmentRequest.appointmentType.displayString)}
                        <% } %>
                        <br>
                        ${ui.message("appointmentschedulingui.appointmentrequest.requestedby", ui.format(appointmentRequest.requestedBy), ui.formatDatePretty(appointmentRequest.requestedOn))}
                    </li>
                <% } %>
            </ul>
        </div>
    </div>
<% } %>
