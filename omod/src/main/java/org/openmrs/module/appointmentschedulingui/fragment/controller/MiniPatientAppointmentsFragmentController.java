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

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.joda.time.DateTime;
import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.springframework.web.bind.annotation.RequestParam;

public class MiniPatientAppointmentsFragmentController {
	
	public void controller(@RequestParam("patientId") Patient patient, FragmentModel model,
	                       @SpringBean AppointmentService appointmentService) {
		
		DateTime curDate = new DateTime(new Date());
		Date date48HrsAgo = new Date(curDate.minusHours(48).withTimeAtStartOfDay().getMillis());
		List<Appointment> patAppointments = appointmentService.getAppointmentsByConstraints(date48HrsAgo, null, null, null,
		    null, patient, (Appointment.AppointmentStatus) null);
		model.addAttribute("patAppointments", patAppointments);
		model.addAttribute("timeFormatter", new SimpleDateFormat("h:mm a", Context.getLocale()));
	}
	
}
