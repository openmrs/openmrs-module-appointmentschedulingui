package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Patient;
import org.openmrs.module.appframework.feature.FeatureToggleProperties;
import org.openmrs.module.coreapps.CoreAppsProperties;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.web.bind.annotation.RequestParam;

public class PatientAppointmentsPageController {

    public Object controller(@RequestParam("patientId") Patient patient,
                             @InjectBeans PatientDomainWrapper patientDomainWrapper,
                             @SpringBean FeatureToggleProperties featureToggles,
                             @SpringBean CoreAppsProperties coreAppsProperties,
                            PageModel model) {
        patientDomainWrapper.setPatient(patient);
        model.addAttribute("patient", patientDomainWrapper);
        model.addAttribute("featureToggles", featureToggles);
        model.addAttribute("dashboardUrl", coreAppsProperties.getDashboardUrl());
        return null;
    }

}
