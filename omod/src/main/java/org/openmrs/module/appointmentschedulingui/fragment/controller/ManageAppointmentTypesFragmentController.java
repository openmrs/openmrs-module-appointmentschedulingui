package org.openmrs.module.appointmentschedulingui.fragment.controller;

import org.openmrs.module.appointmentscheduling.AppointmentType;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.action.FailureResult;
import org.openmrs.ui.framework.fragment.action.FragmentActionResult;
import org.openmrs.ui.framework.fragment.action.SuccessResult;
import org.springframework.web.bind.annotation.RequestParam;

public class ManageAppointmentTypesFragmentController {

    public FragmentActionResult retireAppointmentType(UiUtils ui,
                                                      @RequestParam(value = "appointmentTypeId", required = true) int appointmentTypeId,
                                                      @SpringBean("appointmentService") AppointmentService appointmentService) {

        AppointmentType appointmentTypeToRetired = appointmentService.getAppointmentType(appointmentTypeId);

        if (appointmentTypeToRetired != null) {
            appointmentService.retireAppointmentType(appointmentTypeToRetired,"Retired appointment type by system administration");
            return new SuccessResult("deleted");
        }
        else{
            return new FailureResult(ui.message("appointmentschedulingui.manageappointmenttype.notAllowed"));
        }
    }
}
