// This file was created in order to declare all the angular modules. This way we can ensure that all the
// dependency problems between controllers, directives and services will be resolved.

angular.module('appointmentscheduling.scheduleAppointment', ['appointmentscheduling.appointmentService','ui.bootstrap',
    'ngGrid', 'scheduleAppointmentDateRangePickerApp', 'ngGridPaginationApp']);

angular.module('selectMultipleAppointmentTypesApp', ['appointmentscheduling.appointmentService', 'ui.bootstrap'])

angular.module('scheduleAppointmentDateRangePickerApp', [] );

angular.module('ngGridPaginationApp', []);

angular.module('appointmentSchedulingParse', []);

angular.module('appointmentSchedulingHelper', []);

angular.module('appointmentscheduling.scheduledAppointmentBlocks', ['appointmentscheduling.appointmentService', 'locationService',
    'ui.bootstrap', 'ngGrid', 'ngGridPaginationApp', 'uicommons.RESTUtils', 'appointmentSchedulingParse', 'appointmentSchedulingHelper',
    'selectMultipleAppointmentTypesApp']);