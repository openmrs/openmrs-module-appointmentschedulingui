package org.openmrs.module.appointmentschedulingui.htmlformentry;

import java.util.Map;

import org.openmrs.module.htmlformentry.BadFormDesignException;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.FormSubmissionController;
import org.openmrs.module.htmlformentry.handler.SubstitutionTagHandler;
import org.openmrs.ui.framework.UiUtils;

public class AppointmentCheckInTagHandler extends SubstitutionTagHandler {


    @Override
    protected String getSubstitution(FormEntrySession session, FormSubmissionController controllerActions, Map<String, String> parameters) throws BadFormDesignException {

        UiUtils uiUtils = (UiUtils) session.getAttribute("uiUtils");

        AppointmentCheckInElement element = new AppointmentCheckInElement();
        element.setUiUtils(uiUtils);
        controllerActions.addAction(element);
        return element.generateHtml(session.getContext());

    }


}
