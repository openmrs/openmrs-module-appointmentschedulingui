
<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.13.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-2.0.7.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-locale_ht-custom.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-flexible-height.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment-with-locales.min.js")
    ui.includeJavascript("uicommons", "emr.js")
    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")
    ui.includeCss("uicommons", "datetimepicker.css")

    ui.includeJavascript("appointmentschedulingui","app.js")
    ui.includeJavascript("appointmentschedulingui", "services/appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "factories" +
            "/ngGridHelper.js")
    ui.includeJavascript("appointmentschedulingui", "resources/appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/patientAppointmentsController.js")

    ui.includeJavascript("appointmentschedulingui", "controllers/dateRangePickerController.js")
    ui.includeJavascript("appointmentschedulingui", "directives/dateRangePickerDirective.js")
    ui.includeJavascript("appointmentschedulingui", "services/dateRangePickerEventListener.js")

    ui.includeCss("appointmentschedulingui", "patientAppointments.css")
    ui.includeCss("appointmentschedulingui", "dateRangePicker.css")
    ui.includeCss("appointmentschedulingui", "gridStyle.css")

%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.scheduleAppointment.status',
        'appointmentschedulingui.scheduleAppointment.status.type.scheduled',
        'appointmentschedulingui.scheduleAppointment.status.type.active',
        'appointmentschedulingui.scheduleAppointment.status.type.cancelled',
        'appointmentschedulingui.scheduleAppointment.status.type.missed',
        'appointmentschedulingui.scheduleAppointment.status.type.completed',
        'appointmentschedulingui.scheduleAppointment.cancelAppointment.tooltip',
        'appointmentschedulingui.scheduleAppointment.invalidSearchParameters',
        'appointmentschedulingui.scheduleAppointment.actions',
        'appointmentschedulingui.scheduleAppointment.status',
        'appointmentschedulingui.scheduleAppointment.location',
        'appointmentschedulingui.scheduleAppointment.provider',
        'appointmentschedulingui.scheduleAppointment.serviceType',
        'appointmentschedulingui.scheduleAppointment.date'
].flatten()
]) %>

<script type="text/javascript">
    var jsLocale = '${ angularLocale }';  // used by the ngGrid widget
    if(jsLocale.indexOf('_') > -1){
        jsLocale = jsLocale.substring(0, jsLocale.indexOf('_'));
    }
</script>


<!-- list of current patient appointments -->
<div id="appointmentscheduling-patientAppointments" ng-controller='PatientAppointmentsCtrl' ng-show="showAppointments" ng-init="init('${ patient.patient.uuid }', ${ canBook }, ${ config.loadOnInit }, ${ config.hideActionButtons }, ${ config.enablePagination }, '${ locale }')" ng-cloak>

    <div>
        <h2>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.patientAppointments") }
        </h2>

        <div class="inline-box">
            <daterangepicker
                    headermessage='${ ui.message("appointmentschedulingui.scheduleAppointment.timeframe") }'
                    startdate="{{ fromDate.toDateString() }}"
                    senderid="patientAppointments"
                    startdatemin = ""
                    clearlinktext = '${ ui.message("appointmentschedulingui.directive.daterangepicker.clear") }'>
            </daterangepicker>
        </div>
        <div id="noPatientAppointment" ng-show="showNoAppointmentsMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.noPatientAppointments")}</div>
        <div id="loadingPatientAppointmentsMessage" ng-show="showLoadingAppointmentsGrid">${ ui.message("appointmentschedulingui.scheduleAppointment.patientAppointmentsLoading") }</div>

        <table id="appointmentGridTable" class="gridStyle" ng-grid="appointmentsGrid" ng-show="showAppointmentsGrid"></table>
    </div>

    <%= ui.includeFragment("appointmentschedulingui", "cancelAppointment") %>

</div>
