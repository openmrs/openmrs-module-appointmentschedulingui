package org.openmrs.module.appointmentschedulingui;

import org.openmrs.LocationTag;
import org.openmrs.module.emrapi.utils.ModuleProperties;
import org.springframework.stereotype.Component;

@Component("appointmentSchedulingUIProperties")
public class AppointmentSchedulingUIProperties extends ModuleProperties {

    public static final String LOCATION_TAG_SUPPORTS_APPOINTMENTS = "Appointment Location";

    public LocationTag getSupportsAppointmentsTag() {
        return locationService.getLocationTagByName(LOCATION_TAG_SUPPORTS_APPOINTMENTS);
    }

}
