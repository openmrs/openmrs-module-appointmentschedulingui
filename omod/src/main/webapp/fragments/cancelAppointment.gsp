
<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "emr.js")

    ui.includeJavascript("appointmentschedulingui", "controllers/cancelAppointmentController.js")

    ui.includeCss("appointmentschedulingui", "cancelAppointment.css")
%>


<div id="confirm-cancel-appointment" ng-controller="CancelAppointmentCtrl" class="dialog" ng-show="appointmentToCancel" ng-cloak>
    <div class="dialog-header">
        <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.title") }</h3>
    </div>
    <div class="dialog-content">
        ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.text") }
        <br/>
        <p class="notes">${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.optionalReason") }:</p>
        <textarea ng-model="appointmentCancelReason" ng-maxlength="1024" id="appointmentCancelReason" class="ng-pristine ng-valid ng-valid-maxlength"> </textarea>
        <br/>
        <br/>
        <button class="button confirm right" ng-click="doCancelAppointment()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.yes") }</button>
        <button class="button cancel" ng-click="doNotCancelAppointment()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.no") }</button>
    </div>
</div>