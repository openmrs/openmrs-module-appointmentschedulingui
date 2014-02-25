angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap', 'ngGrid'])
    .controller('ScheduledAppointmentBlockController', function ($scope, AppointmentService) {

    $scope.filterDate = Date.now();
    $scope.datePicker = appointmentHelper.setupDatePicker($scope);

    $scope.showNoScheduledAppointmentBlocks = false;
    $scope.showLoadingMessage = false;

    $scope.pagingOptions = {
        pageSizes: [5],
        pageSize: 5,
        currentPage: 1
    };

    $scope.scheduledAppointmentBlocksGrid = appointmentHelper.setUpGrid($scope);

    $scope.scheduledAppointmentBlocks = [];
    $scope.totalScheduledAppointmentBlocks = [];
    $scope.totalServerItems = 0;
    $scope.updatePagingData = function() {
        appointmentHelper.setPagingData($scope);
    };

    $scope.getScheduledAppointmentBlocks = function(){
        var date = new Date($scope.filterDate);
        var params = { 'date' : moment(date).format('YYYY-MM-DD'), 'location' : jq("#currentLocationUuid").val()};

        appointmentHelper.initializeMessages($scope);

        AppointmentService.getScheduledAppointmentBlocks(params).then( function(results){
            appointmentParser.parseScheduledAppointmentBlocks(results);

            $scope.scheduledAppointmentBlocks = results;
            $scope.totalScheduledAppointmentBlocks = results;

            appointmentHelper.manageMessages($scope);
            appointmentHelper.setPagingData($scope);
        });
    };

    $scope.$watch('pagingOptions', $scope.updatePagingData, true);
    $scope.$watch('filterDate', $scope.getScheduledAppointmentBlocks, true);

});