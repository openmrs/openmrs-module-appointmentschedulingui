package org.openmrs.module.appointmentschedulingui.htmlformentry;

import org.joda.time.DateTime;
import org.openmrs.Visit;
import org.openmrs.module.appointmentscheduling.AppointmentData;
import org.openmrs.module.appointmentscheduling.api.AppointmentService;
import org.openmrs.module.htmlformentry.CustomFormSubmissionAction;
import org.openmrs.module.htmlformentry.FormEntrySession;

import java.util.Date;
import java.util.List;

public class AppointmentCheckInSubmissionAction implements CustomFormSubmissionAction {

    private AppointmentService appointmentService;

    public AppointmentCheckInSubmissionAction(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @Override
    public void applyAction(FormEntrySession session) {
        // check in to any scheduled appointments at the specified location on that date
        Date fromDate = new DateTime(session.getSubmissionActions().getCurrentEncounter().getEncounterDatetime()).toDateMidnight().toDate();
        Date toDate = new DateTime(session.getSubmissionActions().getCurrentEncounter().getEncounterDatetime()).withTime(23, 59, 59, 999).toDate();

        // TODO do we need to handle RESCHEDULED here?
        List<AppointmentData> appointmentList = appointmentService.getAppointmentsByConstraints(fromDate, toDate,
                session.getSubmissionActions().getCurrentEncounter().getLocation(), null, null, session.getPatient(), AppointmentData.AppointmentStatus.SCHEDULED);

        Visit visit = session.getContext().getVisit() != null ? (Visit) session.getContext().getVisit() : null;

        for (AppointmentData appointment : appointmentList) {
            appointment.setStatus(AppointmentData.AppointmentStatus.WAITING);
            appointment.setVisit(visit);
            appointmentService.saveAppointmentData(appointment);
        }
    }

    public void setAppointmentService(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
}
