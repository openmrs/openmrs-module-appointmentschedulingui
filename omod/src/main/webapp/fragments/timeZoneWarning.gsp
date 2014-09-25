
<%
    ui.includeJavascript("appointmentschedulingui", "controllers/timeZoneWarningController.js")
%>


<script type="text/javascript">
    var serverTimeZoneOffset = ${ serverTimeZoneOffset };
</script>


<div id="time-zone-warning" class="note-container" ng-cloak ng-controller="TimeZoneWarningCtrl" ng-show="invalidTimeZone()">
    <div class="note error">
        <div class="text">
            <i class="icon-remove medium"></i>
            <p> ${ ui.message("appointmentschedulingui.timeZoneWarning", serverTimeZone) }</p>
        </div>
    </div>
</div>

