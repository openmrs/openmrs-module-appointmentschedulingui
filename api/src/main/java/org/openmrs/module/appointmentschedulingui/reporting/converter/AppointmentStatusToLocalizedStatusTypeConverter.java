package org.openmrs.module.appointmentschedulingui.reporting.converter;

import org.openmrs.api.context.Context;
import org.openmrs.module.appointmentscheduling.AppointmentData;
import org.openmrs.module.reporting.data.converter.DataConverter;

/**
 * Given an Appointment Status, returns the localized name of the associated AppointmentStatusType
 */
public class AppointmentStatusToLocalizedStatusTypeConverter implements DataConverter {

    @Override
    public Object convert(Object original) {
        AppointmentData.AppointmentStatus status = (AppointmentData.AppointmentStatus) original;
        return Context.getMessageSourceService()
                .getMessage("appointmentschedulingui.scheduleAppointment.status.type." + status.getType().toString().toLowerCase());
    }

    @Override
    public Class<?> getInputDataType() {
        return AppointmentData.AppointmentStatus.class;
    }

    @Override
    public Class<?> getDataType() {
        return String.class;
    }
}
