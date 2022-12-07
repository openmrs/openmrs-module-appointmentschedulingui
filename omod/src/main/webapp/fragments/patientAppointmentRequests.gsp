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
    ui.includeJavascript("appointmentschedulingui", "controllers/dateRangePickerController.js")
    ui.includeJavascript("appointmentschedulingui", "directives/dateRangePickerDirective.js")
    ui.includeJavascript("appointmentschedulingui", "services/dateRangePickerEventListener.js")
    ui.includeJavascript("appointmentschedulingui", "factories/ngGridHelper.js")
    ui.includeJavascript("appointmentschedulingui", "resources/appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/patientAppointmentRequestsController.js")
    
    ui.includeCss("appointmentschedulingui", "patientAppointment.css")
    ui.includeCss("appointmentschedulingui", "dateRangePicker.css")
    ui.includeCss("appointmentschedulingui", "gridStyle.css")
    
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.scheduleAppointment.serviceType',
        'appointmentschedulingui.scheduleAppointment.provider',
        'appointmentschedulingui.scheduleAppointment.requestTimeFrame',
        'appointmentschedulingui.scheduleAppointment.actions',
        'appointmentschedulingui.scheduleAppointment.cancelAppointmentRequest.tooltip',
        'appointmentschedulingui.scheduleAppointment.bookAppointment.tooltip',
        'appointmentschedulingui.scheduleAppointment.showNotes.tooltip',
        'appointmentschedulingui.scheduleAppointment.errorCancelingAppointmentRequest',
        'appointmentschedulingui.scheduleAppointment.patient',
        'appointmentschedulingui.timeframeunits.DAYS',
        'appointmentschedulingui.timeframeunits.WEEKS',
        'appointmentschedulingui.timeframeunits.MONTHS',
        'appointmentschedulingui.timeframeunits.YEARS'
].flatten()
]) %>

<script type="text/javascript">
    var jsLocale = '${ angularLocale }';  // used by the ngGrid widget
    if(jsLocale.indexOf('_') > -1){
        jsLocale = jsLocale.substring(0, jsLocale.indexOf('_'));
    }
</script>

<!-- list of patient appointment requests -->
<div id="appointmentscheduling-patientAppointmentRequests"  ng-controller="PatientAppointmentRequestsCtrl" ng-init='init(${ patient?.patient?.uuid ? '"' + patient.patient.uuid + '"' : null }, ${ config.loadOnInit }, ${ config.hideActionButtons }, ${config.enablePagination }, ${ config.canBook })' ng-cloak>

    <!-- TODO: do we want "show scheduled appointment" flag here? -->
    <div>
        <h2>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.patientAppointmentRequests") }
        </h2>
        <table ng-show="showAppointmentRequests">
            <tr style="background-color:#dee1e4;">
                <% if (!patient) { %>
                    <th>${ ui.message("appointmentschedulingui.scheduleAppointment.patient") }</th>
                <% } %>
                <th>${ ui.message("appointmentschedulingui.scheduleAppointment.serviceType") }</th>
                <th>${ ui.message("appointmentschedulingui.scheduleAppointment.provider") }</th>
                <th>${ ui.message("appointmentschedulingui.scheduleAppointment.requestTimeFrame") }</th>
                <th>${ ui.message("appointmentschedulingui.scheduleAppointment.actions") }</th>
            </tr>
            <tr ng-repeat="appt in filteredAppointmentRequests">
                <% if (!patient) { %>
                    <td>{{ appt.patient.person.display }}</td>
                <% } %>
                <td>{{ appt.appointmentType.display }}</td>
                <td>{{ appt.provider.person.display }}</td>
                <td>{{ appt.timeFrame }}</td>
                <td style="white-space:nowrap;">
                    <span><i class="delete-item icon-calendar" ng-click="bookAppointment({ entity: appt })" title="{{ appt.bookAppointmentTooltip }}"></i></span>
                    <span><i class="delete-item icon-file" ng-click="openNotesDialog({ entity: appt })" title="{{ appt.showNotesTooltip }}"></i></span>
                    <span><i class="delete-item icon-remove" ng-click="cancelAppointmentRequest(appt.uuid)" title="{{ appt.cancelRequestTooltip }}"></i></span>
                </td>
            </tr>
        </table>
        <span ng-hide="showAppointmentRequests">
            <p>
                ${ ui.message("appointmentschedulingui.scheduleAppointment.noPatientAppointmentRequests") }
            </p>
        </span>
    </div>

    <div id="confirm-cancel-appointment-request" class="dialog" ng-show="showCancelAppointmentRequest">
        <div class="dialog-header">
            <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointmentRequest.title") }</h3>
        </div>
        <div class="dialog-content">
            <p>
                ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointmentRequest.confirm.text") }
            </p>

            <button class="button confirm right" ng-click="doCancelAppointmentRequest()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointmentRequest.confirm.yes") }</button>
            <button class="button cancel" ng-click="doNotCancelAppointmentRequest()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointmentRequest.confirm.no") }</button>
        </div>
    </div>

    <div id="appointment-request-notes" class="dialog" ng-show="showNotesDialog">
        <div class="dialog-header">
            <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.appointmentRequestNotes") }</h3>
        </div>
        
        <div class="dialog-content" ng-bind="notesDialogContent">
            
        </div>
        <button class="button confirm right" ng-click="closeNotesDialog()"> ${ ui.message("uicommons.close") }</button>
    </div>

</div>
<!-- end of patient appointment requests -->