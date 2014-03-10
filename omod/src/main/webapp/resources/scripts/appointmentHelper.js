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

appointmentHelper.setUpLocationFilter = function(scope) {
    if( sessionLocationUuid){
        angular.forEach(scope.locations, function(location) {
            if (location.uuid == sessionLocationUuid) {
                scope.locationFilter = location;
            }
        });
    }
    else if( scope.locations && scope.locations.length > 0){
        scope.locationFilter = scope.locations[0];
    }
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

appointmentHelper.findProvidersFromGrid = function(scope) {
    angular.forEach(scope.scheduledAppointmentBlocks, function(block) {
        var index = scope.providers.indexOf(block.provider);
        if(index == -1)
        scope.providers.push(block.provider);
    });
};

appointmentHelper.findServiceTypesFromGrid = function (scope) {
    angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
        var servicesByBlock = scheduledAppointmentBlock.servicesWithAppointments();
        scope.services = scope.services.concat(servicesByBlock);
    });
}

appointmentHelper.findAppointmentBlockFromGrid = function (scope) {
    angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
        var index = scope.appointmentBlocks.indexOf(scheduledAppointmentBlock.date);
        if(index == -1)
            scope.appointmentBlocks.push(scheduledAppointmentBlock.date);
    })
}



