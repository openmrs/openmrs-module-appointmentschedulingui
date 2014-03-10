var appointmentParser = appointmentParser || {};

appointmentParser.parseScheduledAppointmentBlocks = function(scheduledAppointmentBlocks){

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

    var parseAppointmentBlockProvider = function (data){
        return data.provider.person.display;
    }

    var findServicesWithAppointments = function () {
        var services = [];
        this.patients.forEach(function (patient) {
          var service = patient.serviceType;
          var indexService = services.indexOf(service);
           if(indexService == -1)
          services.push(patient.serviceType);
        });
        return services;
    }

    var parsedScheduledAppointmentBlocks = [];

    scheduledAppointmentBlocks.forEach(function(block){
        parsedScheduledAppointmentBlock = {};
        parsedScheduledAppointmentBlock.date = parseAppointmentBlockDate(block.appointmentBlock);
        parsedScheduledAppointmentBlock.provider = parseAppointmentBlockProvider(block.appointmentBlock);
        parsedScheduledAppointmentBlock.patients = parsePatients(block.appointments);
        parsedScheduledAppointmentBlock.servicesWithAppointments = findServicesWithAppointments;
        parsedScheduledAppointmentBlocks.push(parsedScheduledAppointmentBlock);
    });
    return parsedScheduledAppointmentBlocks;
};




