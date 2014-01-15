package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

import java.util.List;

public class ManageAppointmentTypesPageController {


    public void get(PageModel model,
                    @SpringBean("appointmentService") AppointmentService service) throws  Exception{

        List<AppointmentType> appointmentTypeList =  service.getAllAppointmentTypesSorted(false);
        model.addAttribute("appointmentTypeList",appointmentTypeList );

    }
}
