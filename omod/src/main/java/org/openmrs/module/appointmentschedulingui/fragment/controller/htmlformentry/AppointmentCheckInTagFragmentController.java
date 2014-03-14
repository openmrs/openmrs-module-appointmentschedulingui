package org.openmrs.module.appointmentschedulingui.fragment.controller.htmlformentry;

import java.util.HashMap;
import java.util.Map;

import org.openmrs.Location;
import org.openmrs.api.LocationService;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentModel;

/**
 * A controller that works in conjunction with the HTML Form entry appointment check-in tag
 */
public class AppointmentCheckInTagFragmentController {


    public void controller(FragmentModel model,
                           @SpringBean("locationService") LocationService locationService,
                           @FragmentParam("patientUuid") String patientUuid,
                           @FragmentParam("locationUuid") String locationUuid) {

        // hack: we need to expose location id to uuid mappings so that the location uuids are available for REST queries
        Map<Integer, String> locationIdToUuidMap = new HashMap<Integer, String>();
        for (Location location : locationService.getAllLocations()) {
            locationIdToUuidMap.put(location.getId(), location.getUuid());
        }

        model.addAttribute("locationIdToUuidMap", locationIdToUuidMap);
        model.addAttribute("patientUuid", patientUuid);
        model.addAttribute("locationUuid", locationUuid);

    }

}
