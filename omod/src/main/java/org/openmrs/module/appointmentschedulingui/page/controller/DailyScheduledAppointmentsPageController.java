package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Location;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.emrapi.EmrApiProperties;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

public class DailyScheduledAppointmentsPageController {

    public void get(PageModel pageModel, @SpringBean("appointmentService") AppointmentService appointmentService,
                    @SpringBean("emrApiProperties") EmrApiProperties emrApiProperties,
                    UiSessionContext uiSessionContext){

       Location location = uiSessionContext.getSessionLocation();
       pageModel.addAttribute("currentLocationUuid", location.getUuid() );
    }
}
