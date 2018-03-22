package org.openmrs.module.appointmentschedulingui;

import org.openmrs.LocationTag;
import org.openmrs.api.context.Context;
import org.openmrs.module.emrapi.utils.ModuleProperties;
import org.springframework.stereotype.Component;

@Component("appointmentSchedulingUIProperties")
public class AppointmentSchedulingUIProperties extends ModuleProperties {

    public LocationTag getSupportsAppointmentsTag() {
        return locationService.getLocationTagByName(AppointmentSchedulingUIConstants.LOCATION_TAG_SUPPORTS_APPOINTMENTS);
    }
    
    public boolean includeWeekends() {
    	String includeWeekendString = Context.getAdministrationService().getGlobalProperty("appointmentschedulingui.includeWeekends");
    	return Boolean.parseBoolean(includeWeekendString);
    }

}
