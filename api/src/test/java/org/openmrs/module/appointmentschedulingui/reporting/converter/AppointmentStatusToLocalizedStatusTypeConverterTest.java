package org.openmrs.module.appointmentschedulingui.reporting.converter;

import org.junit.Ignore;
import org.junit.Test;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.test.BaseModuleContextSensitiveTest;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class AppointmentStatusToLocalizedStatusTypeConverterTest extends BaseModuleContextSensitiveTest {


    @Test
    public void shouldConvertToLocalizedString() {

        AppointmentStatusToLocalizedStatusTypeConverter converter = new AppointmentStatusToLocalizedStatusTypeConverter();
		String expected = "appointmentschedulingui.scheduleAppointment.status.type.cancelled";
        assertThat((String) converter.convert(Appointment.AppointmentStatus.CANCELLED), is(expected));

    }

}
