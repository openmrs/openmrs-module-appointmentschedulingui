package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.api.APIAuthenticationException;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIConstants;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.ui.framework.page.PageModel;

public class AppointmentRequestsPageController {

    public Object controller(PageModel model, UiSessionContext uiSessionContext) {
		uiSessionContext.requireAuthentication();
		if (!uiSessionContext.getCurrentUser().hasPrivilege("Task: appointmentschedulingui.requestAppointments")
		        && (!uiSessionContext.getCurrentUser().isSuperUser())) {
			throw new APIAuthenticationException();
		}
        model.addAttribute("canBook", uiSessionContext.getCurrentUser().hasPrivilege(AppointmentSchedulingUIConstants.PRIVILEGE_BOOK_APPOINTMENTS));
        return null;
    }
}

