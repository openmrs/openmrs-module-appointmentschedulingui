<%
    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")

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
    width: 400px;
    height: 300px
}
</style>


<script type="text/javascript">
   var breadcrumbs = [
     // TODO add breadcrumbs
   ];
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<div ng-app="appointmentscheduling.scheduleAppointment">

    <h1>
        ${ ui.message("appointmentschedulingui.scheduleAppointment.title") }
    </h1>

    <h3>
        ${ ui.message("appointmentschedulingui.scheduleAppointment.selectAppointmentType") }
    </h3>

    <div ng-controller="ScheduleAppointmentCtrl">

       <input type="text" ng-model="appointmentType" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >

        <span class="angular-datepicker">
            <input type="text" ng-model="fromDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" />
        </span>
        <span class="angular-datepicker">
            <input type="text" ng-model="toDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" />
        </span>

        <button ng-click="findAvailableTimeSlots()">Search</button>

        <div class="gridStyle" ng-grid="timeSlotOptions"></div>

    </div>

</div>