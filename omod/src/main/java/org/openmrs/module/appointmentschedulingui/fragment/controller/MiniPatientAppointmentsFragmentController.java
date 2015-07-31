/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.appointmentschedulingui.fragment.controller;

import org.joda.time.DateTime;
import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.Appointment.AppointmentStatus;
import org.openmrs.module.appointmentscheduling.AppointmentRequest;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.coreapps.CoreAppsProperties;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class MiniPatientAppointmentsFragmentController {
	
	public void controller(@RequestParam("patientId") Patient patient, FragmentModel model,
                           @SpringBean CoreAppsProperties coreAppsProperties,
	                       @SpringBean AppointmentService appointmentService) {
		
		DateTime curDate = new DateTime(new Date());
		Date date48HrsAgo = new Date(curDate.minusHours(48).withTimeAtStartOfDay().getMillis());
		List<AppointmentStatus> statuses = AppointmentStatus.getNotCancelledAppointmentStatuses();
		List<Appointment> patientAppointments = appointmentService.getAppointmentsByConstraints(date48HrsAgo, null, null, null,
		    null, patient, statuses);
        List<AppointmentRequest> patientAppointmentRequests = appointmentService.getAppointmentRequestsByConstraints(patient,
                null, null, AppointmentRequest.AppointmentRequestStatus.PENDING);
		model.addAttribute("patientAppointments", patientAppointments);
        model.addAttribute("patientAppointmentRequests", patientAppointmentRequests);
		model.addAttribute("timeFormatter", new SimpleDateFormat("h:mm a", Context.getLocale()));
        model.addAttribute("dashboardUrl", coreAppsProperties.getDashboardUrl());
	}
	
}
