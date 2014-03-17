var scheduledAppointmentBlocksHelper = scheduledAppointmentBlocksHelper || {}

scheduledAppointmentBlocksHelper.setupDatePicker = function(scope) {

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

scheduledAppointmentBlocksHelper.setUpLocationFilter = function(scope) {
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

scheduledAppointmentBlocksHelper.setUpGrid = function(scope){

    var templateCell =
        '<div ng-repeat=' +
        '"data in row.getProperty(col.field) track by $index">' +
            '<div class="ngCellText" >' +
                '<div class="patientInformation appointmentSummary">' +
                    '<div class="patientName">{{data.name}}</div>' +
                    '<div><small>({{data.serviceType.name}})</small></div>' +
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

scheduledAppointmentBlocksHelper.setPagingData = function(scope){
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

scheduledAppointmentBlocksHelper.initializeMessages = function(scope){
    scope.showLoadingMessage = true;
    scope.showNoScheduledAppointmentBlocks = false;
};

scheduledAppointmentBlocksHelper.manageMessages = function(scope) {
    scope.showLoadingMessage = false;
    if (scope.totalScheduledAppointmentBlocks.length == 0) {
        scope.showNoScheduledAppointmentBlocks = true;
    } else {
        scope.showNoScheduledAppointmentBlocks = false;
    }
};

scheduledAppointmentBlocksHelper.findProvidersFromGrid = function(scope) {
    scope.providers = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allProviders")];
    scope.providerFilter = scope.providers[0];
    angular.forEach(scope.scheduledAppointmentBlocks, function(block) {
        var index = scope.providers.indexOf(block.provider);
        if(index == -1)
        scope.providers.push(block.provider);
    });
};

scheduledAppointmentBlocksHelper.findServiceTypesFromGrid = function (scope) {
    scope.services = [{name: emr.message("appointmentschedulingui.dailyScheduledAppointments.allServiceTypes"), uuid: null}];
    scope.serviceFilter = scope.services[0];

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
}

scheduledAppointmentBlocksHelper.findAppointmentBlockFromGrid = function (scope) {
    scope.appointmentBlocks = [emr.message("appointmentschedulingui.dailyScheduledAppointments.allAppointmentBlocks")];
    scope.appointmentBlockFilter = scope.appointmentBlocks[0];
    angular.forEach(scope.scheduledAppointmentBlocks, function (scheduledAppointmentBlock) {
        var index = scope.appointmentBlocks.indexOf(scheduledAppointmentBlock.date);
        if(index == -1)
            scope.appointmentBlocks.push(scheduledAppointmentBlock.date);
    })
}







