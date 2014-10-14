package org.openmrs.module.appointmentschedulingui.listener;

import org.openmrs.GlobalProperty;
import org.openmrs.api.GlobalPropertyListener;
import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentschedulingui.reporting.library.AppointmentSchedulingUIDataSetDefinitionLibrary;
import org.openmrs.module.emrapi.EmrApiConstants;

/**
 * Recreate the Daily Appointments Report when the primary identifier changes
 */
public class EmrPrimaryIdentifierTypeGlobalPropertyListener implements GlobalPropertyListener {

    @Override
    public boolean supportsPropertyName(String propertyName) {
        return EmrApiConstants.PRIMARY_IDENTIFIER_TYPE.equals(propertyName);
    }

    @Override
    public void globalPropertyChanged(GlobalProperty newValue) {
        Context.getRegisteredComponents(AppointmentSchedulingUIDataSetDefinitionLibrary.class).get(0).persistDailyAppointmentsDataSetDefinition();

    }

    @Override
    public void globalPropertyDeleted(String propertyName) {
        Context.getRegisteredComponents(AppointmentSchedulingUIDataSetDefinitionLibrary.class).get(0).persistDailyAppointmentsDataSetDefinition();
    }

}
