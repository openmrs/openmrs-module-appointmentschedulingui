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

    ui.includeJavascript("appointmentschedulingui", "scheduleAppointment.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentResources.js")
    ui.includeJavascript("appointmentschedulingui", "appointmentService.js")
    ui.includeCss("appointmentschedulingui", "scheduleAppointment.css")

%>

<%= ui.includeFragment("appui", "messages", [ codes: [
    'uicommons.location',
    'uicommons.provider',
    'appointmentschedulingui.scheduleAppointment.timeSlot',
    'appointmentschedulingui.scheduleAppointment.errorSavingAppointment',
    'appointmentschedulingui.scheduleAppointment.invalidSearchParameters'
].flatten()
]) %>


<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title")}",
            link: '${ui.pageLink("coreapps", "findpatient/findPatient", [ app: 'appointmentschedulingui.schedulingAppointmentApp'])}' },
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

           <div id="selectTimeframe" class="inlineBox">
               <p> ${ ui.message("appointmentschedulingui.scheduleAppointment.timeframe") } </p>

               ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                       id: "appointmentStartDate",
                       formFieldName: "appointmentStartDate",
                       label:"",
                       useTime: false
               ])}

               ${ ui.includeFragment("uicommons", "field/datetimepicker", [
                       id: "appointmentEndDate",
                       formFieldName: "appointmentEndDate",
                       label: "",
                       useTime: false
               ])}
           </div>
       </div>

        <div id="searchButtons">
            <button class="cancel" ng-click="backToPatientSearch()"> ${ ui.message("appointmentschedulingui.scheduleAppointment.back") }</button>
            <button class="confirm" ng-click="findAvailableTimeSlots()" ng-disabled="!appointmentType || !appointmentType.uuid || searchButtonDisabled">
                ${ ui.message("uicommons.search") }</button>
        </div>

       <div id="filter">
            ${ ui.message("appointmentschedulingui.scheduleAppointment.filter") } <input type="text" ng-model="filterText" ng-change="updateFilter()"/>
       </div>

        <div class="gridStyle" ng-grid="timeSlotOptions" ng-show="showTimeSlotsGrid"></div>

        <div id="noTimeSlots" ng-show="showNoTimeSlotsMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.noAvailableSlots") }</div>
        <div id="loadingMessage" ng-show="showLoadingMessage">${ ui.message("appointmentschedulingui.scheduleAppointment.loading") }</div>


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
                ${ ui.message("appointmentschedulingui.scheduleAppointment.back") }</button>
            <button class="confirm" ng-click="confirmAppointment()" ng-disabled="confirmAppointmentButtonsDisabled">
                ${ ui.message("uicommons.next") }</button>
        </div>
    </div>

</div>