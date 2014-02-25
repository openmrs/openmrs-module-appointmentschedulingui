package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Patient;
import org.openmrs.api.PatientService;
import org.openmrs.module.uicommons.UiCommonsConstants;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

public class SessionInfoPageController {

    /**
     * This controller was created in order to include the session information that will be used in the next page
     * to display a toast message informing that a scheduled appointment was created.
     */
    public String get( UiUtils ui,
                       @RequestParam("patientUuid") String patientUuid,
                       @SpringBean("patientService") PatientService patientService,
                      HttpSession session ){

        Patient patient = patientService.getPatientByUuid(patientUuid);
        String patientName = patient.getGivenName() +" "+ patient.getFamilyName();

        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_INFO_MESSAGE,
                ui.message("appointmentschedulingui.scheduleAppointment.appointmentScheduled")+" "+patientName);
        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_TOAST_MESSAGE, "true");

        return "redirect:/coreapps/findpatient/findPatient.page?app=appointmentschedulingui.schedulingAppointmentApp";
    }
}
