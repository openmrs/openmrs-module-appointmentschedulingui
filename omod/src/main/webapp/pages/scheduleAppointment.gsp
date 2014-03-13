<%
    def angularLocale = context.locale.toString().toLowerCase();

    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "i18n/angular-locale_" + angularLocale + ".js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-2.0.7.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment.min.js")
    ui.includeJavascript("uicommons", "emr.js")
    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui","app.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")

    ui.includeJavascript("appointmentschedulingui", "controllers/timeframePickerController.js")
    ui.includeJavascript("appointmentschedulingui", "directives/timeframePickerDirective.js")
    ui.includeJavascript("appointmentschedulingui", "services/timeframePickerEventListener.js")
    ui.includeJavascript("appointmentschedulingui", "services/ngGridPagination.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "scheduleAppointment.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/cancelAppointmentController.js")

    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")
    ui.includeCss("appointmentschedulingui", "manageAppointments.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
    'uicommons.location',
    'uicommons.provider',
    'appointmentschedulingui.scheduleAppointment.timeSlot',
    'appointmentschedulingui.scheduleAppointment.errorSavingAppointment',
    'appointmentschedulingui.scheduleAppointment.invalidSearchParameters',
    'appointmentschedulingui.scheduleAppointment.scheduled',
    'appointmentschedulingui.scheduleAppointment.minutesAvailable',
    'appointmentschedulingui.scheduleAppointment.appointments',
    'appointmentschedulingui.scheduleAppointment.errorCancelingAppointment'
].flatten()
]) %>


<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.buttonTitle")}",
            link: '${ui.pageLink("coreapps", "findpatient/findPatient", [ app: 'appointmentschedulingui.schedulingAppointmentApp'])}' },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" }
    ];

   // TODO better way to inject this?
    var patientUuid = '${ patient.patient.uuid }';
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<%= ui.includeFragment("appointmentschedulingui", "timeZoneWarning") %>

