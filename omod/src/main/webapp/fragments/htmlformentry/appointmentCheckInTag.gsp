

<%
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "htmlformentry/appointmentCheckInTag.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("uicommons", "moment.min.js")

%>


<script type="text/javascript">

    // we use long names here since we are (hackily) putting these in the global scope
    var appointmentCheckInTagPatientUuid = '${ patientUuid }';
    var appointmentCheckInTagDate = new Date();
    var appointmentCheckInTagLocationUuid = '${ locationUuid }';

    angular.element(document).ready(function() {
        angular.bootstrap(jq('#appointment-check-in-tag'), ['appointmentscheduling.appointmentCheckInTag']);
    });

    var locationIdToUuidMap = {};

    // hack: we need to expose location id to uuid mappings so that the location uuids are available for REST queries
    <% locationIdToUuidMap.each { %>
        locationIdToUuidMap['${ it.key }'] = '${ it.value }';
    <% } %>

</script>


<div id="appointment-check-in-tag" ng-controller="AppointmentCheckInTagCtrl">

    <div ng-show="appointmentsToCheckIn.length > 0">
        ${ ui.message("appointmentschedulingui.appointmentCheckInTag.appointmentsToCheckIn") }:
        <ul>
            <li ng-repeat="appointment in appointmentsToCheckIn">
                {{ appointment.appointmentType.display }} - {{ appointment.timeSlot.appointmentBlock.provider.person.display }} - {{ appointment.timeSlot.startDate | date: 'hh:mm a' }}
            </li>
        </ul>

    </div>
    <div ng-show="otherAppointmentsOnSameDay.length > 0">
        ${ ui.message("appointmentschedulingui.appointmentCheckInTag.otherAppointmentsOnSameDay") }:
        <ul>
            <li ng-repeat="appointment in otherAppointmentsOnSameDay">
                {{ appointment.appointmentType.display }} - {{ appointment.timeSlot.appointmentBlock.provider.person.display }} - {{ appointment.timeSlot.appointmentBlock.location.display}} - {{ appointment.timeSlot.startDate | date: 'hh:mm a' }}
            </li>
        </ul>
    </div>

</div>