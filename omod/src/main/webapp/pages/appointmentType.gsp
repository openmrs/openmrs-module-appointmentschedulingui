<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appointmentType.css")
    ui.includeJavascript("appointmentschedulingui", "appointmentType.js")
%>


<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
        { label: "${ ui.message("emr.app.systemAdministration.label")}",
            link: '${ui.pageLink("emr", "systemAdministration")}' },
        { label: "${ ui.message("appointmentschedulingui.appointmenttype.label")}",
            link: '${ui.pageLink("appointmentschedulingui", "manageAppointmentTypes")}' },
        { label: "${ ui.message("appointmentschedulingui.appointmenttype.title")}" }
    ];
</script>

<script type="text/javascript">
    jq( function(){
        confirmButtonEventListerner("${ ui.message("appointmentschedulingui.appointmenttype.duration.errorMessage")}");
    });
</script>

<h1>
    ${ ui.message("appointmentschedulingui.appointmenttype.title") }
</h1>

<form class="create-appointment-type" method="post" id="appointmentTypeForm">

        ${ ui.includeFragment("uicommons", "field/text", [
                label: ui.message("appointmentschedulingui.appointmenttype.name"),
                formFieldName: "name",
                id: "name",
                initialValue: (appointmentType.name ?: '')
        ])}

        ${ ui.includeFragment("uicommons", "field/text", [
                label: ui.message("appointmentschedulingui.appointmenttype.duration"),
                formFieldName: "duration",
                id: "duration",
                initialValue: (appointmentType.duration ?: '')
        ])}

        ${ ui.includeFragment("emr", "field/textarea", [
                label: ui.message("appointmentschedulingui.appointmenttype.optionalDescription"),
                formFieldName: "description",
                id: "description",
                initialValue: (appointmentType.description ?: '')
        ])}

    <input type="hidden" value="${ appointmentType.uuid }" name="uuid">

    <div>
        <input type="button" class="cancel" value="${ ui.message("appointmentschedulingui.appointmenttype.cancel") }" onclick="javascript:window.location='/${ contextPath }/appointmentschedulingui/manageAppointmentTypes.page'" />
        <input type="button" class="confirm" id="save-button" value="${ ui.message("appointmentschedulingui.appointmenttype.save") }"  />
    </div>

</form>
