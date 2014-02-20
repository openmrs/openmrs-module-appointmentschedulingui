package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Patient;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.openmrs.ui.framework.page.Redirect;
import org.springframework.web.bind.annotation.RequestParam;


public class ScheduleAppointmentPageController {

    public Object controller(@RequestParam("patientId") Patient patient,
                             PageModel model,
                             UiUtils ui,
                             @InjectBeans PatientDomainWrapper patientDomainWrapper,
                             @SpringBean("appointmentService") AppointmentService appointmentService) {


        // TODO stole this from core apps patient dashboard--does it do what we want it to do?
        if (patient.isVoided() || patient.isPersonVoided()) {
            return new Redirect("coreapps", "patientdashboard/deletedPatient", "patientId=" + patient.getId());
        }

        patientDomainWrapper.setPatient(patient);
        model.addAttribute("patient", patientDomainWrapper);
        // TODO do we want/need to add active visit to model?

        model.addAttribute("upcomingAppointmentList", appointmentService.getScheduledAppointmentsForPatient(patient));

        return null;
    }

}
