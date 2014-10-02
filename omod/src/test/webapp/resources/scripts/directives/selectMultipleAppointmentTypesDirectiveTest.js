describe('selectmultipleappointmenttypes directive', function () {

    describe('the components form the template must be correctly displayed', function () {
        var compile, scope, template, httpBackend;

        beforeEach(module('selectMultipleAppointmentTypesApp'));

        beforeEach(inject(function ($rootScope, $compile, $templateCache, $httpBackend) {

            OPENMRS_CONTEXT_PATH = 'openmrs';

            template = '<div id="select-appointment-types-typeahead">' +
                            '<p>{{ headermessage }}</p>' +
                            '<div ng-repeat="appointmentTypeSelected in selectedAppointmentTypes">'+
                                '<span>{{ appointmentTypeSelected.display }}</span>'+
                                '<i class="icon-remove small add-on"  ng-click="removeAppointmentType(appointmentTypeSelected)"></i>'+
                            '</div>'+
                            '<div class="inline-block">' +
                                '<input type="text" ng-model="appointmentType" typeahead-on-select="addAppointmentType(appointmentType)"'+
                                'typeahead="appointmentType as appointmentType.display for appointmentType in getAppointmentTypes($viewValue) | filter: $viewValue"' +
                                'typeahead-min-length="0">' +
                                '<div id="viewAllAppointmentTypes" class="inline-box">' +
                                    '<a ng-click="showAllAppointmentTypesModal = true">{{ viewall }}</a>' +
                                '</div>'+
                            '</div>'+
                            '<div id="allAppointmentTypesModal" class="dialog" ng-show="showAllAppointmentTypesModal">'+
                                '<div class="dialog-header">'+
                                '<h3>{{ headermessage }}</h3>'+
                            '</div>'+
                            '<div class="dialog-content">'+
                                '<div ng-repeat="type in allAppointmentTypes">'+
                                    '<a ng-click="addAppointmentType(type)">{{ type.display }}</a>'+
                                '</div>'+
                                '<br/>'+
                                '<span class="button confirm" ng-click="showAllAppointmentTypesModal = false"> {{ closemessage }}</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

            $templateCache.put('/openmrs/ms/uiframework/resource/appointmentschedulingui/partials/selectMultipleAppointmentTypes.html', template);


            var appointmentTypes = {
                results: {
                    uuid:'0c186cdd-44c4-49d7-8694-1880d955101c',
                    display: 'type'
                }
            };
            $httpBackend.whenGET("/openmrs/ws/rest/v1/appointmentscheduling/appointmenttype?v=full").respond({ result: appointmentTypes});

            httpBackend = $httpBackend;
            scope = $rootScope;
            compile= $compile;
        }));

        it('should add an input and a link in the view when the directive is added', function () {
            var selectMultipleInput = '<input type="text" ng-model="appointmentType" typeahead-on-select="addAppointmentType(appointmentType)" ';
            var viewAllLink = '<div id="viewAllAppointmentTypes" class="inline-box">'+
                                '<a ng-click="showAllAppointmentTypesModal = true" class="ng-binding">View All Appointments</a>' +
                              '</div>';

            var element = compile(angular.element('<selectmultipleappointmenttypes viewall="View All Appointments"/>'))(scope);
            httpBackend.flush();
            scope.$digest();

            expect(element.html()).toContain(selectMultipleInput);
            expect(element.html()).toContain(viewAllLink);
        })

        it('should display the custom header message according to the headermessage parameter', function () {

            var element = compile(angular.element('<selectmultipleappointmenttypes headermessage="Custom header"/>'))(scope);
            scope.$digest();

            expect(element.html()).toContain('Custom header');
        })

        it('should display the custom view all message according to the viewall parameter', function () {

            var element = compile(angular.element('<selectmultipleappointmenttypes viewall="View All Appointments"/>'))(scope);
            scope.$digest();

            expect(element.html()).toContain('View All Appointments');
        })

        it('should display the custom close message according to the closemessage parameter', function () {

            var element = compile(angular.element('<selectmultipleappointmenttypes closemessage="Close"/>'))(scope);
            scope.$digest();

            expect(element.html()).toContain('Close');
        })

    });

})