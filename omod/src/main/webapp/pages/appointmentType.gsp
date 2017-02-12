<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appointmentType.css")
    ui.includeJavascript("appointmentschedulingui", "appointmentType.js")
%>


<script type="text/javascript">
    var breadcrumbs = [
        { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
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
                maxLength: 100,
                initialValue: (ui.encodeHtml(appointmentType.name) ?: '')
        ])}

        ${ ui.includeFragment("uicommons", "field/text", [
                label: ui.message("appointmentschedulingui.appointmenttype.duration"),
                formFieldName: "duration",
                id: "duration",
                initialValue: (appointmentType.duration ?: '')
        ])}

        <% if (featureToggles.isFeatureEnabled("appointmentscheduling.confidential")) { %>
            ${ ui.includeFragment("uicommons", "field/radioButtons", [
                    label: ui.message("appointmentschedulingui.appointmenttype.confidential"),
                    formFieldName: "confidential",
                    options: [
                            [ value: "false", label: ui.message("emr.no") ],
                            [ value: "true", label: ui.message("emr.yes") ]
                    ],
                    id: "confidential",
                    initialValue: (appointmentType.confidential?.toString() ?: "false")
            ])}
        <% } %>

        ${ ui.includeFragment("uicommons", "field/textarea", [
                label: ui.message("appointmentschedulingui.appointmenttype.optionalDescription"),
                formFieldName: "description",
                id: "description",
                initialValue: (appointmentType.description ?: '')
        ])}

    <input type="hidden" value="${ appointmentType.uuid }" name="uuid">

    <br/>

    <div>
        <input type="button" class="confirm right" id="save-button" value="${ ui.message("appointmentschedulingui.appointmenttype.save") }"  />
        <input type="button" class="cancel" value="${ ui.message("appointmentschedulingui.appointmenttype.cancel") }" onclick="javascript:window.location='/${ contextPath }/appointmentschedulingui/manageAppointmentTypes.page'" />
    </div>

</form>
