package org.openmrs.module.appointmentschedulingui.reporting.converter;

import org.junit.Test;
import org.openmrs.module.appointmentscheduling.AppointmentData;
import org.openmrs.test.BaseModuleContextSensitiveTest;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class AppointmentStatusToLocalizedStatusTypeConverterTest extends BaseModuleContextSensitiveTest {


    @Test
    public void shouldConvertToLocalizedString() {

        AppointmentStatusToLocalizedStatusTypeConverter converter = new AppointmentStatusToLocalizedStatusTypeConverter();
		String expected = "Cancelled";
        assertThat((String) converter.convert(AppointmentData.AppointmentStatus.CANCELLED), is(expected));

    }

}
