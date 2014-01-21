package org.openmrs.module.appointmentschedulingui.page.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appointmentscheduling.validator.AppointmentTypeValidator;
import org.openmrs.ui.framework.annotation.BindParams;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;

public class AppointmentTypePageController {
    protected final Log log = LogFactory.getLog(getClass());

    public void get(){}

    public String post( @ModelAttribute("appointmentTypeForm") @BindParams AppointmentType appointmentType,
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

        return "appointmentType.page";

    }


}
