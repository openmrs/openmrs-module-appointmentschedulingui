
<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appointmentType.css")
    ui.includeJavascript("appointmentschedulingui", "manageAppointmentType.js")
%>


<script type="text/javascript">

// TODO redo usnig angular?

var breadcrumbs = [
    { icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
    { label: "${ ui.message("appointmentschedulingui.home.title") }",
        link: '${ ui.pageLink("appointmentschedulingui", "home") }' },
    { label: "${ ui.message("appointmentschedulingui.appointmenttype.label")}" }
];

jq( function(){
    var resultMessage = "${resultMessage}";
    if (resultMessage !=  ""){
        emr.successMessage(resultMessage);
    }
});

</script>


<div class="container">
    <div>
        <div id="manageAppointmentsTypeTitle" class="appointment-type-label">
            <h1>
                ${ ui.message("appointmentschedulingui.appointmenttype.label") }
            </h1>
        </div>

        <button class="confirm appointment-type-label right"
                    onclick="location.href='${ui.pageLink("appointmentschedulingui", "appointmentType")}'">
                <i class="icon-plus"></i>
                ${ ui.message("appointmentschedulingui.appointmenttype.button")}
        </button>

    </div>
    <div id="appointmentTypes-list">

        <% if (appointmentTypeList) { %>

            <table class="table table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl" id="appointmentTypesTable" empty-value-message='${ ui.message("uicommons.dataTable.emptyTable") }'>
                <thead>
                <tr>
                    <th style="width: 40%">${ ui.message("appointmentschedulingui.appointmenttype.name") }</th>
                    <th style="width: 10%">${ ui.message("appointmentschedulingui.appointmenttype.duration") }</th>
                    <% if (featureToggles.isFeatureEnabled("appointmentscheduling.confidential")) { %>
                        <th style="width: 10%">${ ui.message("appointmentschedulingui.appointmenttype.confidential") }</th>
                    <% } %>
                    <th style="width: 30%">${ ui.message("appointmentschedulingui.appointmenttype.description") }</th>
                    <th style="width: 10%">${ ui.message("appointmentschedulingui.appointmenttype.actions") }</th>
                </tr>
                </thead>
                <tbody>
                    <% appointmentTypeList.each { appointmentType -> %>

                        <tr>
                            <td>${ ui.encodeHtmlContent(ui.format(appointmentType.name)) }</td>
                            <td>${ ui.format(appointmentType.duration) }</td>
                            <% if (featureToggles.isFeatureEnabled("appointmentscheduling.confidential")) { %>
                                <td>${ ui.message("emr." + (appointmentType.confidential ? "yes" : "no")) }</td>
                            <% } %>
                            <td>${ ui.encodeHtmlContent(ui.format(appointmentType.description))}</td>
                            <td class="align-center">
                                <span>
                                    <i id="appointmentschedulingui-edit-${ ui.encodeHtml(ui.format(appointmentType.name)) }" class="editAppointmentType delete-item icon-pencil"
                                       data-appointment-type-id="${ appointmentType.id}"
                                       data-edit-url='${ui.pageLink("appointmentschedulingui", "appointmentType")}'
                                       title="${ ui.message("coreapps.edit") }"></i>
                                    <i id="appointmentschedulingui-delete-${ ui.encodeHtml(ui.format(appointmentType.name)) }" class="deleteAppointmentType delete-item icon-remove"
                                       data-appointment-type-id="${ appointmentType.id}"
                                       title="${ ui.message("coreapps.delete") }"></i>
                                </span>
                            </td>
                        </tr>

                        <div id="delete-appointment-type-dialog" class="dialog" style="display: none">
                            <div class="dialog-header">
                                <h3>${ ui.message("appointmentschedulingui.manageappointmenttype.deleteAppointmentTypeTitleDialog")}</h3>
                            </div>
                            <div class="dialog-content">
                                <input type="hidden" id="encounterId" value="">
                                <ul>
                                    <li class="info">
                                        <span>${ ui.message("appointmentschedulingui.manageappointmenttype.deleteAppointmentTypeMessageDialog")}</span>
                                    </li>
                                </ul>

                                <button class="confirm right">${ ui.message("emr.yes")}
                                    <i class="icon-spinner icon-spin icon-2x" style="display: none; margin-left: 10px;"></i></button>
                                <button class="cancel">${ ui.message("emr.no")}</button>
                            </div>
                        </div>

                    <% } %>
                </tbody>
            </table>

        <% } else { %>
            <p>
                ${ ui.message("uicommons.dataTable.emptyTable") }
            </p>
        <% } %>
    </div>
</div>

<% if (appointmentTypeList) { %>

    ${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#appointmentTypesTable",
            options: [
                    bFilter: false,
                    bJQueryUI: true,
                    bLengthChange: false,
                    iDisplayLength: 10,
                    sPaginationType: '\"full_numbers\"',
                    bSort: false,
                    sDom: '\'ft<\"fg-toolbar ui-toolbar ui-corner-bl ui-corner-br ui-helper-clearfix datatables-info-and-pg \"ip>\''
            ]
    ]) }

<% } %>
