package org.openmrs.module.appointmentschedulingui.htmlformentry;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.Patient;
import org.openmrs.api.PatientService;
import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIActivator;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIConstants;
import org.openmrs.module.htmlformentry.HtmlFormEntryService;
import org.openmrs.module.htmlformentry.RegressionTestHelper;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mock.web.MockHttpServletRequest;

import java.util.Map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class AppointmentCheckInTagComponentTest extends BaseModuleContextSensitiveTest {

    @Autowired
    @Qualifier("patientService")
    private PatientService patientService;

    @Autowired
    @Qualifier("appointmentService")
    private AppointmentService appointmentService;


    @Before
    public void setup() throws Exception {
        executeDataSet("standardAppointmentTestDataset.xml");
        HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
        htmlFormEntryService.addHandler(AppointmentSchedulingUIConstants.APPOINTMENT_CHECK_IN_TAG_NAME,
                new AppointmentSchedulingUIActivator().createAppointmentCheckInTagHandler(appointmentService));
    }


    @Test
    public void shouldCheckPatientInToAppointment() throws Exception {

        new RegressionTestHelper() {
            @Override
            public String getXmlDatasetPath() {
                return "";
            }

            @Override
            public String getFormName() {
                return "appointmentCheckInSimpleForm";
            }


            public Patient getPatient() {
                return patientService.getPatient(1);
            }

            @Override
            public String[] widgetLabels() {
                return new String[] { "Date:", "Location:", "Provider:" };
            }

            @Override
            public void setupRequest(MockHttpServletRequest request, Map<String, String> widgets) {
                // note that the date does not fall directly within the time slot, as we want to confirm that it will check the person in for an appt on any time during the selected day
                request.setParameter(widgets.get("Date:"), dateAsString(new DateTime(2007,1,1,12,0,0).toDate()));
                request.setParameter(widgets.get("Location:"), "3");
                request.setParameter(widgets.get("Provider:"), "1");
            }

            @Override
            public void testResults(SubmissionResults results) {
                // this is the appointment that should be changed
                assertThat(appointmentService.getAppointment(4).getStatus(), is(Appointment.AppointmentStatus.WAITING));

                // make sure none of the other scheduled appointments have been updated
                assertThat(appointmentService.getAppointment(1).getStatus(), is(Appointment.AppointmentStatus.SCHEDULED));
                assertThat(appointmentService.getAppointment(5).getStatus(), is(Appointment.AppointmentStatus.SCHEDULED));
                assertThat(appointmentService.getAppointment(6).getStatus(), is(Appointment.AppointmentStatus.SCHEDULED));
                assertThat(appointmentService.getAppointment(7).getStatus(), is(Appointment.AppointmentStatus.SCHEDULED));

            }
        }.run();

    }

}
