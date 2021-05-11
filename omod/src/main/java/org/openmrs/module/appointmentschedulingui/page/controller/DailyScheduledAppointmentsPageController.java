package org.openmrs.module.appointmentschedulingui.page.controller;

import org.openmrs.Location;
import org.openmrs.LocationTag;
import org.openmrs.api.APIAuthenticationException;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIProperties;
import org.openmrs.module.appui.UiSessionContext;
import org.openmrs.module.emrapi.EmrApiConstants;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.page.PageModel;

public class DailyScheduledAppointmentsPageController {

    public void get(PageModel pageModel,
                    @SpringBean("appointmentSchedulingUIProperties")AppointmentSchedulingUIProperties properties,
                    UiSessionContext uiSessionContext){
		
		uiSessionContext.requireAuthentication();
		if (!uiSessionContext.getCurrentUser().hasPrivilege("App: appointmentschedulingui.viewAppointments")
		        && (!uiSessionContext.getCurrentUser().isSuperUser())) {
			throw new APIAuthenticationException("Access to daily scheduled appointments page denied due to insufficient privileges");
		}
       Location location = uiSessionContext.getSessionLocation();
       LocationTag supportsAppointmentsTag =  properties.getSupportsAppointmentsTag();
       pageModel.addAttribute("supportsAppointmentsTagUuid",
               supportsAppointmentsTag != null ? supportsAppointmentsTag.getUuid() : "");
       pageModel.addAttribute("sessionLocationUuid", location != null ? location.getUuid() : "");
       String telephoneAttributeTypeName = EmrApiConstants.TELEPHONE_ATTRIBUTE_TYPE_NAME;
       pageModel.addAttribute("telephoneAttributeTypeName", telephoneAttributeTypeName);
    }
}
