<%
    ui.decorateWith("appui", "standardEmrPage")
    ui.includeCss("appointmentschedulingui", "appointmentType.css")
    ui.includeJavascript("appointmentschedulingui", "manageAppointmentType.js")
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
            <form id="appointmentTypeRow">
                <tr>
                    <td>${ ui.format(appointmentType.name) }</td>
                    <td>${ ui.format(appointmentType.duration) }</td>
                    <td>${ ui.format(appointmentType.description)}</td>
                    <td class="align-center">
                        <span>
                            <i class="editEncounter delete-item icon-pencil" title="${ ui.message("coreapps.edit") }"></i>
                            <i class="deleteAppointmentType delete-item icon-remove" data-appointment-type-id="${ appointmentType.id}" title="${ ui.message("coreapps.delete") }"></i>
                        </span>
                    </td>
                </tr>
            </form>


            <div id="delete-appointment-type-dialog" class="dialog" style="display: none">
                <div class="dialog-header">
                    <h3>Delete Appointment Type</h3>
                </div>
                <div class="dialog-content">
                    <input type="hidden" id="encounterId" value="">
                    <ul>
                        <li class="info">
                            <span>Are you sure you want to delete this appointment type?</span>
                        </li>
                    </ul>

                    <button class="confirm right">Yes<i class="icon-spinner icon-spin icon-2x" style="display: none; margin-left: 10px;"></i></button>
                    <button class="cancel">No</button>
                </div>
            </div>
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

