<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.13.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/calendar.js")

    ui.includeJavascript("uicommons", "fullcalendar/fullcalendar.min.js")
    ui.includeJavascript("uicommons", "fullcalendar/gcal.js")
    ui.includeCss("uicommons", "fullcalendar/fullcalendar.css")
    ui.includeJavascript("uicommons", "moment-with-locales.min.js")

    ui.includeJavascript("uicommons", "emr.js")

    ui.includeJavascript("uicommons", "angular-common.js")
    ui.includeJavascript("uicommons", "services/providerService.js")
    ui.includeJavascript("uicommons", "services/locationService.js")
    ui.includeJavascript("uicommons", "rest/restUtils.js")

    ui.includeJavascript("appointmentschedulingui", "app.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/selectMultipleAppointmentTypesController.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/scheduleProvidersController.js")
    ui.includeJavascript("appointmentschedulingui", "directives/selectMultipleAppointmentTypesDirective.js")

    ui.includeJavascript("appointmentschedulingui", "resources/appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "services/appointmentService.js")

    ui.includeJavascript("appointmentschedulingui", "qtip/jquery.qtip.min.js")
    ui.includeCss("appointmentschedulingui", "qtip/jquery.qtip.min.css")
    ui.includeJavascript("appui", "jquery-3.4.1.min.js")


    ui.includeCss("appointmentschedulingui", "scheduleProviders.css")
    ui.includeCss("appointmentschedulingui", "selectMultipleAppointmentTypes.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'appointmentschedulingui.scheduleProviders.errorSavingAppointmentBlock',
        'appointmentschedulingui.scheduleProviders.errorDeletingAppointmentBlock',
        'uicommons.location',
        'uicommons.provider',
        'appointmentschedulingui.scheduleProviders.startTimeMustBeBeforeEndTime',
        'appointmentschedulingui.calendar.month',
        'appointmentschedulingui.calendar.basicDay',
        'appointmentschedulingui.calendar.basicWeek',
        'appointmentschedulingui.calendar.today'
].flatten()
]) %>

<script type="text/javascript">
var includeWeekends = ('${includeWeekends}' === "true");
</script>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.home.title") }",
            link: '${ ui.pageLink("appointmentschedulingui", "home") }' },
        { label: "${ ui.message("appointmentschedulingui.scheduleProviders.manageAppointmentBlocks")}" }
    ];

    var supportsAppointmentsTagUuid = '${ supportsAppointmentsTagUuid }';
    var sessionLocationUuid = '${ sessionLocationUuid }'

</script>

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div class="schedule-providers" ng-app="appointmentscheduling.scheduleProviders" ng-controller="ScheduleProvidersCtrl" ng-cloak>

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
                       typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | limitTo:8"
                       typeahead-on-select="refreshCalendarEvents()">
                <i class="icon-remove small add-on" ng-click="providerFilter=''" ></i>
            </div>

            <selectmultipleappointmenttypes headermessage='${ ui.message("appointmentschedulingui.appointmenttypes") }'
                viewall='${ ui.message("appointmentschedulingui.scheduleAppointment.viewAllTypes") }'
                closemessage='${ ui.message("uicommons.close")}'
                senderid = 'viewAppointmentBlock'
                placeholdermessage = '${ ui.message("appointmentschedulingui.scheduleProviders.selectMultiplePlaceholder") }'
                class="inline-box"></selectmultipleappointmenttypes>
        </div>
        <div class= "row">
        <div  class="col-12 col-sm-12 col-md-12 col-lg-12" id="calendar" ui-calendar="uiConfig.calendar" calendar="calendar" ng-model="appointmentBlocksSource"></div>
        </div>
    </div>

    <div id="appointment-block-form" ng-show="showAppointmentBlockForm">

        <div id="appointment-block-form-error" class="note-container" ng-repeat="message in appointmentBlockFormErrorMessages">
            <div class="note error">
                <div class="text">
                    <i class="icon-remove medium"></i>
                   {{ message }}
                </div>
            </div>
        </div>

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
                <select ng-change="updateSaveButton()" ng-model="appointmentBlock.location" ng-options="l.display for l in locations track by l.uuid">
                </select>
            </div>

            <div id="select-provider" class="inline-box">
                <p>${ ui.message("uicommons.provider") }</p>
                <input type="text"  ng-change="updateSaveButton()" ng-model="appointmentBlock.provider" typeahead="provider as provider.person.display for provider in getProviders(\$viewValue) | limitTo:8" >
            </div>

            <div id="select-date" class="inline-box">
                <p>${ ui.message("uicommons.date") }</p>
                <span class="angular-datepicker">
                    <input ng-change="updateSaveButton()" type="text" ng-model="appointmentBlock.startDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                </span>
            </div>
        </div>

        <div id="appointment-block-form-time">
            <div id="start-time" class="inline-box">
                <p>${ ui.message("appointmentschedulingui.startTime") }</p>
                <timepicker ng-change="updateSaveButton()" ng-model="appointmentBlock.startDate" minute-step="15" />
            </div>

            <div id="end-time" class="inline-box">
                <p>${ ui.message("appointmentschedulingui.endTime") }</p>
                <timepicker ng-change="updateSaveButton()" ng-model="appointmentBlock.endDate"  minute-step="15" />
            </div>
        </div>

        <selectmultipleappointmenttypes headermessage='${ ui.message("appointmentschedulingui.appointmenttypes") }'
                                        viewall='${ ui.message("appointmentschedulingui.scheduleAppointment.viewAllTypes") }'
                                        closemessage='${ ui.message("uicommons.close")}'
                                        senderid = 'createAppointmentBlock'
                                        placeholdermessage = '${ ui.message("appointmentschedulingui.scheduleProviders.selectMultiplePlaceholder") }'
                                        class="inline-box"></selectmultipleappointmenttypes>

        <div id="appointment-block-form-buttons">
            <button class="cancel" ng-click="showAppointmentBlockForm=false;showCalendar=true;refreshCalendarEvents()"> ${ ui.message("uicommons.cancel") }</button>
            <button class="confirm" ng-click="saveAppointmentBlock()" ng-disabled="disableSaveButton || !appointmentBlock.location || !appointmentBlock.startDate || !appointmentBlock.endDate || appointmentBlock.types.length == 0">
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
        <p><a class="tooltip-link" ng-click="editAppointmentBlock(appointmentBlock.types)">${ ui.message('uicommons.edit')}</a>  <a class="tooltip-link" ng-click="showDeleteAppointmentBlockModal()">${ ui.message('uicommons.delete') }</a></p>
    </div>

</div>