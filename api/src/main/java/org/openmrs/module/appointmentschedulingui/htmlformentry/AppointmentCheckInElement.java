package org.openmrs.module.appointmentschedulingui.htmlformentry;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.htmlformentry.FormEntryContext;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.FormSubmissionError;
import org.openmrs.module.htmlformentry.action.FormSubmissionControllerAction;
import org.openmrs.module.htmlformentry.element.HtmlGeneratorElement;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.page.PageAction;

public class AppointmentCheckInElement implements HtmlGeneratorElement, FormSubmissionControllerAction {

    private AppointmentService appointmentService;

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
        catch (NullPointerException ex) {
            // DARIUS: if we are validating/submitting the form, then this method is being called from a fragment action method
            // and the UiUtils we have access to doesn't have a FragmentIncluder. That's okay, because we don't actually
            // need to generate the HTML, so we can pass on this exception.
            // (This is hacky, but I don't see a better way to do it.)
            return "Submitting the form, so we don't generate HTML";
        }

        return output.toString();
    }

    @Override
    public Collection<FormSubmissionError> validateSubmission(FormEntryContext context, HttpServletRequest submission) {
        // no validation required
        return null;
    }

    @Override
    public void handleSubmission(FormEntrySession session, HttpServletRequest submission) {
        session.getSubmissionActions().addCustomFormSubmissionAction(new AppointmentCheckInSubmissionAction(appointmentService));
    }

    public void setUiUtils(UiUtils uiUtils) {
        this.uiUtils = uiUtils;
    }

    public void setAppointmentService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
}
