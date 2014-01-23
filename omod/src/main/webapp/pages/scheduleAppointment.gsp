<%
    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")

    ui.includeJavascript("appointmentschedulingui", "scheduleAppointment.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")

%>
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

    <div ng-controller="SelectAppointmentTypeCtrl">

       <input type="text" ng-model="selected" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >

    </div>

</div>