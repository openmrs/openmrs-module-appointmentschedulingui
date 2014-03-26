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
    ui.includeJavascript("uicommons", "services/locationService.js")
    ui.includeJavascript("uicommons", "rest/restUtils.js")
    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui", "app.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "services/ngGridPagination.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/scheduledAppointmentBlocksController.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentSchedulingParser.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentSchedulingHelper.js")
    ui.includeCss("appointmentschedulingui", "scheduledAppointmentBlock.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.dailyScheduledAppointments.timeBlock',
        'appointmentschedulingui.dailyScheduledAppointments.provider',
        'appointmentschedulingui.dailyScheduledAppointments.patientName',
        'appointmentschedulingui.scheduleAppointment.errorSavingAppointment',
        'appointmentschedulingui.dailyScheduledAppointments.patientId',
        'appointmentschedulingui.dailyScheduledAppointments.dossierNumber',
        'appointmentschedulingui.dailyScheduledAppointments.allProviders',
        'appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks',
        'appointmentschedulingui.dailyScheduledAppointments.allServiceTypes',
        'appointmentscheduling.AppointmentBlock.error.scheduledAppointmentBlocks'
].flatten()
]) %>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }", link: "${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }" }];

    var supportsAppointmentsTagUuid = '${ supportsAppointmentsTagUuid }';
    var sessionLocationUuid = '${ sessionLocationUuid }' ;
    var telephoneAttributeTypeName = '${ telephoneAttributeTypeName}';
</script>

<div class="container"ng-app="appointmentscheduling.scheduledAppointmentBlocks"  ng-controller="ScheduledAppointmentBlockController">
    <h1>${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }</h1>
    <div id="filter-date" class="inline-box">
        <p>${ ui.message("appointmentschedulingui.scheduleAppointment.date")}</p>
        <span class="angular-datepicker" >
            <input type="text" is-open="datePicker.opened" ng-model="filterDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
            <i class="icon-calendar small add-on" ng-click="datePicker.open(\$event)" ></i>
        </span>
    </div>

    <div id="filter-location" class="inline-box">
        <p>${ ui.message("uicommons.location") }</p>
        <select ng-model="locationFilter" ng-options="l.display for l in locations">
        </select>
    </div>
    <div class="appointment-filter">
        <div id="filter-provider" class="inline-box">
            <p>${ ui.message("uicommons.provider") }</p>
            <select ng-model="providerFilter" ng-options="provider for provider in providers" ng-change="newSelectedProvider(providerFilter)">
            </select>
        </div>
        <div id="filter-serviceType" class="inline-box">
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.serviceTypes") }</p>
                <select ng-model="serviceFilter" ng-options="service.name for service in services">
            </select>
        </div>
        <div id="filter-appointmentBlock" class="inline-box">
            <p>${ ui.message("appointmentschedulingui.dailyScheduledAppointments.appointmentBlock") }</p>
            <select ng-model="appointmentBlockFilter" ng-options="apppointmentBlock for apppointmentBlock in appointmentBlocks" ng-change="newSelectedAppointmentBlock(appointmentBlockFilter)">
            </select>
        </div>
    </div>
    <div id="noScheduledAppointmentBlocks" ng-show="showNoScheduledAppointmentBlocks" class="inline-box">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.noScheduledAppointmentBlocks") }</div>
    <div id="loadingMessage" ng-show="showLoadingMessage">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.loading") }</div>
    <div class="gridStyle" ng-grid="scheduledAppointmentBlocksGrid" id="scheduledAppointmentBlocksGrid"></div>
</div>

