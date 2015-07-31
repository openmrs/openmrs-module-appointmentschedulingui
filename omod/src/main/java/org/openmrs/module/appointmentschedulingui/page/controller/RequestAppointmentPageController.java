package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Patient;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.coreapps.CoreAppsProperties;
import org.openmrs.module.emrapi.patient.PatientDomainWrapper;
import org.openmrs.ui.framework.annotation.InjectBeans;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;
import org.openmrs.ui.framework.page.Redirect;
import org.springframework.web.bind.annotation.RequestParam;

public class RequestAppointmentPageController {
	
	public Object controller(@RequestParam("patientId") Patient patient,
                             PageModel model,
	                         @RequestParam(value = "returnUrl", required = false) String returnUrl,
                             @SpringBean CoreAppsProperties coreAppsProperties,
	                         UiSessionContext uiSessionContext, @InjectBeans PatientDomainWrapper patientDomainWrapper) {
		
		// TODO stole this from core apps patient dashboard--does it do what we want it to do?
		if (patient.isVoided() || patient.isPersonVoided()) {
			return new Redirect("coreapps", "patientdashboard/deletedPatient", "patientId=" + patient.getId());
		}
		
		patientDomainWrapper.setPatient(patient);
		model.addAttribute("patient", patientDomainWrapper);
		model.addAttribute("currentProvider", uiSessionContext.getCurrentProvider());
		model.addAttribute("returnUrl", returnUrl);
        model.addAttribute("dashboardUrl", coreAppsProperties.getDashboardUrl());
		
		return null;
	}
	
}
