var appointmentHelper = appointmentHelper || {}

appointmentHelper.setupDatePicker = function(scope) {

    var datePicker = {
        opened: false,
        open: function(event) {
            event.preventDefault();
            event.stopPropagation();

            scope.datePicker.opened = true;
        }
    };

    return datePicker;
};

appointmentHelper.setUpGrid = function(scope){

    var templateCell = '<div ng-repeat=' +
        '"data in row.getProperty(col.field) track by $index">' +
            '<div class="ngCellText" >' +
                '<div class="patientInformation appointmentSummary">' +
                    '<div class="patientName">{{data.name}}</div>' +
                    '<div><small>({{data.serviceType}})</small></div>' +
                '</div>' +
                '<div class="patientInformation identifier"><div>{{data.primaryIdentifier}}</div>' +
                '<div><small>' + emr.message("appointmentschedulingui.dailyScheduledAppointments.patientId") + '</small></div></div>' +
                '<div class="patientInformation identifier"><div>{{data.dossierNumber}}</div>' +
                '<div ng-if="data.dossierNumber.length > 0"><small>' + emr.message("appointmentschedulingui.dailyScheduledAppointments.dossierNumber") + '</small></div>' +
            '</div>' +
        '</div>';

    var scheduledAppointmentBlocksGrid = {
        data: 'scheduledAppointmentBlocks',
        multiSelect: false,
        enableSorting: false,
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: scope.pagingOptions,
        selectedItems: [],
        filterOptions: scope.filterOptions,
        columnDefs: [
            { field: 'date',
               width: '20%',
               displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.timeBlock") },
            { field: 'appointmentBlock.provider.person.display',
              width: '20%',
              displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.provider") },
            { field: 'patients',
              width: '60%',
              displayName: emr.message("appointmentschedulingui.dailyScheduledAppointments.patientName"),
              cellTemplate: templateCell }
        ]
    };
    return scheduledAppointmentBlocksGrid;
};

appointmentHelper.setPagingData = function(scope){
    var page = scope.pagingOptions.currentPage,
        pageSize = scope.pagingOptions.pageSize,
        data = scope.totalScheduledAppointmentBlocks;

    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);

    scope.scheduledAppointmentBlocks = pagedData;
    scope.totalServerItems = scope.totalScheduledAppointmentBlocks.length;
    if (!scope.$$phase) {
        scope.$apply();
    }
};

appointmentHelper.initializeMessages = function(scope){
    scope.showLoadingMessage = true;
    scope.showNoScheduledAppointmentBlocks = false;
};

appointmentHelper.manageMessages = function(scope) {
    scope.showLoadingMessage = false;
    if (scope.totalScheduledAppointmentBlocks.length == 0) {
        scope.showNoScheduledAppointmentBlocks = true;
    } else {
        scope.showNoScheduledAppointmentBlocks = false;
    }
};

