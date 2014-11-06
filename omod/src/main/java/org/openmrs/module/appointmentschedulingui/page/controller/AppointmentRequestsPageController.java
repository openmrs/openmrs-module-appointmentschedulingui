package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIConstants;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.ui.framework.page.PageModel;

public class AppointmentRequestsPageController {

    public Object controller(PageModel model, UiSessionContext uiSessionContext) {
        model.addAttribute("canBook", uiSessionContext.getCurrentUser().hasPrivilege(AppointmentSchedulingUIConstants.PRIVILEGE_BOOK_APPOINTMENTS));
        return null;
    }
}

