package org.openmrs.module.appointmentschedulingui.Parser;

import org.junit.Test;
import org.openmrs.module.appointmentscheduling.Appointment;

import static org.junit.Assert.assertTrue;

public class AppointmentStatusParserTest {
    @Test
    public void testAppointmentStatusToJson() throws Exception {
        AppointmentStatusParser appointmentStatusParser = new AppointmentStatusParser();
        String parsedAppointmentStatus = appointmentStatusParser.appointmentStatusToJson();

        for (Appointment.AppointmentStatus appointmentStatus: Appointment.AppointmentStatus.values()){
            assertTrue(parsedAppointmentStatus.contains(appointmentStatus.getName()));
        }
    }
}
