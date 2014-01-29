package org.openmrs.module.appointmentschedulingui.page.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appointmentscheduling.validator.AppointmentTypeValidator;
import org.openmrs.ui.framework.annotation.BindParams;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

public class AppointmentTypePageController {
    protected final Log log = LogFactory.getLog(getClass());

    public void get(PageModel model,
                    @RequestParam(value = "appointmentTypeId", required = false) Integer appointmentTypeId,
                    @SpringBean("appointmentService") AppointmentService appointmentService){

        AppointmentType appointmentType = new AppointmentType();

        if(appointmentTypeId!=null){
            appointmentType = appointmentService.getAppointmentType(appointmentTypeId);
        }

        model.addAttribute("appointmentType", appointmentType);

    }

    public String post( PageModel model,
                        @ModelAttribute("appointmentType") @BindParams AppointmentType appointmentType,
                        BindingResult errors,
                        @SpringBean("appointmentService") AppointmentService appointmentService,
                        @SpringBean("appointmentTypeValidator") AppointmentTypeValidator appointmentTypeValidator){


         appointmentTypeValidator.validate(appointmentType,errors);
         if(!errors.hasErrors())  {
             try{
                 appointmentService.saveAppointmentType(appointmentType);
                 return "redirect:/appointmentschedulingui/manageAppointmentTypes.page";
             }catch (Exception e){
                 log.warn("Some error occurred while saving appointment type details:", e);
             }
         }

        model.addAttribute("errors", errors);
        model.addAttribute("appointmentType", appointmentType);

        return "appointmentType";

    }
}
