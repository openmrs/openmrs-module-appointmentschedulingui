<div class="info-section">
    <div class="info-header">
        <i class="icon-calendar"></i>
        <h3>${ ui.message("appointmentschedulingui.appointments.label").toUpperCase() }</h3>
    </div>
    <div class="info-body">
        <% if (patAppointments.size == 0){ %>
            ${ ui.message("general.none")}
        <% } else { %>
        <ul>
            <% patAppointments.each{ appointment -> %>
            <li>
                ${ui.formatDatetimePretty(appointment.timeSlot.startDate)} -
                <% if(ui.formatDatePretty(appointment.timeSlot.startDate).equals(ui.formatDatePretty(appointment.timeSlot.endDate))) { %>
                ${timeFormatter.format(appointment.timeSlot.endDate)}
                <% } else { %>
                    ${ui.formatDatetimePretty(appointment.timeSlot.endDate)}
                <% } %>
                ${ui.format(appointment.appointmentType.displayString)}
                <br>
                ${ui.format(appointment.timeSlot.appointmentBlock.provider)}
                @${ui.format(appointment.timeSlot.appointmentBlock.location)} -
                ${ui.format(appointment.status)}
            <% } %>
            </li>
        </ul>
        <%}%>
    </div>
</div>