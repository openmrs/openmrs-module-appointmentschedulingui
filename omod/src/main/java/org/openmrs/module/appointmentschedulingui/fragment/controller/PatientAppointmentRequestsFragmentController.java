package org.openmrs.module.appointmentschedulingui.fragment.controller;

import org.openmrs.Patient;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

public class PatientAppointmentRequestsFragmentController {

    // can not pass in a patient to view all appointment requests
    public Object controller(@RequestParam(value = "patientId", required = false) Patient patient,
                             PageModel model, @InjectBeans PatientDomainWrapper patientDomainWrapper) {

        if (patient != null) {
            patientDomainWrapper.setPatient(patient);
            model.addAttribute("patient", patientDomainWrapper);
        }

        return null;
    }

}