<div class="scheduleAppointment" ng-app="appointmentscheduling.scheduleAppointment" ng-controller="ScheduleAppointmentCtrl">

    <div ng-controller='CancelAppointmentCtrl'>
        <div ng-show="showScheduleAppointment">
            <h2> ${ ui.message("appointmentschedulingui.scheduleAppointment.upcomingAppointments") } </h2>

            <% if ( (upcomingAppointmentList == null)
                   || (upcomingAppointmentList!= null && upcomingAppointmentList.size() == 0)) { %>
                ${ ui.message("appointmentschedulingui.scheduleAppointment.noAppointments") }
            <% } else {%>
                <table id="scheduledAppointmentTable" empty-value-message='${ ui.message("uicommons.dataTable.emptyTable") }'>
                    <thead>
                        <tr>
                            <th style="width: 30%">${ ui.message("appointmentschedulingui.scheduleAppointment.date") }</th>
                            <th style="width: 30%">${ ui.message("appointmentschedulingui.appointmenttype.title") }</th>
                            <th style="width: 15%">${ ui.message("appointmentschedulingui.scheduleAppointment.provider") }</th>
                            <th style="width: 15%">${ ui.message("appointmentschedulingui.scheduleAppointment.location") }</th>
                            <th style="width: 10%">${ ui.message("appointmentschedulingui.appointmenttype.actions") }</th>
                        </tr>
                    </thead>
                    <tbody>
                        <% upcomingAppointmentList.each { appointment -> %>
                            <tr>
                                <td>${ ui.format(appointment.timeSlot.startDate.format('dd MMM yyyy'))}
                                    | ${ ui.format(appointment.timeSlot.startDate.format('h:mm a'))} -
                                    ${ ui.format(appointment.timeSlot.endDate.format('h:mm a')) }</td>
                                <td>${ ui.format(appointment.appointmentType) }</td>
                                <td>${ ui.format(appointment.timeSlot.appointmentBlock.provider?.name ?: '')}</td>
                                <td>${ ui.format(appointment.timeSlot.appointmentBlock.location.name)}</td>
                                <td class="align-center">
                                    <span>
                                        <i class="delete-item icon-remove" ng-click="confirmCancelAppointment('${ appointment.uuid }')"
                                           title="${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.tooltip") }"></i>
                                    </span>
                                </td>
                            </tr>
                        <% } %>
                    </tbody>
                </table>
           <% } %>
       </div>

        <div id="confirm-cancel-appointment" class="dialog" ng-show="appointmentToCancel">
            <div class="dialog-header">
                <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.title") }</h3>
            </div>
            <div class="dialog-content">
                ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.text") }
                <br/>
                <br/>
                <button class="button confirm right" ng-click="doCancelAppointment()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.yes") }</button>
                <button class="button cancel" ng-click="doNotCancelAppointment()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.cancelAppointment.confirm.no") }</button>
            </div>
       </div>
    </div>

   <div ng-show="showScheduleAppointment">

       <h2 class="scheduleAppointmentTitle">
           ${ ui.message("appointmentschedulingui.scheduleAppointment.title") }
       </h2>

       <!-- modal for showing full list of appointment types -->
       <div id="allAppointmentTypesModal" class="dialog" ng-show="showAllAppointmentTypesModal">
           <div class="dialog-header">
               <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.serviceTypes") }</h3>
           </div>
           <div class="dialog-content">
               <div ng-repeat="type in allAppointmentTypes">
                   <a ng-click="selectAppointmentType(type)">{{ type.display }}</a>
               </div>
               <br/>
               <span class="button confirm" ng-click="showAllAppointmentTypesModal = false"> ${ ui.message("uicommons.close") }</span>
           </div>
       </div>

       <div id="searchParameters">
           <div id="selectAppointmentType"  class="inlineBox">
               <p> ${ ui.message("appointmentschedulingui.scheduleAppointment.selectAppointmentType") }</p>

               <input type="text" ng-model="appointmentType" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >
           </div>

           <div id="viewAllAppointmentTypes" class="inlineBox">
                <a ng-click="showAllAppointmentTypesModal = true">${ ui.message("appointmentschedulingui.scheduleAppointment.viewAllTypes") }</a>
           </div>

           <timeframepicker headermessage='${ ui.message("appointmentschedulingui.scheduleAppointment.timeframe") }'></timeframepicker>
       </div>

        <div id="searchButtons">
            <button class="cancel" ng-click="backToPatientSearch()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.back") }</button>
            <button class="confirm" ng-click="findAvailableTimeSlots()" ng-disabled="!appointmentType || !appointmentType.uuid || searchButtonDisabled">
                ${ ui.message("uicommons.search") }</button>
        </div>

       <div id="filter" ng-show="showTimeSlotsGrid">
            ${ ui.message("appointmentschedulingui.scheduleAppointment.filter") } <input type="text" ng-model="filterText" ng-change="updateFilter()"/>
       </div>

       <div id="noTimeSlots" ng-show="showNoTimeSlotsMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.noAvailableSlots") }</div>
       <div id="loadingMessage" ng-show="showLoadingMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.loading") }</div>

       <table id="appointmentTable" class="gridStyle" ng-grid="timeSlotOptions" ng-show="showTimeSlotsGrid"></table>

    <div id="selectAppointment">
            <button class="confirm" ng-click="selectTimeSlot()" ng-show="showTimeSlotsGrid" ng-disabled="timeSlotOptions.selectedItems.length == 0">
                ${ ui.message("uicommons.next") }</button>
       </div>

   </div>

   <div ng-show="showConfirmAppointment" id="confirmAppointment" class="container">
        <h2>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.confirmAppointment") }
        </h2>

         <div>
            <p> ${ ui.message("appointmentschedulingui.scheduleAppointment.date") }:
                <span class="confirmAppointmentInfo">{{ selectedTimeSlot.dateFormatted }}, {{ selectedTimeSlot.startTimeFormatted }} - {{ selectedTimeSlot.endTimeFormatted }} </span> <p/>
            <p> ${ ui.message("appointmentschedulingui.scheduleAppointment.provider") }:
                <span class="confirmAppointmentInfo">{{ selectedTimeSlot.appointmentBlock.provider ? selectedTimeSlot.appointmentBlock.provider.person.display : '' }}</span> <p/>
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.location") }:
                <span class="confirmAppointmentInfo">{{ selectedTimeSlot.appointmentBlock.location.display }} </span> <p/>
            <p class="notes">${ ui.message("appointmentschedulingui.scheduleAppointment.additionalNotes") }:</p>
             <textarea ng-model="appointmentReason" ng-maxlength="1024" id="appointmentReason"> </textarea>
         </div>

        <div>
            <button class="cancel" ng-click="cancelConfirmAppointment()" ng-disabled="confirmAppointmentButtonsDisabled">
                ${ ui.message("appointmentschedulingui.scheduleAppointment.back") }</button>
            <button class="confirm right" ng-click="confirmAppointment()" ng-disabled="confirmAppointmentButtonsDisabled">
                ${ ui.message("uicommons.next") }</button>
        </div>
    </div>

</div>

${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#scheduledAppointmentTable",
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
