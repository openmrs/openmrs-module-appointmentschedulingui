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
           setUpGrid: function(){
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
                           cellTemplate: '../ms/uiframework/resource/appointmentschedulingui/partials/patientAppointmentInformation.html' }
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
               if (scope.scheduledAppointmentBlocks.length == 0) {
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
           findAppointmentBlockFromGrid: function (scope) {
                angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
                    var index = scope.appointmentBlocks.indexOf(scheduledAppointmentBlock.date);
                    if(index == -1)
                        scope.appointmentBlocks.push(scheduledAppointmentBlock.date);
            })
            }
        }
    });









