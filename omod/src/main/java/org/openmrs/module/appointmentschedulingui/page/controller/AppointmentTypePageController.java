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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

public class AppointmentTypePageController {
    protected final Log log = LogFactory.getLog(getClass());

    public void get(){}

    public String post( PageModel model,
                        @ModelAttribute("appointmentTypeForm") @BindParams AppointmentType appointmentType,
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

        return "appointmentType";

    }

    public static class ManageAppointmentTypesPageController {


        public void get(PageModel model,
                        @SpringBean("appointmentService") AppointmentService service) throws  Exception{

            List<AppointmentType> appointmentTypeList =  service.getAllAppointmentTypesSorted(false);
            model.addAttribute("appointmentTypeList",appointmentTypeList );
        }

        @RequestMapping(method = RequestMethod.DELETE)
        public String retireAppointmentType(@SpringBean("appointmentService") AppointmentService service) {
            AppointmentType appointmentType = service.getAppointmentTypeByUuid("d4a8a346-51a5-48cc-aee3-b4c3b00b49f3");
            service.retireAppointmentType(appointmentType,"because we can");
            return "manageAppointmentTypes";
        }


    }
}
