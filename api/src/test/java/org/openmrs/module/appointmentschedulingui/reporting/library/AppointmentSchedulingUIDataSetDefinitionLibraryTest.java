package org.openmrs.module.appointmentschedulingui.reporting.library;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.Location;
import org.openmrs.Patient;
import org.openmrs.Provider;
import org.openmrs.api.LocationService;
import org.openmrs.contrib.testdata.TestDataManager;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.AppointmentBlock;
import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.TimeSlot;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appointmentscheduling.reporting.dataset.definition.AppointmentDataSetDefinition;
import org.openmrs.module.emrapi.EmrApiProperties;
import org.openmrs.module.reporting.common.DateUtil;
import org.openmrs.module.reporting.dataset.DataSet;
import org.openmrs.module.reporting.dataset.DataSetRow;
import org.openmrs.module.reporting.dataset.definition.service.DataSetDefinitionService;
import org.openmrs.module.reporting.definition.library.AllDefinitionLibraries;
import org.openmrs.module.reporting.evaluation.EvaluationContext;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Date;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class AppointmentSchedulingUIDataSetDefinitionLibraryTest extends BaseModuleContextSensitiveTest {


    @Autowired
    private LocationService locationService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private EmrApiProperties emrApiProperties;

    @Autowired
    private TestDataManager data;

    @Autowired
    private DataSetDefinitionService dataSetDefinitionService;

    @Autowired
    private AllDefinitionLibraries libraries;

    @Before
    public void setup() throws Exception {
        executeDataSet("standardAppointmentTestDataset.xml");
    }

    @Test
    public void testCreateDailyScheduledAppointmentDataSetDefinition() throws Exception {

        Provider scheduledProvider = data.randomProvider().save();
        Location location = locationService.getLocation(1);

        Patient patient = data.randomPatient()
                .personAttribute(emrApiProperties.getTelephoneAttributeType(), "123-4567")
                .save();

        Date startDate = new DateTime(2014,1,1,9,0,0).toDate();
        Date endDate = new DateTime(2014,1,1,11,0,0).toDate();

        AppointmentType appointmentType = new AppointmentType();
        appointmentType.setName("Outpatient consult");
        appointmentType.setDuration(30);
        appointmentService.saveAppointmentType(appointmentType);

        AppointmentBlock block = new AppointmentBlock();
        block.setTypes(Collections.singleton(appointmentType));
        block.setProvider(scheduledProvider);
        block.setLocation(location);
        block.setStartDate(startDate);
        block.setEndDate(endDate);
        appointmentService.saveAppointmentBlock(block);

        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setAppointmentBlock(block);
        timeSlot.setStartDate(startDate);
        timeSlot.setEndDate(endDate);
        appointmentService.saveTimeSlot(timeSlot);

        Appointment appointment = new Appointment();
        appointment.setAppointmentType(appointmentType);
        appointment.setPatient(patient);
        appointment.setTimeSlot(timeSlot);
        appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
        appointment.setReason("Sick");
        appointment.setCancelReason("Provider sick");
        appointmentService.saveAppointment(appointment);

        EvaluationContext context = new EvaluationContext();
        context.addParameterValue("date", DateUtil.parseDate("2014-01-01", "yyyy-MM-dd"));
        context.addParameterValue("location", locationService.getLocation(1));

        AppointmentDataSetDefinition dsd
                = libraries.getDefinition(AppointmentDataSetDefinition.class, "appointmentschedulingui.appointmentDataSetDefinition.dailyAppointments");
        DataSet appointmentDataSet = dataSetDefinitionService.evaluate(dsd, context);

        assertTrue(appointmentDataSet.iterator().hasNext());

        DataSetRow row = appointmentDataSet.iterator().next();

        assertThat((String) row.getColumnValue("appointmentTypeUuid"), is(appointmentType.getUuid()));
        assertThat((String) row.getColumnValue("appointmentType"), is("Outpatient consult"));
        assertThat((String) row.getColumnValue("provider"), is(scheduledProvider.getName()));
        assertThat((Appointment.AppointmentStatusType) row.getColumnValue("statusType"), is(Appointment.AppointmentStatusType.COMPLETED));
        assertThat((String) row.getColumnValue("localizedStatusType"), is("Completed"));
        assertThat((String) row.getColumnValue("patientName"), is(patient.getPersonName().toString()));
        assertThat(((Timestamp) row.getColumnValue("startDatetime")).toString(), is("2014-01-01 09:00:00.0"));
        assertThat((String) row.getColumnValue("startTimeFormatted"), is("09:00 AM"));
        assertThat((String) row.getColumnValue("endTimeFormatted"), is("11:00 AM"));
        assertThat((String) row.getColumnValue("telephoneNumber"), is("123-4567"));
        assertThat((String) row.getColumnValue("identifier"), is(patient.getPatientIdentifier(emrApiProperties.getPrimaryIdentifierType()).getIdentifier()));

    }


}
