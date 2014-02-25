<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")

    def angularLocale = context.locale.toString().toLowerCase();

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-2.0.7.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment.min.js")
    ui.includeJavascript("uicommons", "emr.js")
    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "scheduledAppointmentBlocks.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentSchedulingParser.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentHelper.js")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.dailyScheduledAppointments.timeBlock',
        'appointmentschedulingui.dailyScheduledAppointments.provider',
        'appointmentschedulingui.dailyScheduledAppointments.patientName',
        'appointmentschedulingui.scheduleAppointment.errorSavingAppointment',
        'appointmentschedulingui.dailyScheduledAppointments.patientId',
        'appointmentschedulingui.dailyScheduledAppointments.dossierNumber'
].flatten()
]) %>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title") }", link: "${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }" }];
</script>

<div class="container"ng-app="appointmentscheduling.scheduleAppointment"  ng-controller="ScheduledAppointmentBlockController">

    <h1>${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }</h1>
    <div class="appointment-filters">
        <span class="angular-datepicker">
            <input type="text" is-open="datePicker.opened" ng-model="filterDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
            <i class="icon-calendar small add-on" ng-click="datePicker.open(\$event)" ></i>
        </span>
    </div>

    <input id="currentLocationUuid" type="hidden" value="${currentLocationUuid}" />
    <div id="noScheduledAppointmentBlocks" ng-show="showNoScheduledAppointmentBlocks">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.noScheduledAppointmentBlocks") }</div>
    <div id="loadingMessage" ng-show="showLoadingMessage">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.loading") }</div>
    <div class="gridStyle" ng-grid="scheduledAppointmentBlocksGrid" id="scheduledAppointmentBlocksGrid"></div>


</div>

${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#dailyScheduledAppointments",
        options: [
                bFilter: false,
                bJQueryUI: true,
                bLengthChange: false,
                iDisplayLength: 10,
                sPaginationType: '\"full_numbers\"',
                bSort: false,
                sDom: '\'ft<\"fg-toolbar ui-toolbar ui-corner-bl ui-corner-br ui-helper-clearfix datatables-info-and-pg \"ip>\''
        ]
]) }
