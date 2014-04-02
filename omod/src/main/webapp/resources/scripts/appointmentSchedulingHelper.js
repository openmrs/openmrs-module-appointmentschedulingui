angular.module('appointmentSchedulingHelper')
    .factory('scheduledAppointmentBlocksHelper', function() {
       return {
           setupDatePicker: function(scope) {

               var datePicker = {
                   opened: false,
                   open: function(event) {
                       event.preventDefault();
                       event.stopPropagation();

                       scope.datePicker.opened = true;
                   }
               };
               return datePicker;
           },
           selectLocationToFilter: function(locations) {
               var selectedLocation = null;

               if( sessionLocationUuid){
                   angular.forEach(locations, function(location) {
                       if (location.uuid == sessionLocationUuid) {
                           selectedLocation = location;
                           return selectedLocation;
                       }
                   });
               }

               if(!selectedLocation && locations.length > 0 ){
                   selectedLocation = locations[0];
               }

               return selectedLocation;
           },
           setUpGrid: function(scope){
               var templateCell =
                   '<div ng-repeat=' +
                       '"data in row.getProperty(col.field) track by $index">' +
                       '<div class="ngCellText" >' +
                           '<div class="patientInformation appointmentSummary">' +
                           '<div class="patientName">{{data.name}}</div>' +
                           '<div><small>({{data.serviceType.name}})</small></div>' +
                           '<div ng-if="data.appointmentStatus.message.length > 0">' +
                            '<span ng-if="data.appointmentStatus.type == \'ACTIVE\'" class="status active"></span>' +
                            '<span ng-if="data.appointmentStatus.type == \'MISSED\'" class="status error"></span>' +
                            '<em>{{data.appointmentStatus.message}}</em></div>' +
                           '</div>' +
                           '<div class="patientInformation patientAttribute">' +
                           '<div>{{data.phoneNumber}}</div>' +
                           '<div ng-if="data.phoneNumber.length > 0"><small>' + emr.message("appointmentschedulingui.dailyScheduledAppointments.phoneNumber") + '</small></div>' +
                           '</div>' +
                           '<div class="patientInformation patientAttribute">' +
                           '<div>{{data.primaryIdentifier}}</div>' +
                           '<div><small>' + emr.message("appointmentschedulingui.dailyScheduledAppointments.patientId") + '</small></div>' +
                           '</div>' +
                           '<div class="patientInformation patientAttribute">' +
                           '<div>{{data.dossierNumber}}</div>' +
                           '<div ng-if="data.dossierNumber.length > 0"><small>' + emr.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber") + '</small></div>' +
                           '</div>' +
                       '</div>';

               var scheduledAppointmentBlocksGrid = {
                   data: 'paginatedScheduledAppointmentBlocks',
                   multiSelect: false,
                   enableSorting: false,
                   selectedItems: [],
                   filterOptions: { filterText: '', useExternalFilter: true},
                   columnDefs: [
                       { field: 'date',
                           width: '20%',
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") },
                       { field: 'provider',
                           width: '20%',
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.provider") },
                       { field: 'patients',
                           width: '60%',
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.patientName"),
                           cellTemplate: templateCell }
                   ]
               };
               return scheduledAppointmentBlocksGrid;
           },
           initializeMessages: function(scope){
               scope.showLoadingMessage = true;
               scope.showNoScheduledAppointmentBlocks = false;
           },
           manageMessages: function(scope) {
               scope.showLoadingMessage = false;
               if (scope.totalScheduledAppointmentBlocks.length == 0) {
                   scope.showNoScheduledAppointmentBlocks = true;
               } else {
                   scope.showNoScheduledAppointmentBlocks = false;
               }
           },
           findProvidersFromGrid: function(scope) {
               angular.forEach(scope.scheduledAppointmentBlocks, function(block) {
                   var index = scope.providers.indexOf(block.provider);
                   if(index == -1)
                       scope.providers.push(block.provider);
               });
           },

           findServiceTypesFromGrid:  function (scope) {
               var serviceTypesScheduled = {};

               angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
                   angular.forEach(scheduledAppointmentBlock.patients, function (scheduledPatient){
                       scope.services.push(scheduledPatient.serviceType);
                   });
               });

               var removeDuplicatedServicesFound = function (services) {
                   var servicesObject = {};
                   var i;

                   for(i = 0; i<services.length; i ++) servicesObject[services[i].uuid] = services[i];
                   var uniqueServices = [];

                   for(service in servicesObject)  uniqueServices.push(servicesObject[service]);
                   return uniqueServices;
               }
               scope.services = removeDuplicatedServicesFound(scope.services);
           },

           findAppointmentBlockFromGrid: function (scope) {
                angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
                    var index = scope.appointmentBlocks.indexOf(scheduledAppointmentBlock.date);
                    if(index == -1)
                        scope.appointmentBlocks.push(scheduledAppointmentBlock.date);
            })
            }
        }
    });









