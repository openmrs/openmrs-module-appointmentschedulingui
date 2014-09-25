// This file was created in order to declare all the angular modules. This way we can ensure that all the
// dependency problems between controllers, directives and services will be resolved.

angular.module('appointmentscheduling', ['appointmentscheduling.appointmentService','ui.bootstrap',
    'ngGrid', 'scheduleAppointmentDateRangePickerApp', 'ngGridHelper']);


angular.module('appointmentscheduling.dailyAppointments', ['appointmentscheduling.appointmentService', 'locationService',
    'ui.bootstrap', 'ngGrid', 'ngGridHelper', 'uicommons.RESTUtils', 'dailyAppointmentsHelper',
    'selectMultipleAppointmentTypesApp']);

angular.module('appointmentscheduling.requestAppointment', ['appointmentscheduling.appointmentService', 'providerService', 'ui.bootstrap']);

angular.module('appointmentscheduling.scheduleProviders', ['selectMultipleAppointmentTypesApp',
    'appointmentscheduling.appointmentService', 'providerService','locationService','uicommons.RESTUtils','ui.bootstrap', 'ui.calendar' ]);

angular.module('selectMultipleAppointmentTypesApp', ['appointmentscheduling.appointmentService', 'ui.bootstrap'])

angular.module('scheduleAppointmentDateRangePickerApp', [] );

angular.module('ngGridHelper', []);

angular.module('dailyAppointmentsHelper', []);