package org.openmrs.module.appointmentschedulingui.htmlformentry;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.openmrs.module.htmlformentry.FormEntryContext;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.FormSubmissionError;
import org.openmrs.module.htmlformentry.action.FormSubmissionControllerAction;
import org.openmrs.module.htmlformentry.element.HtmlGeneratorElement;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.page.PageAction;

public class AppointmentCheckInElement implements HtmlGeneratorElement, FormSubmissionControllerAction {

    private UiUtils uiUtils;

    @Override
    public String generateHtml(FormEntryContext context) {

        StringBuilder output =  new StringBuilder();

        Map<String, Object> fragmentConfig = new HashMap<String, Object>();
        fragmentConfig.put("patientUuid",context.getExistingPatient().getUuid());
        fragmentConfig.put("locationUuid", context.getExistingEncounter() != null
                ? context.getExistingEncounter().getLocation().getUuid() :
                context.getDefaultLocation() != null ? context.getDefaultLocation().getUuid() : "");

        try {
            output.append(uiUtils.includeFragment("appointmentschedulingui", "htmlformentry/appointmentCheckInTag", fragmentConfig));
        }
        catch (PageAction pageAction) {
            throw new IllegalStateException("Included fragment threw a PageAction", pageAction);
        }

        return output.toString();
    }

    @Override
    public Collection<FormSubmissionError> validateSubmission(FormEntryContext context, HttpServletRequest submission) {
        return null;
    }

    @Override
    public void handleSubmission(FormEntrySession session, HttpServletRequest submission) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public void setUiUtils(UiUtils uiUtils) {
        this.uiUtils = uiUtils;
    }
}
