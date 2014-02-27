package org.openmrs.module.appointmentschedulingui.fragment.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import org.openmrs.ui.framework.fragment.FragmentModel;

public class TimeZoneWarningFragmentController {

    public void controller(FragmentModel model) {
        TimeZone tz = Calendar.getInstance().getTimeZone();
        model.addAttribute("serverTimeZone", tz.getDisplayName());
        model.addAttribute("serverTimeZoneOffset", tz.getOffset(new Date().getTime()) / 1000 / 60);
    }

}
