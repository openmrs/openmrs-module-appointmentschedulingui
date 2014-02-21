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
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' }
    ];
</script>

<div class="schedule-providers" ng-app="appointmentscheduling.scheduleProviders" ng-controller="ScheduleProvidersCtrl">

    <div ng-show="showCalendar">
        <h1>
            ${ ui.message("appointmentschedulingui.scheduleProviders.manageAppointmentBlocks") }
        </h1>

        <table>
            <tr>
                <td>
                    <label>${ ui.message("uicommons.location") }</label>
                    <select ng-model="locationFilter" ng-options="l.display for l in locations" ng-change="refreshCalendarEvents()" />
                </td>
                <td>
                    <label>${ ui.message("uicommons.provider") }</label>
                    <input type="text"
                           ng-model="providerFilter"
                           typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | filter: \$viewValue | limitTo:8"
                           typeahead-on-select="refreshCalendarEvents()">
                </td>
            </tr>
        </table>

        <div ui-calendar="uiConfig.calendar" calendar="calendar" ng-model="appointmentBlocksSource"></div>
    </div>

    <div ng-show="showAppointmentBlockForm">

        <h1 ng-show="!appointmentBlock.uuid">
            ${ ui.message("appointmentschedulingui.scheduleProviders.createAppointmentBlock") }
        </h1>

        <h1 ng-show="appointmentBlock.uuid">
            ${ ui.message("appointmentschedulingui.scheduleProviders.editAppointmentBlock") }
        </h1>

        <table>
            <tr>
                <td>
                    <label>${ ui.message("uicommons.location") }</label>
                    <select ng-model="appointmentBlock.location" ng-options="l.display for l in locations track by l.uuid"/>
                </td>
                <td>
                    <label>${ ui.message("uicommons.provider") }</label>
                    <input type="text" ng-model="appointmentBlock.provider" typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | filter: \$viewValue | limitTo:8" >
                </td>
            </tr>
            <tr>
                <td colspan=2>
                    <label>${ ui.message("uicommons.date") }</label>
                    <span class="angular-datepicker">
                        <input type="text" ng-model="appointmentBlock.startDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <label>${ ui.message("appointmentschedulingui.startTime") }</label>
                    <timepicker ng-model="appointmentBlock.startDate" minute-step="15"/>
                </td>
                <td>
                    <label>${ ui.message("appointmentschedulingui.endTime") }</label>
                    <timepicker ng-model="appointmentBlock.endDate"  minute-step="15"/>

                </td>
            </tr>
            <tr>
                <td>
                    <label>${ ui.message("appointmentschedulingui.appointmenttypes") }</label>
                    <input type="text" ng-model="appointmentType" typeahead-on-select="addAppointmentType()" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >
                </td>
                <td>
                    <div ng-repeat="type in appointmentBlock.types">
                        <a ng-click="removeAppointmentType(type)">{{ type.display }}</a>
                    </div>
                </td>
            </tr>
        </table>

        <button class="cancel" ng-click="showAppointmentBlockForm=false;showCalendar=true;refreshCalendarEvents()"> ${ ui.message("uicommons.cancel") }</button>
        <button class="confirm" ng-click="saveAppointmentBlock()" ng-disabled="!appointmentBlock.location || !appointmentBlock.startDate || !appointmentBlock.endDate || appointmentBlock.types.length == 0">
            ${ ui.message("uicommons.save") }</button>

    </div>

    <div id="delete-appointment-block-modal" class="dialog" style="display:none">
        <div class="dialog-header">
            <h3>${ ui.message("appointmentschedulingui.scheduleProviders.deleteAppointmentBlock") }</h3>
        </div>
        <div class="dialog-content">
            <p>${ ui.message("appointmentschedulingui.scheduleProviders.deleteAppointmentBlockMessage") }
            {{ appointmentBlock.location.display }}, {{ appointmentBlock.provider.person.display }}, {{ appointmentBlock.startDate | date: 'MMM d' }}, {{ appointmentBlock.startDate | date: 'hh:mm a' }} - {{ appointmentBlock.endDate | date: 'hh:mm a' }}?</p>
            <p><span class="button cancel">${ ui.message("uicommons.cancel") }</span> <span class="button confirm"> ${ ui.message("uicommons.delete") }</span></p>
        </div>
    </div>

    <!-- TODO add message codes for edit and delete and save -->

    <div id="tooltip" class="hidden" >
        <p>{{ appointmentBlock.startDate | date: 'MMM d' }}, {{ appointmentBlock.startDate | date: 'hh:mm a' }} - {{ appointmentBlock.endDate | date: 'hh:mm a' }}</p>
        <p>${ ui.message('uicommons.provider') }: {{ appointmentBlock.provider.person.display }}</p>
        <p>${ ui.message('appointmentschedulingui.appointmenttypes') }: <span ng-repeat="type in appointmentBlock.types"> {{ type.display }}{{ !\$last ? ', ' : '' }}</span> </p>
        <p><a class="tooltip-link" ng-click="editAppointmentBlock()">${ ui.message('uicommons.edit')}</a>  <a class="tooltip-link" ng-click="showDeleteAppointmentBlockModal()">${ ui.message('uicommons.delete') }</a></p>
    </div>

</div>