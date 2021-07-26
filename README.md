[![Build Status](https://travis-ci.org/openmrs/openmrs-module-appointmentschedulingui.svg?branch=master)](https://travis-ci.org/openmrs/openmrs-module-appointmentschedulingui)

Appointment Scheduling UI Module
=================================

New UI for appointment scheduling module based on UI/App framework

Watch SASS files for changes with `mvn compile -Pwatch-sass`

### Troubleshooting

If the jasmine tests are failing, it may be because your bower components directory is stale. To fix this, delete
the `omod/serc/main/webapp/reosurces/scripts/bower_components.openmrs-uicommons` directory
and then rerun a maven clean install.


