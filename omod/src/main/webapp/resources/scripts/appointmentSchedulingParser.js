var appointmentParser = appointmentParser || {};

appointmentParser.parseScheduledAppointmentBlocks = function(results){

    var parseAppointmentBlockDate = function(data){
        return  moment(data.startDate).format("HH:mm a") + " - " + moment(data.endDate).format("HH:mm a");
    };

    var parsePatients = function(data){
        var patients = [];

        data.forEach( function( apppointment){
            patients.push(apppointment.patient.person.display + " (" + apppointment.appointmentType.display + ")");
        });

        return patients;
    };

    var parsePatientsIdentifiers = function(data){
        var patientsIdentifierPrimary = [];
        var patientsIdentifierDossier = [];

        data.forEach(function(appointment){
            patientsIdentifierPrimary.push(appointment.patient.display.split("-")[0].trim());

            appointment.patient.identifiers.forEach(function(identifier){
                if (identifier.display.indexOf("Nimewo Dosye") > -1 ) {
                    patientsIdentifierDossier.push(identifier.display.split("=")[1].trim());
                }
            });
        });

        return { primary: patientsIdentifierPrimary, dossier: patientsIdentifierDossier };
    };

    results.forEach(function(result){
        result.date = parseAppointmentBlockDate(result.appointmentBlock)
        result.patients = parsePatients(result.appointments);
        var patientIdentifiers = parsePatientsIdentifiers(result.appointments);
        result.patientsIdentifierPrimary = patientIdentifiers.primary;
        result.patientsIdentifierDossier = patientIdentifiers.dossier;
    });

    return results;
};




