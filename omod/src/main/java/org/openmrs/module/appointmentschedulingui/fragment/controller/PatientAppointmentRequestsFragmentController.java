package org.openmrs.module.appointmentschedulingui.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

public class PatientAppointmentRequestsFragmentController {

    public Object controller(@RequestParam("patientId") Patient patient,
                             PageModel model, UiSessionContext uiSessionContext,
                             @InjectBeans PatientDomainWrapper patientDomainWrapper,
                             @SpringBean("appointmentService") AppointmentService appointmentService) {

        patientDomainWrapper.setPatient(patient);
        model.addAttribute("patient", patientDomainWrapper);

        return null;
    }

}
