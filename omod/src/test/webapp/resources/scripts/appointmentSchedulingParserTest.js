var telephoneAttributeTypeName = "Telephone Number";

describe('AppointmentSchedulingParser tests', function() {
    var appointmentScheduling =   [
        {
            "appointmentBlock": {
                "uuid": "d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 16:00:00.0 - 2014-02-14 21:00:00.0",
                "startDate": "2014-02-14T16:00:00.000-0200",
                "endDate": "2014-02-14T21:00:00.000-0200",
                "provider": {
                    "uuid": "7f32a747-e410-4b41-9e60-41a31d50c20e",
                    "display": "MADED - canchanya pamela",
                    "person": {
                        "uuid": "f9c8d182-0424-41f4-b9e7-e83beec95245",
                        "display": "canchanya pamela"
                    },
                    "identifier": "MADED",
                    "attributes": [],
                    "retired": false
                },
                "location": {
                    "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                    "display": "Biwo Resepsyon"
                },
                "types": [
                    {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles"
                    }
                ],
                "voided": false
            },
            "appointments": [
                {
                    "uuid": "5421559c-fb9d-4ed5-9348-e61a2f90fc9c",
                    "display": "Charles : Scheduled",
                    "timeSlot": {
                        "uuid": "1f32a270-f4cd-4228-ae33-0fcec259948b",
                        "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 16:00:00.0 - 2014-02-14 17:00:00.0",
                        "startDate": "2014-02-14T16:00:00.000-0200",
                        "endDate": "2014-02-14T17:00:00.000-0200",
                        "appointmentBlock": {
                            "uuid": "d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                            "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 16:00:00.0 - 2014-02-14 21:00:00.0",
                            "startDate": "2014-02-14T16:00:00.000-0200",
                            "endDate": "2014-02-14T21:00:00.000-0200",
                            "provider": {
                                "uuid": "7f32a747-e410-4b41-9e60-41a31d50c20e",
                                "display": "MADED - canchanya pamela",
                                "person": {
                                    "uuid": "f9c8d182-0424-41f4-b9e7-e83beec95245",
                                    "display": "canchanya pamela"
                                },
                                "identifier": "MADED",
                                "attributes": [],
                                "retired": false,
                                "resourceVersion": "1.9"
                            },
                            "location": {
                                "display": "Biwo Resepsyon"
                            },
                            "types": [
                                {
                                    "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                    "display": "Charles"
                                }
                            ],
                            "voided": false
                        },
                        "voided": false
                    },
                    "visit": null,
                    "patient": {
                        "uuid": "3abda79b-809a-4eca-b428-67f606fbae42",
                        "display": "Y2GAWR - pamela pamela",
                        "identifiers": [
                            {
                                "uuid": "0ba3dcd2-929b-4800-9557-a9cbcb7bef98",
                                "display": "ZL EMR ID = Y2GAWR"
                            },
                            {
                                "uuid": "7255195d-de1d-42a2-ae8b-e5fa5d594de2",
                                "display": "Nimewo Dosye = A000015"
                            }
                        ],
                        "person": {
                            "uuid": "3abda79b-809a-4eca-b428-67f606fbae42",
                            "display": "pamela pamela",
                            "gender": "M",
                            "age": 2,
                            "birthdate": "2012-01-12T00:00:00.000-0200",
                            "birthdateEstimated": false,
                            "dead": false,
                            "deathDate": null,
                            "causeOfDeath": null,
                            "preferredName": {
                                "uuid": "5f019e7f-1fa2-440d-b200-d73660531863",
                                "display": "pamela pamela",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/3abda79b-809a-4eca-b428-67f606fbae42/name/5f019e7f-1fa2-440d-b200-d73660531863",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "preferredAddress": {
                                "uuid": "2871df0e-f902-4e20-98c0-141f4427a8ef",
                                "display": "Lima",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/3abda79b-809a-4eca-b428-67f606fbae42/address/2871df0e-f902-4e20-98c0-141f4427a8ef",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "attributes": [],
                            "voided": false
                        },
                        "voided": false
                    },
                    "status": {
                        "code": "WAITING",
                        "name": "Waiting",
                        "active": true,
                        "cancelled": false
                    },
                    "reason": "I'm to sick",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles"
                    },
                    "voided": false
                },
                {
                    "uuid": "59ba2915-def0-4031-a7b3-a371231914c6",
                    "display": "Charles : Scheduled",
                    "timeSlot": {
                        "uuid": "551397bb-521e-4e42-af67-2aef15f5d65f",
                        "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 19:00:00.0 - 2014-02-14 20:00:00.0",
                        "startDate": "2014-02-14T19:00:00.000-0200",
                        "endDate": "2014-02-14T20:00:00.000-0200",
                        "appointmentBlock": {
                            "uuid": "d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                            "display": "canchanya pamela, Biwo Resepsyon: 2014-02-14 16:00:00.0 - 2014-02-14 21:00:00.0",
                            "startDate": "2014-02-14T16:00:00.000-0200",
                            "endDate": "2014-02-14T21:00:00.000-0200",
                            "provider": {
                                "uuid": "7f32a747-e410-4b41-9e60-41a31d50c20e",
                                "display": "MADED - canchanya pamela",
                                "person": {
                                    "uuid": "f9c8d182-0424-41f4-b9e7-e83beec95245",
                                    "display": "canchanya pamela"
                                },
                                "identifier": "MADED",
                                "attributes": [],
                                "retired": false
                            },
                            "location": {
                                "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                "display": "Biwo Resepsyon"
                            },
                            "types": [
                                {
                                    "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                    "display": "Charles"
                                }
                            ],
                            "voided": false
                        },
                        "voided": false
                    },
                    "visit": null,
                    "patient": {
                        "uuid": "28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                        "display": "Y2GHPW - Mario Areias",
                        "identifiers": [
                            {
                                "uuid": "c6283c7c-3398-4bcc-8b35-734764a94304",
                                "display": "ZL EMR ID = Y2GHPW"
                            }
                        ],
                        "person": {
                            "uuid": "28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                            "display": "Mario Areias",
                            "gender": "M",
                            "age": 43,
                            "birthdate": "1970-06-19T00:00:00.000-0300",
                            "birthdateEstimated": false,
                            "dead": false,
                            "deathDate": null,
                            "causeOfDeath": null,
                            "preferredName": {
                                "uuid": "6c33a8f8-498f-4d5c-8b0f-0bf181cf2623",
                                "display": "Mario Areias"
                            },
                            "preferredAddress": {
                                "uuid": "aaa341c8-cdac-4100-8152-a1d589fb8b70",
                                "display": "Cange"
                            },
                            "attributes": [
                                {
                                    "uuid": "5e11cda8-6755-4cbe-bc1d-5b6a68b82bbe",
                                    "display": "Telephone Number = 123123123"
                                }
                            ],
                            "voided": false
                        },
                        "voided": false
                    },
                    "status": {
                        "code": "SCHEDULED",
                        "name": "Scheduled",
                        "active": false,
                        "cancelled": false
                    },
                    "reason": "hola doctor",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles"
                    },
                    "voided": false
                }

            ]
        },
        {
            "appointmentBlock": {
        "uuid": "08cb1ff1-57d5-4379-a241-172773239feb",
            "display": "null, Dantis: 2014-03-11 14:00:00.0 - 2014-03-11 18:00:00.0",
            "startDate": "2014-03-11T14:00:00.000-0400",
            "endDate": "2014-03-11T18:00:00.000-0400",
            "provider": null,
            "location": {
            "uuid": "4f2d9af1-7eec-4228-bbd6-7b0774c6c267",
                "display": "Dantis"
        },
        "types": [
            {
                "uuid": "e0524fbf-37ae-4444-828e-8067a3533011",
                "display": "Dental - Extraction"
            }
        ],
            "voided": false,
            "resourceVersion": "1.8"
    },
            "appointments": [
        {
            "uuid": "a87a42b5-5bc2-4e1f-ab62-f25e13c56974",
            "display": "Dental - Extraction : Scheduled",
            "timeSlot": {
                "uuid": "7135721f-1fe0-496e-9370-f8d59bbeb0a4",
                "display": "null, Dantis: 2014-03-11 14:00:00.0 - 2014-03-11 18:00:00.0",
                "startDate": "2014-03-11T14:00:00.000-0400",
                "endDate": "2014-03-11T18:00:00.000-0400",
                "appointmentBlock": {
                    "uuid": "08cb1ff1-57d5-4379-a241-172773239feb",
                    "display": "null, Dantis: 2014-03-11 14:00:00.0 - 2014-03-11 18:00:00.0",
                    "startDate": "2014-03-11T14:00:00.000-0400",
                    "endDate": "2014-03-11T18:00:00.000-0400",
                    "provider": null,
                    "location": {
                        "uuid": "4f2d9af1-7eec-4228-bbd6-7b0774c6c267",
                        "display": "Dantis"
                    },
                    "types": [
                        {
                            "uuid": "e0524fbf-37ae-4444-828e-8067a3533011",
                            "display": "Dental - Extraction"
                        }
                    ],
                    "voided": false
                },
                "countOfAppointments": 2,
                "unallocatedMinutes": 180,
                "voided": false
            },
            "visit": null,
            "patient": {
                "uuid": "10cb80ee-a5cb-40ad-9772-090ceaaff28d",
                "display": "Y2APTX - Glauber Ramos",
                "identifiers": [
                    {
                        "uuid": "d12cedb5-6c20-4f82-b74e-c2dd3333fe83",
                        "display": "ZL EMR ID = Y2APTX"
                    },
                    {
                        "uuid": "b9ad83d3-5b58-43f9-896d-3da33ad83573",
                        "display": "Nimewo Dosye = A000099"
                    }
                ],
                "person": {
                    "uuid": "10cb80ee-a5cb-40ad-9772-090ceaaff28d",
                    "display": "Glauber Ramos",
                    "gender": "M",
                    "age": 27,
                    "birthdate": "1987-01-22T00:00:00.000-0500",
                    "birthdateEstimated": false,
                    "dead": false,
                    "deathDate": null,
                    "causeOfDeath": null,
                    "preferredName": {
                        "uuid": "46bbd3ba-98d3-4eb5-9bca-d74048503a7d",
                        "display": "Glauber Ramos"
                    },
                    "preferredAddress": {
                        "uuid": "2c3b014d-d730-40f1-ab83-0295090cae6e",
                        "display": "des"
                    },
                    "attributes": [
                        {
                            "uuid": "da3a0769-72d9-4c48-a22d-6af90684932d",
                            "display": "Telephone Number = 123123"
                        }
                    ],
                    "voided": false
                },
                "voided": false
            },
            "status": {
                "code": "SCHEDULED",
                "name": "Scheduled",
                "active": false,
                "cancelled": false
            },
            "reason": null,
            "appointmentType": {
                "uuid": "e0524fbf-37ae-4444-828e-8067a3533011",
                "display": "Dental - Extraction"
            },
            "voided": false
        },
        {
            "uuid": "e7cc4637-85a4-487d-8998-681fb916efde",
            "display": "Dental - Extraction : Scheduled",
            "timeSlot": {
                "uuid": "7135721f-1fe0-496e-9370-f8d59bbeb0a4",
                "display": "null, Dantis: 2014-03-11 14:00:00.0 - 2014-03-11 18:00:00.0",
                "startDate": "2014-03-11T14:00:00.000-0400",
                "endDate": "2014-03-11T18:00:00.000-0400",
                "appointmentBlock": {
                    "uuid": "08cb1ff1-57d5-4379-a241-172773239feb",
                    "display": "null, Dantis: 2014-03-11 14:00:00.0 - 2014-03-11 18:00:00.0",
                    "startDate": "2014-03-11T14:00:00.000-0400",
                    "endDate": "2014-03-11T18:00:00.000-0400",
                    "provider": null,
                    "location": {
                        "uuid": "4f2d9af1-7eec-4228-bbd6-7b0774c6c267",
                        "display": "Dantis"
                    },
                    "types": [
                        {
                            "uuid": "e0524fbf-37ae-4444-828e-8067a3533011",
                            "display": "Dental - Extraction",
                            "links": [
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/e0524fbf-37ae-4444-828e-8067a3533011",
                                    "rel": "self"
                                }
                            ]
                        }
                    ],
                    "voided": false
                },
                "countOfAppointments": 2,
                "unallocatedMinutes": 180,
                "voided": false
            },
            "visit": null,
            "patient": {
                "uuid": "4e1068b6-e5c7-4178-b1b2-c2a6816a5a37",
                "display": "Y2AEHR - Neissi Orser",
                "identifiers": [
                    {
                        "uuid": "d6e8775f-cdb5-40cf-9ddc-e60f20c2b4f3",
                        "display": "ZL EMR ID = Y2AEHR"
                    },
                    {
                        "uuid": "cb7e022d-6c4d-436c-a0e0-580555bb850f",
                        "display": "Nimewo Dosye = A000397"
                    }
                ],
                "person": {
                    "uuid": "4e1068b6-e5c7-4178-b1b2-c2a6816a5a37",
                    "display": "Neissi Orser",
                    "gender": "M",
                    "age": 55,
                    "birthdate": "1959-01-06T00:00:00.000-0500",
                    "birthdateEstimated": false,
                    "dead": false,
                    "deathDate": null,
                    "causeOfDeath": null,
                    "preferredName": {
                        "uuid": "a356a3d9-346c-4056-b9f0-6e56ae3d71f9",
                        "display": "Neissi Orser"
                    },
                    "preferredAddress": {
                        "uuid": "54575e07-a6da-4a67-8304-facdd9f9ad7a",
                        "display": "Mirebalais"
                    },
                    "attributes": [
                        {
                            "uuid": "8ff515a0-7891-474e-a0ca-4951d6ebc0e6",
                            "display": "Telephone Number = 11111111"
                        }
                    ],
                    "voided": false
                },
                "voided": false
            },
            "status": {
                "code": "SCHEDULED",
                "name": "Scheduled",
                "active": false,
                "cancelled": false
            },
            "reason": null,
            "appointmentType": {
                "uuid": "e0524fbf-37ae-4444-828e-8067a3533011",
                "display": "Dental - Extraction"
            },
            "voided": false
        }
    ]
        }
    ];

    var parsedScheduledAppointmentBlocks = [];
    var scope, parse;

    beforeEach( function() {

        module('appointmentSchedulingParse');
        inject(function ($rootScope, $injector) {
            scope = $rootScope.$new();
            parse = $injector.get('Parse');
        });
        parsedScheduledAppointmentBlocks = parse.scheduledAppointmentBlocks(appointmentScheduling);
    });

    it('should parse scheduled appointment blocks', function () {
        expect(parsedScheduledAppointmentBlocks.length).toBe(2);
    });

    it('should parse date range of a scheduled appointment block', function (){
        expect(parsedScheduledAppointmentBlocks[0].date).toBe(moment("2014-02-14T16:00:00.000-0200").format("hh:mm a")
            + " - " + moment("2014-02-14T21:00:00.000-0200").format("hh:mm a"));
    })

    it('should parse provider of a scheduled appointment block', function() {
        expect(parsedScheduledAppointmentBlocks[0].provider).toBe("canchanya pamela");
    });

    it('should parse provider of a scheduled appointment block without provider assigned', function(){
        var expected = "No provider assigned";
        expect(parsedScheduledAppointmentBlocks[1].provider).toBe(expected);
    });

    describe('when parse patient information of a scheduled appointment block', function() {
        var patientsScheduled;
        var firstPatient;
        var secondPatient;

        beforeEach( function() {
            patientsScheduled = parsedScheduledAppointmentBlocks[0].patients;
            firstPatient = patientsScheduled[0];
            secondPatient = patientsScheduled[1];
        });

        it('should parse patients', function() {
            expect(patientsScheduled.length).toBe(2);
        })

        it('should parse service type of appointment', function() {
            expect(firstPatient.serviceType.name).toBe("Charles");
            expect(firstPatient.serviceType.uuid).toBe("de4f6849-1b0a-4d7d-9d89-c19b6040bec5");

            expect(secondPatient.serviceType.name).toBe("Charles");
            expect(secondPatient.serviceType.uuid).toBe("de4f6849-1b0a-4d7d-9d89-c19b6040bec5");
        });

        it('should parse personal patient information', function() {
            expect(firstPatient.name).toBe("Mario Areias");
            expect(firstPatient.primaryIdentifier).toBe("Y2GHPW");
            expect(firstPatient.dossierNumber).toBe("");
            expect(firstPatient.phoneNumber).toBe("123123123");

            expect(secondPatient.name).toBe("pamela pamela");
            expect(secondPatient.primaryIdentifier).toBe("Y2GAWR");
            expect(secondPatient.dossierNumber).toBe("A000015");
            expect(secondPatient.phoneNumber).toBe("");
        });

        it('appointment message status should be "Checked-in" when status is Waiting, Walking or Consulting', function() {
            expect(secondPatient.appointmentStatus.message).toBe("Checked-in");
            expect(secondPatient.appointmentStatus.active).toBe(true);
        });

        it('appointment message status should be empty when status is Scheduling', function() {
            expect(firstPatient.appointmentStatus.message).toBe("");
            expect(firstPatient.appointmentStatus.active).toBe(false);
        });
    });
});