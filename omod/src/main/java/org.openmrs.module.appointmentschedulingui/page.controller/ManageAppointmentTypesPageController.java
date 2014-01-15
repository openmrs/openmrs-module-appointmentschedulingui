package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

public class ManageAppointmentTypesPageController {


    public void get(PageModel model,
                    @SpringBean("appointmentService") AppointmentService service) throws  Exception{

        model.addAttribute("appointmentTypeList", service.getAllAppointmentTypes(true));
    }
}
