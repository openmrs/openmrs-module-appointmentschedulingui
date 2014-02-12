package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public class ManageAppointmentTypesPageController {


    public void get(PageModel model,
                    UiUtils ui,
                    @RequestParam(value = "deleted", required = false) String appointmentTypeDeleted,
                    @SpringBean("appointmentService") AppointmentService service) throws  Exception{


        String resultMessage = "";
        if(appointmentTypeDeleted.equals("true")){
            resultMessage = ui.message("appointmentschedulingui.manageappointmenttype.success");
        }
        model.addAttribute("resultMessage", resultMessage);

        List<AppointmentType> appointmentTypeList =  service.getAllAppointmentTypesSorted(false);
        model.addAttribute("appointmentTypeList",appointmentTypeList );
    }
}
