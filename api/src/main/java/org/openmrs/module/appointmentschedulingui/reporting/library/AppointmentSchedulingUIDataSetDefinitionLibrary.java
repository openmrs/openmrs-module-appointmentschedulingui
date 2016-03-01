package org.openmrs.module.appointmentschedulingui.reporting.library;

import org.openmrs.Location;
import org.openmrs.PatientIdentifier;
import org.openmrs.api.context.Context;
import org.openmrs.api.db.SerializedObject;
import org.openmrs.api.db.SerializedObjectDAO;
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
import org.openmrs.module.reporting.dataset.definition.DataSetDefinition;
import org.openmrs.module.reporting.dataset.definition.service.DataSetDefinitionService;
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

    @Autowired
    private SerializedObjectDAO serializedObjectDAO;

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

        ObjectFormatter formatted = new ObjectFormatter();

        // only create the primary identifier column if a primary identifier type has been properly set up
        try {
            if (emrApiProperties.getPrimaryIdentifierType() != null) {
                dsd.addColumn("identifier", createPrimaryIdentifierDataDefinition(), "", new PropertyConverter(PatientIdentifier.class, "identifier"), formatted);
            }
        }
        catch (IllegalStateException e) {
            // the EMR-API module may throw this if the emr.primaryIdentifierTYpe definition has not been specifed
        }

        // only create the telephone column if a telephone attribute type has been specified
        try {
            if (emrApiProperties.getTelephoneAttributeType() != null) {
                dsd.addColumn("telephoneNumber", new PersonAttributeDataDefinition(emrApiProperties.getTelephoneAttributeType()), "", formatted);
            }
        }
        catch (IllegalStateException e) {
            // the EMR-API module may throw this if the emr.primaryIdentifierTYpe definition has not been specifed
        }

        dsd.addColumn("provider", new AppointmentProviderDataDefinition(), "", formatted);
        dsd.addColumn("providerUuid", new AppointmentProviderDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("appointmentType", new AppointmentTypeDataDefinition(), "", formatted);
        dsd.addColumn("appointmentTypeUuid", new AppointmentTypeDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("providerUuid", new AppointmentProviderDataDefinition(), "", new PropertyConverter(String.class, "uuid"));
        dsd.addColumn("statusType", new AppointmentStatusDataDefinition(), "", new PropertyConverter(Appointment.AppointmentStatusType.class, "type"));
        dsd.addColumn("localizedStatusType", new AppointmentStatusDataDefinition(), "", new AppointmentStatusToLocalizedStatusTypeConverter());
        dsd.addColumn("patientName", new PreferredNameDataDefinition(), "", formatted);
        dsd.addColumn("startDatetime", new AppointmentStartDateDataDefinition(), "", null);
        dsd.addColumn("startTimeFormatted", new AppointmentStartDateDataDefinition(), "", new DateConverter(AppointmentSchedulingUIConstants.TIME_FORMAT));
        dsd.addColumn("endTimeFormatted", new AppointmentEndDateDataDefinition(), "", new DateConverter(AppointmentSchedulingUIConstants.TIME_FORMAT));

        dsd.addSortCriteria("startDatetime", SortCriteria.SortDirection.ASC);
        dsd.addSortCriteria("provider", SortCriteria.SortDirection.ASC);

        return dsd;
    }

    public void persistDailyAppointmentsDataSetDefinition() {

        DataSetDefinitionService dataSetDefinitionService = Context.getService(DataSetDefinitionService.class);

        // fetch the existing definition if it exists
        DataSetDefinition existing =  dataSetDefinitionService.getDefinition(AppointmentSchedulingUIConstants.DAILY_SCHEDULED_APPOINTMENT_DATA_SET_DEFINITION_UUID, AppointmentDataSetDefinition.class);

        // create the new definition
        AppointmentDataSetDefinition dsd = getDailyAppointmentsDataSetDefinition();
        dsd.setUuid(AppointmentSchedulingUIConstants.DAILY_SCHEDULED_APPOINTMENT_DATA_SET_DEFINITION_UUID);

        // override the existing with the new
        if (existing != null) {
            dsd.setId(existing.getId());
            try {
            	Context.evictFromSession(existing);
            }
            catch (IllegalArgumentException ex) {
             	//this exception was not thrown in older versions (3.x) of hibernate, as they silently ignored it
            	//see https://github.com/hibernate/hibernate-orm/commit/c8b20660ed56432a946e78794be147422e80ede6#diff-cf194ae1fcd406b5c8720bd5655f304bR100
            }
        }
        else {
            // incompatible class changes for a serialized object could mean that getting the definition return null
            // and some serialization error gets logged. In that case we want to overwrite the invalid serialized definition
            SerializedObject invalidSerializedObject = serializedObjectDAO.getSerializedObjectByUuid(AppointmentSchedulingUIConstants.DAILY_SCHEDULED_APPOINTMENT_DATA_SET_DEFINITION_UUID);
            if (invalidSerializedObject != null) {
                dsd.setId(invalidSerializedObject.getId());
                try {
                	Context.evictFromSession(invalidSerializedObject);
                }
                catch (IllegalArgumentException ex) {
                	//this exception was not thrown in older versions (3.x) of hibernate, as they silently ignored it
                	//see https://github.com/hibernate/hibernate-orm/commit/c8b20660ed56432a946e78794be147422e80ede6#diff-cf194ae1fcd406b5c8720bd5655f304bR100
                }
            }
        }


        dataSetDefinitionService.saveDefinition(dsd);
    }

    private PatientIdentifierDataDefinition createPrimaryIdentifierDataDefinition() {
        PatientIdentifierDataDefinition dd = new PatientIdentifierDataDefinition(null, emrApiProperties.getPrimaryIdentifierType());
        dd.setIncludeFirstNonNullOnly(true);
        return dd;
    }

}
