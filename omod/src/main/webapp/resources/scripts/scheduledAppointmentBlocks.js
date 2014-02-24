angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduledAppointmentBlockController', function ($scope, AppointmentService, filterFilter) {

    $scope.filterDate = Date.now();
    $scope.datePicker = {
        opened: false,
        open: function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePicker.opened = true;
        }
    };

    $scope.showScheduledAppointmentBlocksGrid = false;
    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;

    var templateCell = '<div ng-repeat=' +
            '"data in row.getProperty(col.field) track by $index">' +
            '<div class="ngCellText" >'  +
            '{{data}}' +
            '</div></div>';

    $scope.pagingOptions = {
        pageSizes: [5],
        pageSize: 5,
        currentPage: 1
    };

    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.totalServerItems = 0;

    $scope.scheduledAppointmentBlocksGrid = {
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
        var date = new Date($scope.filterDate);
        var params = { 'date' : moment(date).format('YYYY-MM-DD'), 'location' : "787a2422-a7a2-400e-bdbb-5c54b2691af5"};
        $scope.showNoScheduledAppointmentBlocks = false;
        $scope.showLoadingMessage= true;

        AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
            parseScheduledAppointmentBlocks(results);

            $scope.scheduledAppointmentBlocks = results;
            $scope.totalScheduledAppointmentBlocks = results;
            $scope.showLoadingMessage = false;

            if($scope.totalScheduledAppointmentBlocks.length == 0)  {
               $scope.showNoScheduledAppointmentBlocks = true;
            }else{
                $scope.showScheduledAppointmentBlocksGrid = true;
                $scope.showNoScheduledAppointmentBlocks = false;
            }

            $scope.setPagingData();
        });


    };

    $scope.$watch('pagingOptions', $scope.setPagingData, true);
    $scope.$watch('filterDate', $scope.getScheduledAppointmentBlocks, true);

});