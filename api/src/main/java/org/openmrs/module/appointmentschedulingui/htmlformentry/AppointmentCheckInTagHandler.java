package org.openmrs.module.appointmentschedulingui.htmlformentry;

import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.htmlformentry.BadFormDesignException;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.FormSubmissionController;
import org.openmrs.module.htmlformentry.handler.SubstitutionTagHandler;
import org.openmrs.ui.framework.UiUtils;

import java.util.Map;

/**
 * HFE tag that, when included on a form, checks in the patient to any relevant scheduled appointments,
 * "Relevant" appointments are any appointments in the "scheduled" state at the same date and location
 * as the encounter associated with the session
 *
 * If there is a visit associated with the session, the visit on the relevant appointments is set to this visit
 *
 * See AppointmentCheckInSubmissionAction for complete logic
 */
public class AppointmentCheckInTagHandler extends SubstitutionTagHandler {

    private AppointmentService appointmentService;

    public AppointmentService getAppointmentService() {
        return appointmentService;
    }

    public void setAppointmentService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @Override
    protected String getSubstitution(FormEntrySession session, FormSubmissionController controllerActions, Map<String, String> parameters) throws BadFormDesignException {

        UiUtils uiUtils = (UiUtils) session.getAttribute("uiUtils");

        AppointmentCheckInElement element = new AppointmentCheckInElement();
        element.setUiUtils(uiUtils);
        element.setAppointmentService(appointmentService);
        controllerActions.addAction(element);
        return element.generateHtml(session.getContext());

    }


}
