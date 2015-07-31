

<%
    ui.includeJavascript("appointmentschedulingui", "services/appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "htmlformentry/appointmentCheckInTag.js")
    ui.includeJavascript("appointmentschedulingui", "resources/appointmentResources.js")
    ui.includeJavascript("uicommons", "moment-with-locales.min.js")

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


<!-- note that setting class="confirmation-message" means that this div will be inserted into the confirmation page when using the one-question-per-screen navigator -->
<div id="appointment-check-in-tag" ng-controller="AppointmentCheckInTagCtrl" class="confirmation-message" ng-cloak>

    <div ng-show="appointmentsToCheckIn.length > 0">
        ${ ui.message("appointmentschedulingui.appointmentCheckInTag.appointmentsToCheckIn") }:
        <ul class="list">
            <li ng-repeat="appointment in appointmentsToCheckIn">
                {{ appointment.appointmentType.display }}, {{ appointment.timeSlot.appointmentBlock.provider.person.display }}{{ appointment.timeSlot.appointmentBlock.provider ? ', ' : '' }}{{ appointment.timeSlot.startDate | date: 'hh:mm a' }} - {{ appointment.timeSlot.endDate | date: 'hh:mm a' }}
            </li>
        </ul>

    </div>
    <div ng-show="otherAppointmentsOnSameDay.length > 0">
        ${ ui.message("appointmentschedulingui.appointmentCheckInTag.otherAppointmentsOnSameDay") }:
        <ul class="list">
            <li ng-repeat="appointment in otherAppointmentsOnSameDay">
                {{ appointment.appointmentType.display }}, {{ appointment.timeSlot.appointmentBlock.provider.person.display }}{{ appointment.timeSlot.appointmentBlock.provider ? ', ' : '' }}{{ appointment.timeSlot.appointmentBlock.location.display}}, {{ appointment.timeSlot.startDate | date: 'hh:mm a' }} - {{ appointment.timeSlot.endDate | date: 'hh:mm a' }}
            </li>
        </ul>
    </div>

</div>