/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package org.openmrs.module.appointmentschedulingui;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.api.context.Context;
import org.openmrs.module.ModuleActivator;
import org.openmrs.module.ModuleFactory;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.appointmentscheduling.reporting.dataset.definition.AppointmentDataSetDefinition;
import org.openmrs.module.appointmentschedulingui.htmlformentry.AppointmentCheckInTagHandler;
import org.openmrs.module.appointmentschedulingui.reporting.library.AppointmentSchedulingUIDataSetDefinitionLibrary;
import org.openmrs.module.htmlformentry.HtmlFormEntryService;
import org.openmrs.module.reporting.dataset.definition.DataSetDefinition;
import org.openmrs.module.reporting.dataset.definition.service.DataSetDefinitionService;

/**
 * This class contains the logic that is run every time this module is either started or stopped.
 */
public class AppointmentSchedulingUIActivator implements ModuleActivator {
	
	protected Log log = LogFactory.getLog(getClass());
		
	/**
	 * @see ModuleActivator#willRefreshContext()
	 */
	public void willRefreshContext() {
		log.info("Refreshing Appointment Scheduling UI Module");
	}
	
	/**
	 * @see ModuleActivator#contextRefreshed()
	 */
	public void contextRefreshed() {
		log.info("Appointment Scheduling UI Module refreshed");
	}
	
	/**
	 * @see ModuleActivator#willStart()
	 */
	public void willStart() {
		log.info("Starting Appointment Scheduling UI Module");
	}
	
	/**
	 * @see ModuleActivator#started()
	 */
	public void started() {

        if (ModuleFactory.isModuleStarted("htmlformentry")) {
            HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
            AppointmentService appointmentService = Context.getService(AppointmentService.class);
            htmlFormEntryService.addHandler(AppointmentSchedulingUIConstants.APPOINTMENT_CHECK_IN_TAG_NAME,
                    createAppointmentCheckInTagHandler(appointmentService));
        }

        // make sure the daily appointment data set definition (used for rendering the daily appt page) has been persisted
        Context.getRegisteredComponents(AppointmentSchedulingUIDataSetDefinitionLibrary.class).get(0).persistDailyAppointmentsDataSetDefinition();

        log.info("Appointment Scheduling UI Module started");
	}
	
	/**
	 * @see ModuleActivator#willStop()
	 */
	public void willStop() {
		log.info("Stopping Appointment Scheduling UI Module");
	}
	
	/**
	 * @see ModuleActivator#stopped()
	 */
	public void stopped() {

        try {
            HtmlFormEntryService htmlFormEntryService = Context.getService(HtmlFormEntryService.class);
            htmlFormEntryService.getHandlers().remove(AppointmentSchedulingUIConstants.APPOINTMENT_CHECK_IN_TAG_NAME);
        } catch (Exception ex) {
            // pass
        }

        removeDataSetDefinitions();

		log.info("Appointment Scheduling UI Module stopped");
	}

    public AppointmentCheckInTagHandler createAppointmentCheckInTagHandler(AppointmentService appointmentService) {
        AppointmentCheckInTagHandler appointmentCheckInTagHandler = new AppointmentCheckInTagHandler();
        appointmentCheckInTagHandler.setAppointmentService(appointmentService);
        return appointmentCheckInTagHandler;
    }

    private void removeDataSetDefinitions() {
        DataSetDefinitionService dataSetDefinitionService = Context.getService(DataSetDefinitionService.class);
        DataSetDefinition dsd = dataSetDefinitionService.getDefinition(AppointmentSchedulingUIConstants.DAILY_SCHEDULED_APPOINTMENT_DATA_SET_DEFINITION_UUID, AppointmentDataSetDefinition.class);

        if (dsd != null) {
            dataSetDefinitionService.purgeDefinition(dsd);
        }

        Context.flushSession();
    }

}
