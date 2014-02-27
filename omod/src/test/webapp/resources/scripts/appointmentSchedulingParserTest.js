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
                    "retired": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/provider/7f32a747-e410-4b41-9e60-41a31d50c20e",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/provider/7f32a747-e410-4b41-9e60-41a31d50c20e?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.9"
                },
                "location": {
                    "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                    "display": "Biwo Resepsyon",
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/location/787a2422-a7a2-400e-bdbb-5c54b2691af5",
                            "rel": "self"
                        }
                    ]
                },
                "types": [
                    {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                "rel": "self"
                            }
                        ]
                    }
                ],
                "voided": false,
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                        "rel": "self"
                    },
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b?v=full",
                        "rel": "full"
                    }
                ],
                "resourceVersion": "1.8"
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
                                    "display": "canchanya pamela",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/f9c8d182-0424-41f4-b9e7-e83beec95245",
                                            "rel": "self"
                                        }
                                    ]
                                },
                                "identifier": "MADED",
                                "attributes": [],
                                "retired": false,
                                "resourceVersion": "1.9"
                            },
                            "location": {
                                "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                "display": "Biwo Resepsyon",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/location/787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "types": [
                                {
                                    "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                    "display": "Charles",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                            "rel": "self"
                                        }
                                    ]
                                }
                            ],
                            "voided": false,
                            "links": [
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                                    "rel": "self"
                                },
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b?v=full",
                                    "rel": "full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "voided": false,
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/timeslot/1f32a270-f4cd-4228-ae33-0fcec259948b",
                                "rel": "self"
                            },
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/timeslot/1f32a270-f4cd-4228-ae33-0fcec259948b?v=full",
                                "rel": "full"
                            }
                        ],
                        "resourceVersion": "1.8"
                    },
                    "visit": null,
                    "patient": {
                        "uuid": "3abda79b-809a-4eca-b428-67f606fbae42",
                        "display": "Y2GAWR - pamela pamela",
                        "identifiers": [
                            {
                                "uuid": "0ba3dcd2-929b-4800-9557-a9cbcb7bef98",
                                "display": "ZL EMR ID = Y2GAWR",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/3abda79b-809a-4eca-b428-67f606fbae42/identifier/0ba3dcd2-929b-4800-9557-a9cbcb7bef98",
                                        "rel": "self"
                                    }
                                ]
                            },
                            {
                                "uuid": "7255195d-de1d-42a2-ae8b-e5fa5d594de2",
                                "display": "Nimewo Dosye = A000015",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/3abda79b-809a-4eca-b428-67f606fbae42/identifier/7255195d-de1d-42a2-ae8b-e5fa5d594de2",
                                        "rel": "self"
                                    }
                                ]
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
                            "attributes": [
                                {
                                    "uuid": "65dc8128-61ff-40ca-ac22-3fe01bccf68e",
                                    "display": "Telephone Number = 123123123",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/3abda79b-809a-4eca-b428-67f606fbae42/attribute/65dc8128-61ff-40ca-ac22-3fe01bccf68e",
                                            "rel": "self"
                                        }
                                    ]
                                }
                            ],
                            "voided": false,
                            "links": [
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/3abda79b-809a-4eca-b428-67f606fbae42",
                                    "rel": "self"
                                },
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/3abda79b-809a-4eca-b428-67f606fbae42?v=full",
                                    "rel": "full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "voided": false,
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/3abda79b-809a-4eca-b428-67f606fbae42",
                                "rel": "self"
                            },
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/3abda79b-809a-4eca-b428-67f606fbae42?v=full",
                                "rel": "full"
                            }
                        ],
                        "resourceVersion": "1.8"
                    },
                    "status": "SCHEDULED",
                    "reason": "I'm to sick",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                "rel": "self"
                            }
                        ]
                    },
                    "voided": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointment/5421559c-fb9d-4ed5-9348-e61a2f90fc9c",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointment/5421559c-fb9d-4ed5-9348-e61a2f90fc9c?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.8"
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
                                    "display": "canchanya pamela",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/f9c8d182-0424-41f4-b9e7-e83beec95245",
                                            "rel": "self"
                                        }
                                    ]
                                },
                                "identifier": "MADED",
                                "attributes": [],
                                "retired": false,
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/provider/7f32a747-e410-4b41-9e60-41a31d50c20e",
                                        "rel": "self"
                                    },
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/provider/7f32a747-e410-4b41-9e60-41a31d50c20e?v=full",
                                        "rel": "full"
                                    }
                                ],
                                "resourceVersion": "1.9"
                            },
                            "location": {
                                "uuid": "787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                "display": "Biwo Resepsyon",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/location/787a2422-a7a2-400e-bdbb-5c54b2691af5",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "types": [
                                {
                                    "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                    "display": "Charles",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                            "rel": "self"
                                        }
                                    ]
                                }
                            ],
                            "voided": false,
                            "links": [
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b",
                                    "rel": "self"
                                },
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/d4f488c4-7660-4e8b-9b77-9de6f7a6371b?v=full",
                                    "rel": "full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "voided": false,
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/timeslot/551397bb-521e-4e42-af67-2aef15f5d65f",
                                "rel": "self"
                            },
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/timeslot/551397bb-521e-4e42-af67-2aef15f5d65f?v=full",
                                "rel": "full"
                            }
                        ],
                        "resourceVersion": "1.8"
                    },
                    "visit": null,
                    "patient": {
                        "uuid": "28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                        "display": "Y2GHPW - Mario Areias",
                        "identifiers": [
                            {
                                "uuid": "c6283c7c-3398-4bcc-8b35-734764a94304",
                                "display": "ZL EMR ID = Y2GHPW",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/28f84d05-2ed7-416d-8d7b-3ac1d118a21c/identifier/c6283c7c-3398-4bcc-8b35-734764a94304",
                                        "rel": "self"
                                    }
                                ]
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
                                "display": "Mario Areias",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/28f84d05-2ed7-416d-8d7b-3ac1d118a21c/name/6c33a8f8-498f-4d5c-8b0f-0bf181cf2623",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "preferredAddress": {
                                "uuid": "aaa341c8-cdac-4100-8152-a1d589fb8b70",
                                "display": "Cange",
                                "links": [
                                    {
                                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/28f84d05-2ed7-416d-8d7b-3ac1d118a21c/address/aaa341c8-cdac-4100-8152-a1d589fb8b70",
                                        "rel": "self"
                                    }
                                ]
                            },
                            "attributes": [
                                {
                                    "uuid": "5e11cda8-6755-4cbe-bc1d-5b6a68b82bbe",
                                    "display": "Telephone Number = 123123123",
                                    "links": [
                                        {
                                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/28f84d05-2ed7-416d-8d7b-3ac1d118a21c/attribute/5e11cda8-6755-4cbe-bc1d-5b6a68b82bbe",
                                            "rel": "self"
                                        }
                                    ]
                                }
                            ],
                            "voided": false,
                            "links": [
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                                    "rel": "self"
                                },
                                {
                                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/28f84d05-2ed7-416d-8d7b-3ac1d118a21c?v=full",
                                    "rel": "full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "voided": false,
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/28f84d05-2ed7-416d-8d7b-3ac1d118a21c",
                                "rel": "self"
                            },
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/28f84d05-2ed7-416d-8d7b-3ac1d118a21c?v=full",
                                "rel": "full"
                            }
                        ],
                        "resourceVersion": "1.8"
                    },
                    "status": "SCHEDULED",
                    "reason": "hola doctor",
                    "appointmentType": {
                        "uuid": "de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                        "display": "Charles",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/de4f6849-1b0a-4d7d-9d89-c19b6040bec5",
                                "rel": "self"
                            }
                        ]
                    },
                    "voided": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointment/59ba2915-def0-4031-a7b3-a371231914c6",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointment/59ba2915-def0-4031-a7b3-a371231914c6?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.8"
                }
            ]
        }
    ];

    it('should parse scheduled appointment blocks', function() {
        var parsedScheduledAppointmentBlocks = appointmentParser.parseScheduledAppointmentBlocks(appointmentScheduling);

        expect(parsedScheduledAppointmentBlocks.length).toBe(1);

        expect(parsedScheduledAppointmentBlocks[0].date).toBe(moment("2014-02-14T16:00:00.000-0200").format("HH:mm a")
            + " - " + moment("2014-02-14T21:00:00.000-0200").format("HH:mm a"));
        expect(parsedScheduledAppointmentBlocks[0].patients.length).toBe(2);
        expect(parsedScheduledAppointmentBlocks[0].patients[0]).toBe("pamela pamela (Charles)");
        expect(parsedScheduledAppointmentBlocks[0].patients[1]).toBe("Mario Areias (Charles)");
        expect(parsedScheduledAppointmentBlocks[0].patientsIdentifierPrimary.length).toBe(2);
        expect(parsedScheduledAppointmentBlocks[0].patientsIdentifierDossier.length).toBe(1);

    });

});