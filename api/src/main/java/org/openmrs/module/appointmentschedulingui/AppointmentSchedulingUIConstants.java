package org.openmrs.module.appointmentschedulingui;

import org.openmrs.module.emrapi.EmrApiConstants;

public class AppointmentSchedulingUIConstants {

    public static final String PRIVILEGE_SCHEDULE_ADMINISTRATION = EmrApiConstants.PRIVILEGE_PREFIX_APP + "appointmentschedulingui.scheduleAdministration";

    public static final String PRIVILEGE_VIEW_APPOINTMENTS = EmrApiConstants.PRIVILEGE_PREFIX_APP + "appointmentschedulingui.viewAppointments";

    public static final String PRIVILEGE_BOOK_APPOINTMENTS = EmrApiConstants.PRIVILEGE_PREFIX_TASK + "appointmentschedulingui.bookAppointments";

    public static final String PRIVILEGE_OVERBOOK_APPOINTMENTS = EmrApiConstants.PRIVILEGE_PREFIX_TASK + "appointmentschedulingui.overbookAppointments";

    public static final String LOCATION_TAG_SUPPORTS_APPOINTMENTS = "Appointment Location";

    public static final String APPOINTMENT_CHECK_IN_TAG_NAME = "appointmentCheckIn";


}
