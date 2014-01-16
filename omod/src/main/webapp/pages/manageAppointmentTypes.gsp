<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentscheduingui", "appointmentType.css")
%>


<script type="text/javascript">
var breadcrumbs = [
{ icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
{ label: "${ ui.message("emr.app.systemAdministration.label")}", link: '${ui.pageLink("emr", "systemAdministration")}' },
{ label: "${ ui.message("appointmentschedulingui.appointmenttype.label")}" }
];
</script>



<div class="container">
    <div>
        <div id=manageAppointmentsTypeTitle align="left" class="appointment-type-label">
            <h1>
                ${ ui.message("appointmentschedulingui.appointmenttype.label") }
            </h1>
        </div>
        <button class="confirm appointment-type-label" style="float: right"
                    onclick="location.href='${ui.pageLink("appointmentschedulingui", "appointmentType")}'">
                <i class="icon-plus"></i>
                ${ ui.message("appointmentschedulingui.appointmenttype.button")}
        </button>

    </div>
    <div id="appointmentTypes-list">
        <table id="appointmentTypesTable">
            <thead>
            <tr>
                <th style="width: 40%">${ ui.message("appointmentschedulingui.appointmenttype.name") }</th>
                <th style="width: 15%">${ ui.message("appointmentschedulingui.appointmenttype.duration") }</th>
                <th style="width: 30%">${ ui.message("appointmentschedulingui.appointmenttype.description") }</th>
                <th style="width: 15%">${ ui.message("appointmentschedulingui.appointmenttype.actions") }</th>
            </tr>
            </thead>
            <tbody>
            <% if ( (appointmentTypeList == null)
                    || (appointmentTypeList!= null && appointmentTypeList.size() == 0)) { %>
            <tr>
                <td>${ ui.message("uicommons.dataTable.emptyTable") }</td>
                <td></td>
                <td></td>
                <td></td>

            </tr>
            <% } %>
            <% appointmentTypeList.each { appointmentType -> %>
            <tr>
                <td>${ ui.format(appointmentType.name) }</td>
                <td>${ ui.format(appointmentType.duration) }</td>
                <td>${ ui.format(appointmentType.description)}</td>
                <td align="center">
                    <span>
                        <i class="editEncounter delete-item icon-pencil" title="${ ui.message("coreapps.edit") }"></i>
                        <i class="deleteEncounterId delete-item icon-remove" title="${ ui.message("coreapps.delete") }"></i>
                    </span>
                </td>
            </tr>
            <% } %>
            </tbody>
        </table>
    </div>
</div>

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

