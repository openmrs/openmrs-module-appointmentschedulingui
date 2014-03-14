package org.openmrs.module.appointmentschedulingui.htmlformentry;

import org.junit.Before;
import org.junit.Test;
import org.openmrs.Location;
import org.openmrs.Patient;
import org.openmrs.module.htmlformentry.FormEntryContext;
import org.openmrs.ui.framework.UiUtils;

import static org.mockito.Matchers.anyMap;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class AppointmentCheckInElementTest {

    private AppointmentCheckInElement element;

    private UiUtils mockUiUtils;

    private FormEntryContext mockFormEntryContext;


    @Before
    public void setup() {
        mockFormEntryContext = mock(FormEntryContext.class);
        mockUiUtils = mock(UiUtils.class);

        element = new AppointmentCheckInElement();
        element.setUiUtils(mockUiUtils);
    }


    @Test
    public void generateHtml_shouldIncludeAppointmentCheckInElement() throws Exception{

        Patient mockPatient = new Patient();
        Location mockLocation = new Location();

        when(mockFormEntryContext.getExistingPatient()).thenReturn(mockPatient);
        when(mockFormEntryContext.getDefaultLocation()).thenReturn(mockLocation);

        element.generateHtml(mockFormEntryContext);

        verify(mockUiUtils).includeFragment(eq("appointmentschedulingui"),eq("htmlformentry/appointmentCheckInTag"),
                anyMap());      // TODO figure out how to get the specific map matcher to work
    }

}
