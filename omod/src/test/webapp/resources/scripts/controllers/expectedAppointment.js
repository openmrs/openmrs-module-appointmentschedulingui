var upcomingAppointmentsTest = upcomingAppointmentsTest || {};

upcomingAppointmentsTest.expectedAppointment = [{
    "uuid": "3816596c-0d50-4cd0-aab5-922516bc9fa4",
    "display": "New Dental : Rescheduled",
    "timeSlot": {
        "uuid": "0900f59f-e04d-49ae-8813-df02808b1dd1",
        "display": "Areias Mario, Chimyoterapi: 2014-04-02 08:00:00.0 - 2014-04-02 11:00:00.0",
        "startDate": "2014-04-02T08:00:00.000-0400",
        "endDate": "2014-04-02T11:00:00.000-0400",
        "appointmentBlock": {
            "uuid": "e17993e4-0074-4e1b-a38f-7fa1f31c27a1",
            "display": "Areias Mario, Chimyoterapi: 2014-04-02 08:00:00.0 - 2014-04-02 11:00:00.0",
            "startDate": "2014-04-02T08:00:00.000-0400",
            "endDate": "2014-04-02T11:00:00.000-0400",
            "provider": {
                "uuid": "b34612f9-3414-45b0-bfe9-e8a3a1d67219",
                "display": "MAADH - Areias Mario",
                "person": {
                    "uuid": "896f5c76-2a2a-47b9-a246-c453c537985a",
                    "display": "Areias Mario",
                    "gender": "M",
                    "age": null,
                    "birthdate": null,
                    "birthdateEstimated": false,
                    "dead": false,
                    "deathDate": null,
                    "causeOfDeath": null,
                    "preferredName": {
                        "uuid": "6f36bbb7-3a95-4476-85c1-47abd4d14e7d",
                        "display": "Areias Mario",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/896f5c76-2a2a-47b9-a246-c453c537985a/name/6f36bbb7-3a95-4476-85c1-47abd4d14e7d",
                                "rel": "self"
                            }
                        ]
                    },
                    "preferredAddress": null,
                    "attributes": [],
                    "voided": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/896f5c76-2a2a-47b9-a246-c453c537985a",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/896f5c76-2a2a-47b9-a246-c453c537985a?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.8"
                },
                "identifier": "MAADH",
                "attributes": [],
                "retired": false,
                "auditInfo": {
                    "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                    "display": "admin",
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                            "rel": "self"
                        }
                    ]
                },
                "dateCreated": "2013-12-12T19:20:06.000-0500",
                "changedBy": {
                    "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                    "display": "admin",
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                            "rel": "self"
                        }
                    ]
                },
                "dateChanged": "2013-12-12T19:20:06.000-0500"
            },
            "links": [
                {
                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/provider/b34612f9-3414-45b0-bfe9-e8a3a1d67219",
                    "rel": "self"
                }
            ],
            "resourceVersion": "1.9"
        },
        "location": {
            "uuid": "dc8413be-1075-48b5-9857-9bd4954686ed",
            "display": "Chimyoterapi",
            "name": "Chimyoterapi",
            "description": "Chemotherapy at Mirebalais Hospital",
            "address1": null,
            "address2": null,
            "cityVillage": null,
            "stateProvince": null,
            "country": null,
            "postalCode": null,
            "latitude": null,
            "longitude": null,
            "countyDistrict": null,
            "address3": null,
            "address4": null,
            "address5": null,
            "address6": null
        },
        "types": [
            {
                "uuid": "a551a377-8fab-4155-a40d-b0f45cd0cc0c",
                "display": "New Dental",
                "name": "New Dental",
                "description": null,
                "duration": 60,
                "retired": false,
                "auditInfo": {
                    "creator": {
                        "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                        "display": "admin",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                                "rel": "self"
                            }
                        ]
                    },
                    "dateCreated": "2014-03-31T13:53:55.000-0400",
                    "changedBy": null,
                    "dateChanged": null
                },
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/a551a377-8fab-4155-a40d-b0f45cd0cc0c",
                        "rel": "self"
                    }
                ],
                "resourceVersion": "1.8"
            }
        ],
        "voided": false,
        "auditInfo": {
            "creator": {
                "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                "display": "admin",
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                        "rel": "self"
                    }
                ]
            },
            "dateCreated": "2014-04-01T14:02:04.000-0400",
            "changedBy": null,
            "dateChanged": null
        },
        "links": [
            {
                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmentblockwithtimeslot/e17993e4-0074-4e1b-a38f-7fa1f31c27a1",
                "rel": "self"
            }
        ],
        "resourceVersion": "1.8"
    },
    "countOfAppointments": 1,
    "unallocatedMinutes": 120,
    "voided": false,
    "auditInfo": {
        "creator": {
            "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
            "display": "admin",
            "links": [
                {
                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                    "rel": "self"
                }
            ]
        },
        "dateCreated": "2014-04-01T14:02:04.000-0400",
        "changedBy": null,
        "dateChanged": null
    },
    "links": [
        {
            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/timeslot/0900f59f-e04d-49ae-8813-df02808b1dd1",
            "rel": "self"
        }
    ],
    "resourceVersion": "1.8"
    ,
    "visit": null,
    "patient":  {
        "uuid": "ba58033f-3e1a-49aa-8089-18c86f7d49dd",
        "display": "Y2CC4K - Mario Areias",
        "identifiers": [
            {
                "display": "ZL EMR ID = Y2CC4K",
                "uuid": "716d3e75-f98c-4b3d-bced-b88ce1b959aa",
                "identifier": "Y2CC4K",
                "identifierType": {
                    "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
                    "display": "ZL EMR ID",
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85",
                            "rel": "self"
                        }
                    ]
                },
                "location": {
                    "uuid": "a084f714-a536-473b-94e6-ec317b152b43",
                    "display": "Hôpital Universitaire de Mirebalais",
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/location/a084f714-a536-473b-94e6-ec317b152b43",
                            "rel": "self"
                        }
                    ]
                },
                "preferred": true,
                "voided": false,
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/ba58033f-3e1a-49aa-8089-18c86f7d49dd/identifier/716d3e75-f98c-4b3d-bced-b88ce1b959aa",
                        "rel": "self"
                    },
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/ba58033f-3e1a-49aa-8089-18c86f7d49dd/identifier/716d3e75-f98c-4b3d-bced-b88ce1b959aa?v=full",
                        "rel": "full"
                    }
                ],
                "resourceVersion": "1.8"
            }
        ],
        "person": {
            "uuid": "ba58033f-3e1a-49aa-8089-18c86f7d49dd",
            "display": "Mario Areias",
            "gender": "M",
            "age": 27,
            "birthdate": "1986-06-19T00:00:00.000-0400",
            "birthdateEstimated": false,
            "dead": false,
            "deathDate": null,
            "causeOfDeath": null,
            "preferredName": {
                "display": "Mario Areias",
                "uuid": "b94af758-2007-4c93-be2f-b2435e4319dd",
                "givenName": "Mario",
                "middleName": null,
                "familyName": "Areias",
                "familyName2": null,
                "voided": false,
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/name/b94af758-2007-4c93-be2f-b2435e4319dd",
                        "rel": "self"
                    },
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/name/b94af758-2007-4c93-be2f-b2435e4319dd?v=full",
                        "rel": "full"
                    }
                ],
                "resourceVersion": "1.8"
            },
            "names": [
                {
                    "display": "Mario Areias",
                    "uuid": "b94af758-2007-4c93-be2f-b2435e4319dd",
                    "givenName": "Mario",
                    "middleName": null,
                    "familyName": "Areias",
                    "familyName2": null,
                    "voided": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/name/b94af758-2007-4c93-be2f-b2435e4319dd",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/name/b94af758-2007-4c93-be2f-b2435e4319dd?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.8"
                }
            ],
            "attributes": [
                {
                    "display": "Telephone Number = 147852",
                    "uuid": "a4b14a36-966a-4bfa-ac44-2ef81ff81f49",
                    "value": "147852",
                    "attributeType": {
                        "uuid": "14d4f066-15f5-102d-96e4-000c29c2a5d7",
                        "display": "Telephone Number",
                        "links": [
                            {
                                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/personattributetype/14d4f066-15f5-102d-96e4-000c29c2a5d7",
                                "rel": "self"
                            }
                        ]
                    },
                    "voided": false,
                    "links": [
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/attribute/a4b14a36-966a-4bfa-ac44-2ef81ff81f49",
                            "rel": "self"
                        },
                        {
                            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd/attribute/a4b14a36-966a-4bfa-ac44-2ef81ff81f49?v=full",
                            "rel": "full"
                        }
                    ],
                    "resourceVersion": "1.8"
                }
            ],
            "voided": false,
            "auditInfo": {
                "creator": null,
                "dateCreated": "2013-12-12T19:46:56.000-0500",
                "changedBy": null,
                "dateChanged": null
            },
            "links": [
                {
                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/person/ba58033f-3e1a-49aa-8089-18c86f7d49dd",
                    "rel": "self"
                }
            ],
            "resourceVersion": "1.8"
        },
        "voided": false,
        "auditInfo": {
            "creator": {
                "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                "display": "admin",
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                        "rel": "self"
                    }
                ]
            },
            "dateCreated": "2013-12-12T19:46:56.000-0500",
            "changedBy": null,
            "dateChanged": null
        },
        "links": [
            {
                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/patient/ba58033f-3e1a-49aa-8089-18c86f7d49dd",
                "rel": "self"
            }
        ],
        "resourceVersion": "1.8"
    } ,
    "status": {
        "code": "RESCHEDULED",
        "name": "Rescheduled",
        "type": "SCHEDULED"
    },
    "reason": "test",
    "cancelReason": null,
    "appointmentType": {
        "uuid": "a551a377-8fab-4155-a40d-b0f45cd0cc0c",
        "display": "New Dental",
        "name": "New Dental",
        "description": null,
        "duration": 60,
        "retired": false,
        "auditInfo": {
            "creator": {
                "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
                "display": "admin",
                "links": [
                    {
                        "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                        "rel": "self"
                    }
                ]
            },
            "dateCreated": "2014-03-31T13:53:55.000-0400",
            "changedBy": null,
            "dateChanged": null
        },
        "links": [
            {
                "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointmenttype/a551a377-8fab-4155-a40d-b0f45cd0cc0c",
                "rel": "self"
            }
        ],
        "resourceVersion": "1.8"
    },
    "voided": false,
    "auditInfo": {
        "creator": {
            "uuid": "a72eeb82-6292-11e3-a722-3812b03e2605",
            "display": "admin",
            "links": [
                {
                    "uri": "NEED-TO-CONFIGURE/ws/rest/v1/user/a72eeb82-6292-11e3-a722-3812b03e2605",
                    "rel": "self"
                }
            ]
        },
        "dateCreated": "2014-04-01T14:02:40.000-0400",
        "changedBy": null,
        "dateChanged": null
    },
    "links": [
        {
            "uri": "NEED-TO-CONFIGURE/ws/rest/v1/appointmentscheduling/appointment/3816596c-0d50-4cd0-aab5-922516bc9fa4",
            "rel": "self"
        }
    ],
    "resourceVersion": "1.8"
}];