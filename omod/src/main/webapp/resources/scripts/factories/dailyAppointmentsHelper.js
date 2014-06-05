angular.module('dailyAppointmentsHelper')
    .factory('dailyAppointmentsHelper', function() {
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
               var dailyAppointmentsGrid = {
                   data: 'paginatedScheduledAppointments',
                   multiSelect: false,
                   enableSorting: true,
                   enableColumnResize: true,
                   selectedItems: [],
                   i18n: jsLocale,
                   filterOptions: { filterText: '', useExternalFilter: true},
                   columnDefs: [

                       { field: 'patientName',
                           width: '20%',
                           cellTemplate: "<div>{{ row.getProperty(\'patientName\') }}</div>",  // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.patientName") },

                       { field: 'identifier',
                           width: '10%',
                           cellTemplate: "<div>{{ row.getProperty(\'identifier\') }}</div>", // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName:emr.message("appointmentschedulingui.dailyScheduledAppointments.patientId") },

                       { field: 'startDatetime',
                           width: '10%',
                           cellTemplate: "<div>{{ row.getProperty(\'startTimeFormatted\') }} - {{ row.getProperty(\'endTimeFormatted\') }}<div>",
                           displayName:emr.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") },

                       { field: 'provider',
                           width: '20%',
                           cellTemplate: "<div>{{ row.getProperty(\'provider\') }}</div>",  // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.provider") },

                       { field: 'appointmentType',
                           width: '20%',
                           cellTemplate: "<div>{{ row.getProperty(\'appointmentType\') }}</div>",  // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.appointmentType") },

                       { field: 'telephoneNumber',
                           width: '10%',
                           cellTemplate: "<div>{{ row.getProperty(\'telephoneNumber\') }}</div>", // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName:emr.message("appointmentschedulingui.dailyScheduledAppointments.phoneNumber") },

                       { field: 'localizedStatusType',
                           width: '10%',
                           cellTemplate: "<div>{{ row.getProperty(\'localizedStatusType\') }}</div>", // putting it in div causes it to wrap if it extends past column, which is what we want
                           displayName:emr.message("appointmentschedulingui.dailyScheduledAppointments.appointmentStatus") }

                            ]
               };
               return dailyAppointmentsGrid;
           },
           initializeMessages: function(scope){
               scope.showLoadingMessage = true;
               scope.showNoDailyAppointments = false;
           },
           manageMessages: function(scope) {
               scope.showLoadingMessage = false;
               if (scope.dailyAppointments.length == 0) {
                   scope.showNoDailyAppointments = true;
               } else {
                   scope.showNoDailyAppointments = false;
               }
           },
           findProvidersFromGrid: function(scope) {
               angular.forEach(scope.dailyAppointments, function(appointment) {
                   var index = scope.providers.indexOf(appointment.provider);
                   if(index == -1)
                       scope.providers.push(appointment.provider);
               });
           },

           filterByAppointmentStatusType: function(appointmentsToFilter, appointmentStatusType){

               if (appointmentStatusType && appointmentStatusType.length > 0 ) {
                   appointmentsToFilter = appointmentsToFilter.filter(function(appointment) {
                       return appointment.statusType == appointmentStatusType;
                   });
               }
               return appointmentsToFilter;
           },

           filterByProvider: function(appointmentsToFilter, provider) {

                if (provider && provider.length > 0 ) {
                    appointmentsToFilter = appointmentsToFilter.filter(function(appointment) {
                        return appointment.provider == provider;
                    });
                }
                return appointmentsToFilter;

           },

           filterByAppointmentType: function(appointmentsToFilter, appointmentTypesUuidList) {

               if (appointmentTypesUuidList && appointmentTypesUuidList.length > 0 ) {
                   appointmentsToFilter = appointmentsToFilter.filter(function(appointment) {
                       return appointmentTypesUuidList.indexOf(appointment.appointmentTypeUuid) != -1;
                   });
               }
               return appointmentsToFilter;
           },

           getUuidsListFromAppointmentTypesList: function (appointmentTypesList) {
               var appointmentTypeUuidsList = [];
               if (appointmentTypesList && appointmentTypesList.length > 0) {
                   for (var index = 0; index < appointmentTypesList.length; index++) {
                       appointmentTypeUuidsList.push(appointmentTypesList[index].uuid);
                   }
               }
               return appointmentTypeUuidsList;
           }
        }
    });









