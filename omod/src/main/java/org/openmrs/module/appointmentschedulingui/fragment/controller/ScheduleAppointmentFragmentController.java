package org.openmrs.module.appointmentschedulingui.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIConstants;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

public class ScheduleAppointmentFragmentController {

    public Object controller(@RequestParam(value = "patientId", required = false) Patient patient,
                             PageModel model, UiSessionContext uiSessionContext,
                             @FragmentParam(value = "returnUrl", required = false) String returnUrl,
                             @InjectBeans PatientDomainWrapper patientDomainWrapper) {

        if (patient != null) {
            patientDomainWrapper.setPatient(patient);
            model.addAttribute("patient", patientDomainWrapper);
        }

        model.addAttribute("canOverbook",uiSessionContext.getCurrentUser().hasPrivilege(AppointmentSchedulingUIConstants.PRIVILEGE_OVERBOOK_APPOINTMENTS));
        model.addAttribute("returnUrl", returnUrl);
        model.addAttribute("locale", Context.getLocale().getLanguage());
        return null;
    }

}
