var appointmentParser = appointmentParser || {};

appointmentParser.parseScheduledAppointmentBlocks = function(appointmentBlocks){

    var parseAppointmentBlockDate = function(data){
        return  moment(data.startDate).format("HH:mm a") + " - " + moment(data.endDate).format("HH:mm a");
    };

    var parsePatients = function(data){
        var patients = [];

        data.forEach(function(appointment){
            var patientInformation = {
                name: appointment.patient.person.display,
                serviceType: appointment.appointmentType.display,
                primaryIdentifier: parsePrimaryIdentifier(appointment.patient.display),
                dossierNumber: parseDossierNumber(appointment.patient.identifiers)
            };

            patients.push(patientInformation);
        });

        return patients;
    };

    var parsePrimaryIdentifier = function(data){
        return data.split("-")[0].trim();
    };

    var parseDossierNumber = function(identifiers){
        var dossierNumber = "";

        identifiers.forEach(function(identifier){
            if (identifier.display.indexOf("Nimewo Dosye") > -1 ) {
                dossierNumber = identifier.display.split("=")[1].trim();
            }
        });

        return dossierNumber;
    };

    appointmentBlocks.forEach(function(block){
        block.date = parseAppointmentBlockDate(block.appointmentBlock)
        block.patients = parsePatients(block.appointments);
    });
    return appointmentBlocks;
};




