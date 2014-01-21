<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appointmentType.css")
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


<h1>
    ${ ui.message("appointmentschedulingui.appointmenttype.title") }
</h1>

<form class="create-appointment-type" method="post" id="appointmentType">

        ${ ui.includeFragment("uicommons", "field/text", [
                label: ui.message("appointmentschedulingui.appointmenttype.name"),
                formFieldName: "name",
                initialValue: (''),
                size: 50
        ])}

        ${ ui.includeFragment("uicommons", "field/text", [
                label: ui.message("appointmentschedulingui.appointmenttype.duration"),
                formFieldName: "duration",
                initialValue: (''),
                min: 15,
                max: 120,
                size: 10,
                classes: ["numeric-range"]
        ])}

        ${ ui.includeFragment("emr", "field/textarea", [
                label: ui.message("appointmentschedulingui.appointmenttype.description"),
                formFieldName: "description",
                initialValue: (''),
                size: 50
        ])}

    <div>
        <input type="button" class="cancel" value="${ ui.message("appointmentschedulingui.appointmenttype.cancel") }" onclick="javascript:window.location='/${ contextPath }/appointmentschedulingui/manageAppointmentTypes.page'" />
        <input type="submit" class="confirm" id="save-button" value="${ ui.message("appointmentschedulingui.appointmenttype.save") }"  />
    </div>

</form>
