package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.LocationTag;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIProperties;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

public class ScheduleProvidersPageController {


    public Object controller(PageModel model,
                             UiSessionContext uiSessionContext,
                             @SpringBean("appointmentSchedulingUIProperties")AppointmentSchedulingUIProperties properties) {

        LocationTag supportsAppointmentsTag =  properties.getSupportsAppointmentsTag();
        model.addAttribute("supportsAppointmentsTagUuid",
                supportsAppointmentsTag != null ? supportsAppointmentsTag.getUuid() : "");
        model.addAttribute("sessionLocationUuid", uiSessionContext != null && uiSessionContext.getSessionLocation() != null ?
                uiSessionContext.getSessionLocation().getUuid() : "");
        model.addAttribute("includeWeekends", properties.includeWeekends());
        return null;
    }

}
