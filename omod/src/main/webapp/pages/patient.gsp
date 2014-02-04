<%
    ui.decorateWith("appui", "standardEmrPage")
%>

<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("appointmentschedulingui.scheduleAppointment.title") }", link: "${ ui.pageLink("coreapps", "findpatient/findPatient?app=schedulingAppointmentApp") }" },
        { label: "${ ui.format(patient.patient.familyName) }, ${ ui.format(patient.patient.givenName) }" , link: '${ui.pageLink("coreapps", "patientdashboard/patientDashboard", [patientId: patient.id])}'},
    ];
</script>

${ ui.includeFragment("coreapps", "patientHeader", [ patient: patient.patient ]) }

<script type="text/javascript">
    jq(function() {
        jq('#actions .cancel').click(function() {
            emr.navigateTo({
                provider: "coreapps",
                page: "findpatient/findPatient",
                query: {
                    app: "schedulingAppointmentApp"
                }
            });
        });
        jq('#actions .confirm').click(function() {
            emr.navigateTo({
                provider: "appointmentschedulingui",
                page: "scheduleAppointment",
                query: {
                    patientId: "${ patient.id }",
                    returnUrl: "${ ui.escapeJs(ui.pageLink("appointmentschedulingui", "findPatient")) }",
                    breadcrumbOverride: "${ ui.escapeJs(breadcrumbOverride) }"
                }
            });
        });
        jq('#actions button').first().focus();
    });
</script>

<div class="container">

    <h1>${ ui.message("coreapps.vitals.confirmPatientQuestion") }</h1>

    <div id="actions" class="half-width">
        <button class="confirm big right">
            <i class="icon-arrow-right"></i>
            ${ ui.message("dispensing.findpatient.confirm.yes") }
        </button>

        <button class="cancel big">
            <i class="icon-arrow-left"></i>
            ${ ui.message("coreapps.vitals.confirm.no") }
        </button>
    </div>

</div>
