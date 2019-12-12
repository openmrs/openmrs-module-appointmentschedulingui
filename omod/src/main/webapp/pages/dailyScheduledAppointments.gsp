<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeJavascript("appui", "jquery-3.4.1.min.js")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")

    def angularLocale = context.locale.toString().toLowerCase();

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.13.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-2.0.7.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-locale_ht-custom.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment-with-locales.min.js")
    ui.includeJavascript("uicommons", "emr.js")

    ui.includeJavascript("uicommons", "angular-common.js")
    ui.includeJavascript("uicommons", "services/locationService.js")
    ui.includeJavascript("uicommons", "rest/restUtils.js")

    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui", "app.js")
    ui.includeJavascript("appointmentschedulingui", "resources/appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "services/appointmentService.js")
    ui.includeJavascript("appointmentschedulingui", "factories/ngGridHelper.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/dailyAppointmentsController.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/selectMultipleAppointmentTypesController.js")
    ui.includeJavascript("appointmentschedulingui", "directives/selectMultipleAppointmentTypesDirective.js")
    ui.includeJavascript("appointmentschedulingui", "factories/dailyAppointmentsHelper.js")
    ui.includeCss("appointmentschedulingui", "dailyAppointments.css")
    ui.includeCss("appointmentschedulingui", "selectMultipleAppointmentTypes.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.dailyScheduledAppointments.timeBlock',
        'appointmentschedulingui.dailyScheduledAppointments.provider',
        'appointmentschedulingui.dailyScheduledAppointments.patientName',
        'appointmentschedulingui.dailyScheduledAppointments.patientId',
        'appointmentschedulingui.dailyScheduledAppointments.appointmentType',
        'appointmentschedulingui.dailyScheduledAppointments.allProviders',
        'appointmentschedulingui.dailyScheduledAppointments.appointmentStatus',
        'appointmentschedulingui.dailyScheduledAppointments.allAppointmentStatuses',
        'appointmentschedulingui.dailyScheduledAppointments.noScheduledAppointments',
        'appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks',
        'appointmentschedulingui.dailyScheduledAppointments.allServiceTypes',
        'appointmentscheduling.AppointmentBlock.error.scheduledAppointmentBlocks',
        'appointmentschedulingui.dailyScheduledAppointments.phoneNumber',
        'appointmentschedulingui.scheduleAppointment.status.type.active',
        'appointmentschedulingui.scheduleAppointment.status.type.scheduled',
        'appointmentschedulingui.scheduleAppointment.status.type.cancelled',
        'appointmentschedulingui.scheduleAppointment.status.type.missed',
        'appointmentschedulingui.scheduleAppointment.status.type.completed'
].flatten()
]) %>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.home.title") }",
            link: '${ ui.pageLink("appointmentschedulingui", "home") }' },
        { label: "${ ui.message("appointmentschedulingui.dailyScheduledAppointments.title") }",
            link: "${ ui.pageLink("appointmentschedulingui", "dailyScheduledAppointments") }" }];

    var supportsAppointmentsTagUuid = '${ supportsAppointmentsTagUuid }';
    var sessionLocationUuid = '${ sessionLocationUuid }' ;
    var telephoneAttributeTypeName = '${ telephoneAttributeTypeName}';

    var jsLocale = '${ angularLocale }';  // used by the ngGrid widget
    if(jsLocale.indexOf('_') > -1){
        jsLocale = jsLocale.substring(0, jsLocale.indexOf('_'));
    }
</script>

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div class="container" ng-app="appointmentscheduling.dailyAppointments"  ng-controller="DailyAppointmentsController" ng-cloak>
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
        <div id="filter-appointmentStatusType" class="inline-box">
            <p>${ ui.message("appointmentschedulingui.dailyScheduledAppointments.appointmentStatus") }</p>
            <select ng-model="appointmentStatusTypeFilter" ng-options="appointmentStatusType.value as appointmentStatusType.localizedDisplayName for appointmentStatusType in appointmentStatusTypes" ng-change="newSelectedAppointmentStatusType(appointmentStatusTypeFilter)">
            </select>
        </div>

        <selectmultipleappointmenttypes
            headermessage='${ ui.message("appointmentschedulingui.scheduleAppointment.serviceTypes") }'
            viewall='${ ui.message("appointmentschedulingui.scheduleAppointment.viewAllTypes") }'
            closemessage='${ ui.message("uicommons.close")}'
            senderid = 'viewAppointmentBlock'
            placeholdermessage = '${ ui.message("appointmentschedulingui.scheduleProviders.selectMultiplePlaceholder") }'
            class="inline-box">
        </selectmultipleappointmenttypes>
    </div>
    <div id="noDailyAppointments" ng-show="showNoDailyAppointments" class="inline-box">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.noScheduledAppointments") }</div>
    <div id="loadingMessage" ng-show="showLoadingMessage">${ ui.message("appointmentschedulingui.dailyScheduledAppointments.loading") }</div>
    <div class="gridStyle" ng-grid="dailyAppointmentsGrid" id="dailyAppointmentsGrid"></div>
</div>

