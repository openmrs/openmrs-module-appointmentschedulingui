

<%
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "htmlformentry/appointmentCheckInTag.js")
%>


<script type="text/javascript">

    // we use long names here since we are (hackily) putting these in the global scope
    var appointmentCheckInTagPatientUuid = '${ patientUuid }';
    var appointmentCheckInTagDate = new Date();
    var appointmentCheckInTagLocationUuid = '${ locationUuid }';

    angular.element(document).ready(function() {
        angular.bootstrap(jq('#appointment-check-in-tag'), ['appointmentscheduling.appointmentCheckInTag']);
    });

</script>


<div id="appointment-check-in-tag" ng-controller="AppointmentCheckInTagCtrl">

    <div ng-show="appointmentsToCheckIn.length > 0">
        <p>${ ui.message("appointmentschedulingui.appointmentCheckInTag.appointmentsToCheckIn") }:</p>
        <p ng-repeat="appointment in appointmentsToCheckIn">
            {{ appointment.appointmentType.display }} - {{ appointment.timeSlot.appointmentBlock.provider.person.display }} - {{ appointment.timeSlot.startDate | date: 'hh:mm a' }}
        </p>

    </div>
    <div ng-show="otherAppointmentsOnSameDay.length > 0">
        <p>${ ui.message("appointmentschedulingui.appointmentCheckInTag.otherAppointmentsOnSameDay") }:</p>
        <p ng-repeat="appointment in otherAppointmentsOnSameDay">
            {{ appointment.appointmentType.display }} - {{ appointment.timeSlot.appointmentBlock.provider.person.display }} - {{ appointment.timeSlot.appointmentBlock.location.display}} - {{ appointment.timeSlot.startDate | date: 'hh:mm a' }}

        </p>
    </div>

</div>