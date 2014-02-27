package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.LocationTag;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIProperties;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

public class ScheduleProvidersPageController {


    public Object controller(PageModel model,
                             @SpringBean("appointmentSchedulingUIProperties")AppointmentSchedulingUIProperties properties) {

        LocationTag supportsAppointmentsTag =  properties.getSupportsAppointmentsTag();
        model.addAttribute("supportsAppointmentsTagUuid",
                supportsAppointmentsTag != null ? supportsAppointmentsTag.getUuid() : "");

        return null;
    }

}
