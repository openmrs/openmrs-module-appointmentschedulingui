<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/calendar.js")

    ui.includeJavascript("uicommons", "fullcalendar/fullcalendar.min.js")
    ui.includeJavascript("uicommons", "fullcalendar/gcal.js")
    ui.includeCss("uicommons", "fullcalendar/fullcalendar.css")
    ui.includeJavascript("uicommons", "moment.min.js")

    ui.includeJavascript("uicommons", "emr.js")
    ui.includeJavascript("uicommons", "services/providerService.js")
    ui.includeJavascript("uicommons", "services/locationService.js")

    ui.includeJavascript("appointmentschedulingui", "scheduleProviders.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")

    ui.includeJavascript("appointmentschedulingui", "qtip/jquery.qtip.min.js")
    ui.includeCss("appointmentschedulingui", "qtip/jquery.qtip.min.css")

    ui.includeCss("appointmentschedulingui", "scheduleProviders.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.scheduleProviders.errorSavingAppointmentBlock',
        'appointmentschedulingui.scheduleProviders.errorDeletingAppointmentBlock',
        'uicommons.location',
        'uicommons.provider'
].flatten()
]) %>


<script type="text/javascript">
    // TODO: configure breadcrumbs to be dynamic as we may not always like back to system administration section

    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("emr.app.systemAdministration.label")}", link: '${ui.pageLink("emr", "systemAdministration")}' },
        { label: "${ ui.message("appointmentschedulingui.scheduleProviders.manageAppointmentBlocks")}" }
    ];

    var supportsAppointmentsTagUuid = '${ supportsAppointmentsTagUuid }';
    var sessionLocationUuid = '${ sessionLocationUuid }'

</script>

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div class="schedule-providers" ng-app="appointmentscheduling.scheduleProviders" ng-controller="ScheduleProvidersCtrl">

    <div ng-show="showCalendar">
        <h1>
            ${ ui.message("appointmentschedulingui.scheduleProviders.manageAppointmentBlocks") }
        </h1>

        <div id="filter-parameters">
            <div id="filter-location" class="inline-box">
                <p>${ ui.message("uicommons.location") }</p>
                <select ng-model="locationFilter" ng-options="l.display for l in locations" ng-change="refreshCalendarEvents()">
                </select>
            </div>

            <div id="filter-provider" class="inline-box">
                <p>${ ui.message("uicommons.provider") }</p>
                <input type="text"
                       ng-model="providerFilter"
                       typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | filter: \$viewValue | limitTo:8"
                       typeahead-on-select="refreshCalendarEvents()">
            </div>
        </div>

        <div id="calendar" ui-calendar="uiConfig.calendar" calendar="calendar" ng-model="appointmentBlocksSource"></div>
    </div>

    <div id="appointment-block-form" ng-show="showAppointmentBlockForm">

        <div id="appointment-block-form-header">
            <h1 ng-show="!appointmentBlock.uuid">
                ${ ui.message("appointmentschedulingui.scheduleProviders.createAppointmentBlock") }
            </h1>

            <h1 ng-show="appointmentBlock.uuid">
                ${ ui.message("appointmentschedulingui.scheduleProviders.editAppointmentBlock") }
            </h1>
         </div>

        <div id="appointment-block-form-provider-and-location-and-date">
            <div id="select-location" class="inline-box">
                <p>${ ui.message("uicommons.location") }</p>
                <select ng-model="appointmentBlock.location" ng-options="l.display for l in locations track by l.uuid">
                </select>
            </div>

            <div id="select-provider" class="inline-box">
                <p>${ ui.message("uicommons.provider") }</p>
                <input type="text" ng-model="appointmentBlock.provider" typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | filter: \$viewValue | limitTo:8" >
            </div>

            <div id="select-date" class="inline-box">
                <p>${ ui.message("uicommons.date") }</p>
                <span class="angular-datepicker">
                    <input type="text" ng-model="appointmentBlock.startDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                </span>
            </div>
        </div>

        <div id="appointment-block-form-time">
            <div id="start-time" class="inline-box">
                <p>${ ui.message("appointmentschedulingui.startTime") }</p>
                <timepicker ng-model="appointmentBlock.startDate" minute-step="15" ng-change="validateStartTime()"/>
            </div>

            <div id="end-time" class="inline-box">
                <p>${ ui.message("appointmentschedulingui.endTime") }</p>
                <timepicker ng-model="appointmentBlock.endDate"  minute-step="15" ng-change="validateEndTime()"/>
            </div>
        </div>

        <div id="appointment-block-form-appointment-types">
            <div id="select-appointment-types-typeahead">
                <p>${ ui.message("appointmentschedulingui.appointmenttypes") }</p>
                <input type="text" ng-model="appointmentType" typeahead-on-select="addAppointmentType()" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >
            </div>
            <div id="select-appointment-types-list" ng-repeat="type in appointmentBlock.types">
                <a ng-click="removeAppointmentType(type)">{{ type.display }}</a>
            </div>
        </div>

        <div id="appointment-block-form-buttons">
            <button class="cancel" ng-click="showAppointmentBlockForm=false;showCalendar=true;refreshCalendarEvents()"> ${ ui.message("uicommons.cancel") }</button>
            <button class="confirm" ng-click="saveAppointmentBlock()" ng-disabled="!appointmentBlock.location || !appointmentBlock.startDate || !appointmentBlock.endDate || appointmentBlock.types.length == 0">
            ${ ui.message("uicommons.save") }</button>
        </div>

    </div>

    <div id="delete-appointment-block-modal" class="dialog" style="display:none">
        <div class="dialog-header">
            <h3>${ ui.message("appointmentschedulingui.scheduleProviders.deleteAppointmentBlock") }</h3>
        </div>
        <div class="dialog-content">
            <p>${ ui.message("appointmentschedulingui.scheduleProviders.deleteAppointmentBlockMessage") }</p>
            <p id="delete-appointment-block-modal-buttons"><span class="button cancel">${ ui.message("uicommons.cancel") }</span> <span class="button confirm"> ${ ui.message("uicommons.delete") }</span></p>
        </div>
    </div>

    <div id="tooltip" class="hidden" >
        <p>{{ appointmentBlock.startDate | date: 'MMM d' }}, {{ appointmentBlock.startDate | date: 'hh:mm a' }} - {{ appointmentBlock.endDate | date: 'hh:mm a' }}</p>
        <p>${ ui.message('uicommons.provider') }: {{ appointmentBlock.provider.person.display }}</p>
        <p>${ ui.message('appointmentschedulingui.appointmenttypes') }: <span ng-repeat="type in appointmentBlock.types"> {{ type.display }}{{ !\$last ? ', ' : '' }}</span> </p>
        <p><a class="tooltip-link" ng-click="editAppointmentBlock()">${ ui.message('uicommons.edit')}</a>  <a class="tooltip-link" ng-click="showDeleteAppointmentBlockModal()">${ ui.message('uicommons.delete') }</a></p>
    </div>

</div>