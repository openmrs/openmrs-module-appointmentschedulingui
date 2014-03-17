var appointmentParser = appointmentParser || {};

appointmentParser.parseScheduledAppointmentBlocks = function(scheduledAppointmentBlocks){

    var parseAppointmentBlockDate = function(data){
        return  moment(data.startDate).format("hh:mm a") + " - " + moment(data.endDate).format("hh:mm a");
    };

    var parsePatients = function(data){
        var patients = [];

        data.forEach(function(appointment){
            var patientInformation = {
                name: appointment.patient.person.display,
                serviceType: {
                    name: appointment.appointmentType.display,
                    uuid: appointment.appointmentType.uuid
                },
                primaryIdentifier: parsePrimaryIdentifier(appointment.patient.display),
                dossierNumber: parseDossierNumber(appointment.patient.identifiers)
            };

            patients.push(patientInformation);
        });

        function comparePatientsName(patientA,patientB) {
            if (patientA.name < patientB.name)
                return -1;
            if (patientA.name > patientB.name)
                return 1;
            return 0;
        }

        return patients.sort(comparePatientsName);
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

    var parseAppointmentBlockProvider = function (data){
        if(data.provider) return data.provider.person.display;
        else return 'No provider assigned';
    }

    var parsedScheduledAppointmentBlocks = [];

    scheduledAppointmentBlocks.forEach(function(block){
        parsedScheduledAppointmentBlock = {};
        parsedScheduledAppointmentBlock.date = parseAppointmentBlockDate(block.appointmentBlock);
        parsedScheduledAppointmentBlock.provider = parseAppointmentBlockProvider(block.appointmentBlock);
        parsedScheduledAppointmentBlock.patients = parsePatients(block.appointments);
        parsedScheduledAppointmentBlocks.push(parsedScheduledAppointmentBlock);
    });
    return parsedScheduledAppointmentBlocks;
};




