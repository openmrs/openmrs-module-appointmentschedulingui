package org.openmrs.module.appointmentschedulingui.fragment.controller.htmlformentry;

import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.fragment.FragmentModel;

/**
 * A controller that works in conjunction with the HTML Form entry appointment check-in tag
 */
public class AppointmentCheckInTagFragmentController {


    public void controller(FragmentModel model,
                           @FragmentParam("patientUuid") String patientUuid,
                           @FragmentParam("locationUuid") String locationUuid) {

        model.addAttribute("patientUuid", patientUuid);
        model.addAttribute("locationUuid", locationUuid);

    }


}
