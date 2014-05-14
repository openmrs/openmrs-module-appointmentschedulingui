package org.openmrs.module.appointmentschedulingui.htmlformentry;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.Encounter;
import org.openmrs.Location;
import org.openmrs.Patient;
import org.openmrs.Visit;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.htmlformentry.FormEntryContext;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.FormSubmissionActions;

import java.util.Arrays;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AppointmentCheckInSubmissionActionTest {

    private FormEntrySession mockFormEntrySession;

    private FormEntryContext mockFormEntryContext;

    private FormSubmissionActions mockFormSubmissionActions;

    private AppointmentService mockAppointmentService;

    private AppointmentCheckInSubmissionAction appointmentCheckInSubmissionAction;

    @Before
    public void setup() {
        mockFormEntrySession = mock(FormEntrySession.class);
        mockFormEntryContext = mock(FormEntryContext.class);
        mockFormSubmissionActions = mock(FormSubmissionActions.class);
        mockAppointmentService = mock(AppointmentService.class);
        appointmentCheckInSubmissionAction = new AppointmentCheckInSubmissionAction(mockAppointmentService);

        when(mockFormEntrySession.getSubmissionActions()).thenReturn(mockFormSubmissionActions);
        when(mockFormEntrySession.getContext()).thenReturn(mockFormEntryContext);
    }

    @Test
    public void applyActions_shouldCallGetAppointmentsByConstraintsAndSetAppointmentStatusToWaitingAndSetVisit() {

        Patient patient = new Patient();
        Encounter encounter = new Encounter();
        encounter.setEncounterDatetime(new DateTime(2014,1,2,10,10,10).toDate());
        Location location = new Location();
        encounter.setLocation(location);
        Visit visit = new Visit();

        Appointment appointment = new Appointment();
        appointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);

        when(mockFormEntrySession.getPatient()).thenReturn(patient);
        when(mockFormSubmissionActions.getCurrentEncounter()).thenReturn(encounter);
        when(mockFormEntryContext.getVisit()).thenReturn(visit);
        when(mockAppointmentService.getAppointmentsByConstraints(new DateTime(2014, 1, 2, 0, 0, 0, 0).toDate(),
                new DateTime(2014, 1, 2, 23, 59, 59, 999).toDate(), location, null, null, patient, Appointment.AppointmentStatus.SCHEDULED))
            .thenReturn(Arrays.asList(appointment));

        appointmentCheckInSubmissionAction.applyAction(mockFormEntrySession);

        assertThat(appointment.getStatus(), is(Appointment.AppointmentStatus.WAITING));
        assertThat(appointment.getVisit(), is(visit));
    }

}
