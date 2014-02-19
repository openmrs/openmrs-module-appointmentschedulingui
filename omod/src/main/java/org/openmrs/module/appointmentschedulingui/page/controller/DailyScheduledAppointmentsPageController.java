package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Location;
import org.openmrs.module.appointmentscheduling.ScheduledAppointmentBlock;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.emrapi.EmrApiProperties;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

import java.util.Date;
import java.util.List;

public class DailyScheduledAppointmentsPageController {

    public void get(PageModel pageModel, @SpringBean("appointmentService") AppointmentService appointmentService,
                    @SpringBean("emrApiProperties") EmrApiProperties emrApiProperties,
                    UiSessionContext uiSessionContext){

       Location location = uiSessionContext.getSessionLocation();
       List<ScheduledAppointmentBlock> scheduledAppointmentBlocks = appointmentService.getDailyAppointmentBlocks(location, new Date());
       pageModel.addAttribute("scheduledAppointmentBlocks", scheduledAppointmentBlocks);
       pageModel.addAttribute("primaryPatientIdentifierType", emrApiProperties.getPrimaryIdentifierType() );
       pageModel.addAttribute("dossierPatientIdentifierType", emrApiProperties.getDossierIdentifierType() );
    }
}
