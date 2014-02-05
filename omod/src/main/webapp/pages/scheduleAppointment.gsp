<%
    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment.min.js")

    ui.includeJavascript("appointmentschedulingui", "ng-grid-2.0.7.min.js")
    ui.includeCss("appointmentschedulingui", "ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui", "scheduleAppointment.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")

%>

<!-- TODO: move to a style sheet--probably a standard style in ui commons?? -->
<style type="text/css">
.gridStyle {
    border: 1px solid rgb(212,212,212);
    width: 800px;
    height: 600px
}
</style>


<script type="text/javascript">
   var breadcrumbs = [
     // TODO add breadcrumbs
   ];
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<div ng-app="appointmentscheduling.scheduleAppointment" ng-controller="ScheduleAppointmentCtrl">

   <div ng-show="showScheduleAppointment">

       <h1>
           ${ ui.message("appointmentschedulingui.scheduleAppointment.title") }
       </h1>

       <h3>
           ${ ui.message("appointmentschedulingui.scheduleAppointment.selectAppointmentType") }
       </h3>

       <input type="text" ng-model="appointmentType" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >

        <span class="angular-datepicker">
            <input type="text" ng-model="fromDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" />
        </span>
        <span class="angular-datepicker">
            <input type="text" ng-model="toDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" />
        </span>

        <button ng-click="findAvailableTimeSlots()" ng-disabled="searchDisabled()">Search</button>

        <br/>
        Filter: <input type="text" ng-model="filterText" ng-change="updateFilter()"/>

        <div class="gridStyle" ng-grid="timeSlotOptions" ng-show="showTimeSlotsGrid"></div>

        <button ng-click="selectTimeSlot()" ng-show="showTimeSlotsGrid" ng-disabled="timeSlotOptions.selectedItems.length == 0">Next</button>

        <div ng-show="showNoTimeSlotsMessage">No matching available time slots</div>


   </div>

    <div ng-show="showConfirmAppointment">


        <h1>
            ${ ui.message("appointmentschedulingui.confirmAppointment.title") }
        </h1>

        Date: {{ selectedTimeSlot.date }}  <br/>
        Provider: {{ selectedTimeSlot.appointmentBlock.provider.person.display }} <br/>
        Location: {{ selectedTimeSlot.appointmentBlock.location.name }} <br/>

        Additional Notes (optional):<br/>

        <button ng-click="cancelConfirmAppointment()">Back</button>
        <button ng-click="confirmAppointment()">Next</button>
    </div>

</div>