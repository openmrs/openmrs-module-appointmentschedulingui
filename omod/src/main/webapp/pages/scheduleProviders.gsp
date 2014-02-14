<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "moment.min.js")
    ui.includeJavascript("uicommons", "emr.js")

    ui.includeJavascript("appointmentschedulingui", "providerResource.js")
    ui.includeJavascript("appointmentschedulingui", "providerService.js")
    ui.includeJavascript("appointmentschedulingui", "locationResource.js")
    ui.includeJavascript("appointmentschedulingui", "locationService.js")

    ui.includeJavascript("appointmentschedulingui", "scheduleProviders.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")

    ui.includeJavascript("appointmentschedulingui", "angular-ui-calendar/calendar.js")
    ui.includeJavascript("appointmentschedulingui", "fullcalendar/fullcalendar.min.js")
    ui.includeJavascript("appointmentschedulingui", "fullcalendar/gcal.js")
    ui.includeCss("appointmentschedulingui", "fullcalendar/fullcalendar.css")

%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' }
    ];
</script>

<div class="scheduleProviders" ng-app="appointmentscheduling.scheduleProviders" ng-controller="ScheduleProvidersCtrl">

    <div ng-show="showCalendar">
        <h1>
            ${ ui.message("appointmentschedulingui.scheduleProviders.manageAppointmentBlocks") }
        </h1>


        <div ui-calendar="uiConfig.calendar" ng-model="appointmentBlocksSource"></div>
    </div>


    <div ng-show="showCreateAppointmentBlock">

        <h1>
            ${ ui.message("appointmentschedulingui.scheduleProviders.createAppointmentBlock") }
        </h1>

        <table>
            <tr>
                <td>
                    <label>${ ui.message("uicommons.provider") }</label>
                    <input type="text" ng-model="provider" typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | filter: \$viewValue | limitTo:8" >
                </td>
                <td>
                    <label>${ ui.message("uicommons.location") }</label>
                    <select ng-model="location" ng-options="l.display for l in locations"/>
                </td>
            </tr>
            <tr>
                <td colspan=2>
                    <label>${ ui.message("uicommons.date") }</label>
                    <span class="angular-datepicker">
                        <input type="text" ng-model="date" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <label>${ ui.message("appointmentschedulingui.startTime") }</label>
                    <timepicker ng-model="startTime" minute-step="15"/>
                </td>
                <td>
                    <label>${ ui.message("appointmetnschedulingui.endTime") }</label>
                    <timepicker ng-model="endTime"  minute-step="15"/>

                </td>
            </tr>
            <tr>
                <td>
                    <label>${ ui.message("appointmetnschedulingui.appointmenttypes") }</label>
                    <input type="text" ng-model="appointmentType" typeahead-on-select="addAppointmentType()" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >
                </td>
                <td>
                    <div ng-repeat="type in appointmentTypes">
                        <a ng-click="removeAppointmentType(type)">{{ type.display }}</a>
                    </div>
                </td>
            </tr>
        </table>

        <button class="cancel" ng-click="showCreateAppointmentBlock=false;showCalendar=true"> ${ ui.message("cancel") }</button>
        <button class="confirm" ng-click="saveAppointmentBlock()" ng-disabled="!location || !date || !startTime || !endTime || appointmentTypes.length == 0">
            ${ ui.message("appointmentschedulingui.scheduleProviders.createAppointmentBlock") }</button>

    </div>

</div>