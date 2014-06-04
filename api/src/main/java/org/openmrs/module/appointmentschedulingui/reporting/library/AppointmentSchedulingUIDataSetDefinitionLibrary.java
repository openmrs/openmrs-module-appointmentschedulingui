package org.openmrs.module.appointmentschedulingui.reporting.library;

import org.openmrs.Location;
import org.openmrs.PatientIdentifier;
import org.openmrs.module.appointmentscheduling.Appointment;
import org.openmrs.module.appointmentscheduling.reporting.data.definition.AppointmentEndDateDataDefinition;
import org.openmrs.module.appointmentscheduling.reporting.data.definition.AppointmentProviderDataDefinition;
import org.openmrs.module.appointmentscheduling.reporting.data.definition.AppointmentStartDateDataDefinition;
import org.openmrs.module.appointmentscheduling.reporting.data.definition.AppointmentStatusDataDefinition;
import org.openmrs.module.appointmentscheduling.reporting.data.definition.AppointmentTypeDataDefinition;
import org.openmrs.module.appointmentscheduling.reporting.dataset.definition.AppointmentDataSetDefinition;
import org.openmrs.module.appointmentscheduling.reporting.query.definition.BasicAppointmentQuery;
import org.openmrs.module.appointmentschedulingui.AppointmentSchedulingUIConstants;
import org.openmrs.module.appointmentschedulingui.reporting.converter.AppointmentStatusToLocalizedStatusTypeConverter;
import org.openmrs.module.emrapi.EmrApiProperties;
import org.openmrs.module.reporting.common.SortCriteria;
import org.openmrs.module.reporting.data.converter.DateConverter;
import org.openmrs.module.reporting.data.converter.ObjectFormatter;
import org.openmrs.module.reporting.data.converter.PropertyConverter;
import org.openmrs.module.reporting.data.patient.definition.PatientIdentifierDataDefinition;
import org.openmrs.module.reporting.data.person.definition.PersonAttributeDataDefinition;
import org.openmrs.module.reporting.data.person.definition.PreferredNameDataDefinition;
import org.openmrs.module.reporting.definition.library.BaseDefinitionLibrary;
import org.openmrs.module.reporting.definition.library.DocumentedDefinition;
import org.openmrs.module.reporting.evaluation.parameter.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AppointmentSchedulingUIDataSetDefinitionLibrary extends BaseDefinitionLibrary<AppointmentDataSetDefinition> {

    @Autowired
    private EmrApiProperties emrApiProperties;

    @Override
    public Class<? super AppointmentDataSetDefinition> getDefinitionType() {
        return AppointmentDataSetDefinition.class;
    }

    @Override
    public String getKeyPrefix() {
        return "appointmentschedulingui.appointmentDataSetDefinition.";
    }

    @DocumentedDefinition("dailyAppointments")
    public AppointmentDataSetDefinition getDailyAppointmentsDataSetDefinition() {

        AppointmentDataSetDefinition dsd = new AppointmentDataSetDefinition();

        dsd.setName("appointmentschedulingui.appointmentDataSetDefinition.dailyAppointments");
        dsd.setDescription("appointmentschedulingui.appointmentDataSetDefinition.dailyAppointments");

        dsd.addParameter(new Parameter("date", "date", Date.class));
        dsd.addParameter(new Parameter("location", "location", Location.class));

        BasicAppointmentQuery query = new BasicAppointmentQuery();
        query.addParameter(new Parameter("onOrAfter", "On or after", Date.class));
        query.addParameter(new Parameter("onOrBefore", "On or before", Date.class));
        query.addParameter(new Parameter("location", "Location", Location.class));
        dsd.addRowFilter(query, "onOrAfter=${date},onOrBefore=${date},location=${location}");

        dsd.addColumn("identifier", createPrimaryIdentifierDataDefinition(), "", new PropertyConverter(PatientIdentifier.class, "identifier"));
        dsd.addColumn("provider", new AppointmentProviderDataDefinition(), "", new ObjectFormatter());
        dsd.addColumn("providerUuid", new AppointmentProviderDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("appointmentType", new AppointmentTypeDataDefinition(), "", new ObjectFormatter());
        dsd.addColumn("appointmentTypeUuid", new AppointmentTypeDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("providerUuid", new AppointmentProviderDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("statusType", new AppointmentStatusDataDefinition(), "", new PropertyConverter(Appointment.AppointmentStatusType.class, "type"));
        dsd.addColumn("localizedStatusType", new AppointmentStatusDataDefinition(), "", new AppointmentStatusToLocalizedStatusTypeConverter());
        dsd.addColumn("patientName", new PreferredNameDataDefinition(), "", new ObjectFormatter());
        dsd.addColumn("startDatetime", new AppointmentStartDateDataDefinition(), "", null);
        dsd.addColumn("startTimeFormatted", new AppointmentStartDateDataDefinition(), "", new DateConverter(AppointmentSchedulingUIConstants.TIME_FORMAT));
        dsd.addColumn("endTimeFormatted", new AppointmentEndDateDataDefinition(), "", new DateConverter(AppointmentSchedulingUIConstants.TIME_FORMAT));
        dsd.addColumn("telephoneNumber", new PersonAttributeDataDefinition(emrApiProperties.getTelephoneAttributeType()), "", new ObjectFormatter());

        dsd.addSortCriteria("startDatetime", SortCriteria.SortDirection.ASC);
        dsd.addSortCriteria("provider", SortCriteria.SortDirection.ASC);

        return dsd;
    }

    private PatientIdentifierDataDefinition createPrimaryIdentifierDataDefinition() {
        PatientIdentifierDataDefinition dd = new PatientIdentifierDataDefinition(null, emrApiProperties.getPrimaryIdentifierType());
        dd.setIncludeFirstNonNullOnly(true);
        return dd;
    }

}
