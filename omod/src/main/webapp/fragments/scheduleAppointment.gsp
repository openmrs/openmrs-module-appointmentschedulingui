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
    ui.includeJavascript("appointmentschedulingui", "controllers/scheduleAppointmentController.js")
    ui.includeJavascript("appointmentschedulingui", "controllers/confirmAppointmentController.js")

    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")
    ui.includeCss("appointmentschedulingui", "gridStyle.css")
    ui.includeCss("appointmentschedulingui", "dateRangePicker.css")
%>

<%= ui.includeFragment("appui", "messages", [ codes: [
        'uicommons.location',
        'uicommons.provider',
        'appointmentschedulingui.scheduleAppointment.timeSlot',
        'appointmentschedulingui.scheduleAppointment.appointments',
        'appointmentschedulingui.scheduleAppointment.scheduled',
        'appointmentschedulingui.scheduleAppointment.minutesOverbooked',
        'appointmentschedulingui.scheduleAppointment.minutesAvailable',
        'appointmentschedulingui.scheduleAppointment.invalidSearchParameters'
].flatten()
]) %>


<script type="text/javascript">
    var jsLocale = '${ angularLocale }';  // used by the ngGrid widget
    if(jsLocale.indexOf('_') > -1){
        jsLocale = jsLocale.substring(0, jsLocale.indexOf('_'));
    }
</script>


${ ui.includeFragment("appointmentschedulingui", "timeZoneWarning") }


<div id="appointmentscheduling-scheduleAppointment" class="scheduleAppointment" ng-controller="ScheduleAppointmentCtrl"  ng-init="init(${ patient?.patient?.uuid ? "'" + patient.patient.uuid + "'" : null},  ${ returnUrl ? "'" + ui.encodeHtml(returnUrl) + "'" : null}, '${ locale }' )" ng-cloak>

       <div ng-show="showScheduleAppointment">

           <h2 class="scheduleAppointmentTitle">
               ${ ui.message("appointmentschedulingui.scheduleAppointment.title") } <span ng-show="patientDisplay">: <span ng-bind="patientDisplay"/></span>
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

                   <input type="text" ng-model="appointmentType" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | limitTo:8" >
               </div>

               <div id="viewAllAppointmentTypes" class="inlineBox">
                    <a ng-click="showAllAppointmentTypesModal = true">${ ui.message("appointmentschedulingui.scheduleAppointment.viewAllTypes") }</a>
               </div>

               <daterangepicker
                   senderid="scheduleAppointment"
                   headermessage='${ ui.message("appointmentschedulingui.scheduleAppointment.timeframe") }'
                   startdatemin = "now"
                   clearlinktext = '${ ui.message("appointmentschedulingui.directive.daterangepicker.clear") }'>
               </daterangepicker>

                <% if (canOverbook) { %>
                   <div id="selectIncludeSlotsThatRequireOverbook" class="inlineBox">
                       ${ ui.message("appointmentschedulingui.scheduleAppointment.showFullTimeSlots") } <input type="checkbox" ng-model="includeSlotsThatRequireOverbook"/>
                   </div>
                <% } %>
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

       <div ng-show="showConfirmAppointment" id="confirmAppointment" class="container" ng-controller="ConfirmAppointmentCtrl" ng-init='init(${ canOverbook },  ${ returnUrl ? '"' + ui.encodeHtml(returnUrl) + '"' : null} )'>
            <h2>
                ${ ui.message("appointmentschedulingui.scheduleAppointment.confirmAppointment") }
            </h2>

             <div>
                <p ng-show="patientDisplay"> ${ ui.message("appointmentschedulingui.scheduleAppointment.patient") }:
                    <span class="confirmAppointmentInfo" ng-bind="patientDisplay"/></p>
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
                    ${ ui.message("uicommons.save") }</button>
            </div>
        </div>

       <div id="confirm-overbook-dialog" class="dialog" style="display: none">
            <div class="dialog-header">
                <i class="icon-info-sign"></i>
                <h3>${ ui.message("appointmentschedulingui.scheduleAppointment.confirmOverbook") }</h3>
            </div>
            <div class="dialog-content">
                <p class="dialog-instructions">${ ui.message("appointmentschedulingui.scheduleAppointment.confirmOverbookMessage", '{{ -(selectedTimeSlot.unallocatedMinutes - appointmentType.duration) }}') }</p>
                <button class="confirm right">${ ui.message("uicommons.confirm") }</button>
                <button class="cancel">${ ui.message("uicommons.cancel") }</button>
            </div>
        </div>
</div>



