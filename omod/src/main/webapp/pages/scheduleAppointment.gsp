<%
    ui.decorateWith("appui", "standardEmrPage")

    ui.includeJavascript("uicommons", "angular.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ui-bootstrap-tpls-0.6.0.min.js")
    ui.includeJavascript("uicommons", "angular-ui/ng-grid-2.0.7.min.js")
    ui.includeJavascript("uicommons", "angular-resource.min.js")
    ui.includeJavascript("uicommons", "moment.min.js")
    ui.includeJavascript("uicommons", "emr.js")
    ui.includeCss("uicommons", "angular-ui/ng-grid.min.css")

    ui.includeJavascript("appointmentschedulingui", "scheduleAppointment.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")

%>

<%= ui.includeFragment("appui", "messages", [ codes: [
    'uicommons.location',
    'uicomons.provider',
    'appointmentschedulingui.scheduleAppointment.timeSlot',
    'appointmentschedulingui.scheduleAppointment.errorSavingAppointment',
    'appointmentschedulingui.scheduleAppointment.invalidSearchParameters'
].flatten()
]) %>


<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title")}",
            link: '${ui.pageLink("coreapps", "findpatient/findPatient", [ app: 'schedulingAppointmentApp'])}' },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" }
    ];

   // TODO better way to inject this?
    var patientUuid = '${ patient.patient.uuid }';
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<div class="scheduleAppointment" ng-app="appointmentscheduling.scheduleAppointment" ng-controller="ScheduleAppointmentCtrl">

   <div ng-show="showScheduleAppointment">

       <h1>
           ${ ui.message("appointmentschedulingui.scheduleAppointment.title") }
       </h1>

       <div id="searchParameters" />
           <div id="selectAppointmentType">
               <h3>
                   ${ ui.message("appointmentschedulingui.scheduleAppointment.selectAppointmentType") }
               </h3>

               <input type="text" ng-model="appointmentType" typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes(\$viewValue) | filter: \$viewValue | limitTo:8" >

            </div>

           <div id="selectTimeframe">
               <h3>
                   ${ ui.message("appointmentschedulingui.scheduleAppointment.timeframe") }
               </h3>

                <span class="angular-datepicker">
                    <input type="text" ng-model="fromDate" min="now" max="toDate" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                </span>
                <span class="angular-datepicker">
                    <input type="text" ng-model="toDate" min="fromDate || now" show-weeks="false" datepicker-popup="dd-MMMM-yyyy" readonly/>
                </span>
           </div>
       </div>

        <div id="searchButtons">
            <button class="cancel" ng-click="backToPatientSearch()"> ${ ui.message("uicommons.previous") }</button>
            <button class="confirm" ng-click="findAvailableTimeSlots()" ng-disabled="!appointmentType || !appointmentType.uuid || searchButtonDisabled">
                ${ ui.message("uicommons.search") }</button>
        </div>

       <div id="filter">
            ${ ui.message("appointmentschedulingui.scheduleAppointment.filter") } <input type="text" ng-model="filterText" ng-change="updateFilter()"/>
       </div>

        <div class="gridStyle" ng-grid="timeSlotOptions" ng-show="showTimeSlotsGrid"></div>

        <div id="noTimeSlots" ng-show="showNoTimeSlotsMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.noAvailableSlots") }</div>

       <div id="selectAppointment">
            <button class="confirm" ng-click="selectTimeSlot()" ng-show="showTimeSlotsGrid" ng-disabled="timeSlotOptions.selectedItems.length == 0">
                ${ ui.message("uicommons.next") }</button>
       </div>

   </div>

    <div ng-show="showConfirmAppointment" id="confirmAppointment">
        <h1>
            ${ ui.message("appointmentschedulingui.scheduleAppointment.confirmAppointment") }
        </h1>

         <div>
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.date") }: {{ selectedTimeSlot.date }}  <p/>
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.provider") }: {{ selectedTimeSlot.appointmentBlock.provider ? selectedTimeSlot.appointmentBlock.provider.person.display : '' }} <p/>
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.location") }: {{ selectedTimeSlot.appointmentBlock.location.name }} <p/>
            <p>${ ui.message("appointmentschedulingui.scheduleAppointment.additionalNotes") }:</p>
             <textarea ng-model="appointmentReason" ng-maxlength="1024" id="appointmentReason"> </textarea>
         </div>

        <div>
            <button class="cancel" ng-click="cancelConfirmAppointment()" ng-disabled="confirmAppointmentButtonsDisabled">
                ${ ui.message("uicommons.previous") }</button>
            <button class="confirm" ng-click="confirmAppointment()" ng-disabled="confirmAppointmentButtonsDisabled">
                ${ ui.message("uicommons.next") }</button>
        </div>
    </div>

</div>