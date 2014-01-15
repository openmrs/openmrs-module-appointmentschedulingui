<%
    ui.decorateWith("appui", "standardEmrPage")
%>


<script type="text/javascript">
var breadcrumbs = [
{ icon: "icon-home", link: '/' + OPENMRS_CONTEXT_PATH + '/index.htm' },
{ label: "${ ui.message("emr.app.systemAdministration.label")}", link: '${ui.pageLink("emr", "systemAdministration")}' },
{ label: "${ ui.message("appointmentschedulingui.appointmenttype.label")}" }
];
</script>


<h1>
    ${ ui.message("appointmentschedulingui.appointmenttype.label") }
</h1>

<div class="container">

    <div id="appointmentTypes-list">
        <table id="appointmentTypesTable">
            <thead>
            <tr>
                <th style="width: 35%">${ ui.message("appointmentschedulingui.appointmenttype.name") }</th>
                <th style="width: 15%">${ ui.message("appointmentschedulingui.appointmenttype.duration") }</th>
                <th style="width: 50%">${ ui.message("appointmentschedulingui.appointmenttype.description") }</th>
            </tr>
            </thead>
            <tbody>
            <% if ( (appointmentTypeList == null)
                    || (appointmentTypeList!= null && appointmentTypeList.size() == 0)) { %>
            <tr>
                <td>${ ui.message("uicommons.dataTable.emptyTable") }</td>
                <td></td>
                <td></td>

            </tr>
            <% } %>
            <% appointmentTypeList.each { appointmentType -> %>
            <tr>
                <td>${ ui.format(appointmentType.name) }</td>
                <td>${ ui.format(appointmentType.duration) }</td>
                <td>${ ui.format(appointmentType.description)}</td>
            </tr>
            <% } %>
            </tbody>
        </table>
    </div>
</div>

${ ui.includeFragment("uicommons", "widget/dataTable", [ object: "#appointmentTypesTable",
        options: [
                bFilter: true,
                bJQueryUI: true,
                bLengthChange: false,
                iDisplayLength: 10,
                sPaginationType: '\"full_numbers\"',
                bSort: false,
                sDom: '\'ft<\"fg-toolbar ui-toolbar ui-corner-bl ui-corner-br ui-helper-clearfix datatables-info-and-pg \"ip>\''
        ]
]) }

