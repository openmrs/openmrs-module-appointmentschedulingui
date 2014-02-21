angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduledAppointmentBlockController', function ($scope, AppointmentService, filterFilter) {

    $scope.scheduledAppointmentBlocks = [];

    var templateCell = '<div ng-repeat=' +
            '"data in row.getProperty(col.field) track by $index">' +
            '<div class="ngCellText" >'  +
            '{{data}}' +
            '</div></div>';

    $scope.pagingOptions = {
        pageSizes: [5,10,20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.totalServerItems = 0;
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    $scope.scheduledAppointmentBlocksOptions = {
            data: 'scheduledAppointmentBlocks',
            multiSelect: false,
            enableSorting: false,
            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            selectedItems: [],
            columnDefs: [   { field: 'date', width: '20%', displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") },
                { field: 'appointmentBlock.provider.person.display', width: '20%', displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.provider") },
                { field: 'patients', width: '30%', displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.patientName"), cellTemplate: templateCell},
                { field: 'patientsIdentifierPrimary', width: '15%', displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.patientId"), cellTemplate: templateCell},
                { field: 'patientsIdentifierDossier', width: '14%', displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber"), cellTemplate: templateCell}]
     };

    $scope.setPagingData = function(){
        var page = $scope.pagingOptions.currentPage,
            pageSize = $scope.pagingOptions.pageSize,
            data = $scope.totalScheduledAppointmentBlocks;

        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.scheduledAppointmentBlocks = pagedData;
        $scope.totalServerItems = $scope.totalScheduledAppointmentBlocks.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.getScheduledAppointmentBlocks = function(){
        var params = { 'date' : "2014-02-28", 'location' : "787a2422-a7a2-400e-bdbb-5c54b2691af5"};
        AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
           angular.forEach(results, function(result) {
                result['date'] = moment(result.appointmentBlock.startDate).format("HH:mm a") +
                    " - " + moment(result.appointmentBlock.endDate).format("HH:mm a");

                var patients = [];
                result.appointments.forEach( function( apppointment, index){
                    patients.push(apppointment.patient.person.display + " (" + apppointment.appointmentType.display + ")");
                });

               result['patients'] = patients;

               var patientsIdentifierPrimary = [];
               var patientsIdentifierDossier = [];

               result.appointments.forEach( function(appointment, index){
                   appointment.patient.identifiers.forEach(function(identifier, index){
                        if (identifier.display.indexOf("ZL EMR ID") > -1 ) {
                            patientsIdentifierPrimary.push(identifier.display.split("=")[1].trim());
                        } else if (identifier.display.indexOf("Nimewo Dosye") > -1 ) {
                            patientsIdentifierDossier.push(identifier.display.split("=")[1].trim());
                        }

                   });
               });

               result['patientsIdentifierPrimary'] = patientsIdentifierPrimary;
               result['patientsIdentifierDossier'] = patientsIdentifierDossier;
           })

           $scope.scheduledAppointmentBlocks = results;
           $scope.totalScheduledAppointmentBlocks = results;
           $scope.setPagingData();
        });
    }

    $scope.$watch('pagingOptions', $scope.setPagingData, true);
});