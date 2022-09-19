module.exports = function(config) {
    var karmaConfig = {
        files: [
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/jquery-1.12.4.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-common.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-resource.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-mocks.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/moment.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-ui/ui-bootstrap-tpls-0.13.0.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-ui/ng-grid-2.0.7.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/angular-ui/ng-grid-flexible-height.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/services/locationService.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/services/providerService.js'},
            { pattern: 'src/main/webapp/resources/scripts/bower_components/openmrs-uicommons/omod/src/main/webapp/resources/scripts/rest/restUtils.js'},
            { pattern: 'src/main/webapp/resources/scripts/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/controllers/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/factories/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/htmlformentry/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/directives/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/services/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/resources/*.js'},
            { pattern: 'src/test/webapp/resources/scripts/globalMocks.js' },
            { pattern: 'src/test/webapp/resources/scripts/controllers/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/directives/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/factories/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/htmlformentry/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/qtip/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/resources/*.js' },
            { pattern: 'src/test/webapp/resources/scripts/services/*.js' },

        ],
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        concurrency: Infinity,
        singleRun: true
    };

    config.set(karmaConfig);
};

