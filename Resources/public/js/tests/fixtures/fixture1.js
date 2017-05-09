var fixture1Raw = "{\n    \"name\": \"input_mail\",\n    \"steps\": {\n        \"identity\": {\n            \"type\": \"form\",\n            \"options\": {\n                \"title\": \"Indiquez les informations consommateur\",\n                \"display_title\": false,\n                \"@builder\": {\n                    \"worker\": \"extra_form_builder\",\n                    \"parameters\": {\n                        \"configuration\": {\n                            \"civility\": {\n                                \"extra_form_type\": \"choice\",\n                                \"options\": {\n                                    \"label\": \"Civilité\",\n                                    \"choices\": {\n                                        \"M\": \"Mr\",\n                                        \"F\": \"Mme\"\n                                    },\n                                    \"multiple\": false,\n                                    \"expanded\": true\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"not_blank\",\n                                        \"options\": {\n                                            \"message\": \"saisie de la civilité obligatoire\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"last_name\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Nom\",\n                                    \"max_length\": 25,\n                                    \"pattern\": \"^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,25}$\",\n                                    \"attr\": {\n                                        \"title\": \"Votre nom ne peut contenir que des lettres majuscules et minuscules, des minuscules accentuées et des espaces\"\n                                    }\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"not_blank\",\n                                        \"options\": {\n                                            \"message\": \"Merci de renseigner votre nom\"\n                                        }\n                                    },\n                                    {\n                                        \"extra_form_constraint\": \"regex\",\n                                        \"options\": {\n                                            \"pattern\": \"#^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,25}$#\",\n                                            \"match\": true,\n                                            \"message\": \"Merci de renseigner correctement votre nom.\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"first_name\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Prénom\",\n                                    \"max_length\": 20,\n                                    \"pattern\": \"^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,20}$\",\n                                    \"attr\": {\n                                        \"title\": \"Votre prénom ne peut contenir que des lettres majuscules et minuscules, des minuscules accentuées et des espaces\"\n                                    }\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"not_blank\",\n                                        \"options\": {\n                                            \"message\": \"Merci de renseigner votre prénom\"\n                                        }\n                                    },\n                                    {\n                                        \"extra_form_constraint\": \"regex\",\n                                        \"options\": {\n                                            \"pattern\": \"#^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,20}$#\",\n                                            \"match\": true,\n                                            \"message\": \"Merci de renseigner correctement votre prénom.\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"address\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Adresse\",\n                                    \"max_length\": 38\n                                }\n                            },\n                            \"additional_address\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Complément d'adresse\",\n                                    \"required\": false,\n                                    \"max_length\": 38\n                                }\n                            },\n                            \"postal_code\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Code postal\",\n                                    \"max_length\": 5,\n                                    \"pattern\": \"^[0-9]{5}$\",\n                                    \"attr\": {\n                                        \"title\": \"Votre code postal doit comporter exactement 5 chiffres\"\n                                    }\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"regex\",\n                                        \"options\": {\n                                            \"pattern\": \"#^[0-9]{5}$#\",\n                                            \"match\": true,\n                                            \"message\": \"Merci de renseigner un code postal valide\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"city\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Ville\",\n                                    \"max_length\": 33,\n                                    \"pattern\": \"^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,33}$\",\n                                    \"attr\": {\n                                        \"title\": \"Votre ville ne peut contenir que des lettres majuscules et minuscules, des minuscules accentuées et des espaces\"\n                                    }\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"regex\",\n                                        \"options\": {\n                                            \"pattern\": \"#^[A-Za-z-àâäééèêëiîïoôöuùûüç ]{1,33}$#\",\n                                            \"match\": true,\n                                            \"message\": \"Merci de renseigner correctement votre ville.\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"identity_birthdate\": {\n                                \"extra_form_type\": \"tms_birthday\",\n                                \"options\": {\n                                    \"label\": \"Date de naissance\",\n                                    \"required\": 1,\n                                    \"format\": \"dd MM yyyy\",\n                                    \"empty_value\": \" \",\n                                    \"start_on\": \"1935\",\n                                    \"end_on\": \"2017\",\n                                    \"widget\": \"choice\",\n                                    \"input\": \"string\",\n                                    \"mapped\": 1\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"not_blank\",\n                                        \"options\": {\n                                            \"message\": \"Merci de renseigner votre date de naissance\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"email\": {\n                                \"extra_form_type\": \"email\",\n                                \"options\": {\n                                    \"label\": \"E-mail\",\n                                    \"max_length\": 99,\n                                    \"pattern\": \"^[a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*[.][a-zA-Z]{2,}$\"\n                                },\n                                \"constraints\": [\n                                    {\n                                        \"extra_form_constraint\": \"email\",\n                                        \"options\": {\n                                            \"message\": \"votre email doit être valide\"\n                                        }\n                                    },\n                                    {\n                                        \"extra_form_constraint\": \"not_blank\",\n                                        \"options\": {\n                                            \"message\": \"saisie de l'email obligatoire\"\n                                        }\n                                    },\n                                    {\n                                        \"extra_form_constraint\": \"regex\",\n                                        \"options\": {\n                                            \"pattern\": \"#^[A-Za-z0-9]{1,}([_|\\\\.|-]{1}[A-Za-z0-9]{1,})*@[A-Za-z0-9]{1,}([\\\\.|-]{1}[A-Za-z0-9]{1,})*[\\\\.]{1}[A-Za-z]{2,}$#\",\n                                            \"match\": true,\n                                            \"message\": \"Merci de renseigner correctement votre adresse email.\"\n                                        }\n                                    }\n                                ]\n                            },\n                            \"identity_phone\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Téléphone fixe\",\n                                    \"max_length\": 10,\n                                    \"pattern\": \"^0[12345679][0-9]{8}$\"\n                                }\n                            },\n                            \"identity_mobile_phone\": {\n                                \"extra_form_type\": \"text\",\n                                \"options\": {\n                                    \"label\": \"Téléphone mobile\",\n                                    \"max_length\": 10,\n                                    \"pattern\": \"^0[12345679][0-9]{8}$\"\n                                }\n                            }\n                        }\n                    }\n                },\n                \"events\": {\n                    \"form.pre_set_data\": [\n                        {\n                            \"action\": \"retrieve_request_data\",\n                            \"name\": \"retrieved_request_uri\",\n                            \"parameters\": {\n                                \"property\": \"attributes\",\n                                \"key\": \"_route_params\"\n                            }\n                        },\n                        {\n                            \"action\": \"retrieve_lot\",\n                            \"name\": \"retrieved_lot\",\n                            \"parameters\": {\n                                \"lot\": \"{{ '{{ flow_data.retrievedData.identity.retrieved_request_uri.id }}'}}\"\n                            }\n                        }\n                    ]\n                }\n            }\n        },\n        \"proofs\": {\n            \"type\": \"form\",\n            \"options\": {\n                \"title\": \"Preuves d'achat\",\n                \"display_title\": false,\n                \"@builder\": {\n                    \"worker\": \"extra_form_builder\",\n                    \"parameters\": {\n                        \"configuration\": {\n                            \"proof\": {\n                                \"extra_form_type\": \"extra_form_collection\",\n                                \"options\": {\n                                    \"label\": \" \",\n                                    \"type\": \"extra_form_builder\",\n                                    \"options\": {\n                                        \"configuration\": {\n                                            \"invoice_number\": {\n                                                \"extra_form_type\": \"text\",\n                                                \"options\": {\n                                                    \"label\": \"Numéro de facture\"\n                                                }\n                                            },\n                                            \"retailer_composite\": {\n                                                \"extra_form_type\": \"text\",\n                                                \"options\": {\n                                                    \"label\": \"Enseigne\"\n                                                }\n                                            },\n                                            \"purchase_date\": {\n                                                \"extra_form_type\": \"datetime\",\n                                                \"options\": {\n                                                    \"label\": \"Date d'achat\",\n                                                    \"widget\": \"choice\",\n                                                    \"date_format\": \"dd-MM-yyyy\"\n                                                }\n                                            },\n                                            \"purchase_amount\": {\n                                                \"extra_form_type\": \"number\",\n                                                \"options\": {\n                                                    \"label\": \"Montant total TTC de facture\",\n                                                    \"trim\": 1,\n                                                    \"max_length\": \"8\"\n                                                }\n                                            },\n                                            \"products\": {\n                                                \"extra_form_type\": \"extra_form_collection\",\n                                                \"options\": {\n                                                    \"label\": \" \",\n                                                    \"type\": \"extra_form_builder\",\n                                                    \"options\": {\n                                                        \"configuration\": {\n                                                            \"gtin\": {\n                                                                \"extra_form_type\": \"tms_gtin\",\n                                                                \"options\": {\n                                                                    \"label\": \"code-barres EAN\",\n                                                                    \"gtin_name\": \"EAN\",\n                                                                    \"api_request_url\": \"http://operation-manager.digifid.docker/api/customers/{{ participation.offer.customer.id }}/products\",\n                                                                    \"invalid_message\": \"\",\n                                                                    \"unknown_message\": \"Produit non reconnu\",\n                                                                    \"error_message\": \"Une erreur est survenue\",\n                                                                    \"searching_message\": \"Recherche du produit ...\"\n                                                                },\n                                                                \"constraints\": [\n                                                                    {\n                                                                        \"extra_form_constraint\": \"not_blank\",\n                                                                        \"options\": {\n                                                                            \"message\": \"Entrer un code-barres\"\n                                                                        }\n                                                                    },\n                                                                    {\n                                                                        \"extra_form_constraint\": \"tms_gtin_product\",\n                                                                        \"options\": {\n                                                                            \"message\": \"Produit non reconnu\",\n                                                                            \"gtinName\": \"EAN\",\n                                                                            \"customerId\": \"{{ participation.offer.customer.id }}\",\n                                                                            \"offerId\": \"{{ participation.offer.id }}\"\n                                                                        }\n                                                                    }\n                                                                ]\n                                                            },\n                                                            \"quantity\": {\n                                                                \"extra_form_type\": \"number\",\n                                                                \"options\": {\n                                                                    \"label\": \"Quantitée\",\n                                                                    \"required\": 0,\n                                                                    \"trim\": 1,\n                                                                    \"max_length\": \"6\"\n                                                                }\n                                                            },\n                                                            \"purchase_amount\": {\n                                                                \"extra_form_type\": \"number\",\n                                                                \"options\": {\n                                                                    \"label\": \"Montant produit\",\n                                                                    \"trim\": 1,\n                                                                    \"max_length\": \"6\"\n                                                                }\n                                                            }\n                                                        }\n                                                    },\n                                                    \"add_button\": {\n                                                        \"label\": \"+ Ajouter un produit\"\n                                                    },\n                                                    \"remove_button\": {\n                                                        \"label\": \"X Supprimer le produit\"\n                                                    },\n                                                    \"min_items\": 1,\n                                                    \"max_items\": 10\n                                                }\n                                            }\n                                        }\n                                    },\n                                    \"add_button\": {\n                                        \"label\": \"+ Ajouter une preuve d'achat\"\n                                    },\n                                    \"remove_button\": {\n                                        \"label\": \"X Supprimer la preuve d'achat\"\n                                    },\n                                    \"min_items\": 1,\n                                    \"max_items\": 10\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        },\n        \"benefit\": {\n            \"type\": \"form\",\n            \"options\": {\n                \"title\": \"Sélectionner le bénéfice\",\n                \"display_title\": false,\n                \"@builder\": {\n                    \"worker\": \"extra_form_builder\",\n                    \"parameters\": {\n                        \"configuration\": {\n                            \"Benefits\": {\n                                \"extra_form_type\": \"extra_form_collection\",\n                                \"options\": {\n                                    \"label\": \" \",\n                                    \"type\": \"extra_form_builder\",\n                                    \"options\": {\n                                        \"configuration\": {\n                                            \"benefit\": {\n                                                \"extra_form_type\": \"tms_benefit\",\n                                                \"options\": {\n                                                    \"offer_id\": \"{{ participation.offer.id }}\",\n                                                    \"display_products\": false\n                                                }\n                                            }\n                                        }\n                                    },\n                                    \"add_button\": {\n                                        \"label\": \"+ Ajouter un bénéfice\"\n                                    },\n                                    \"remove_button\": {\n                                        \"label\": \"X Supprimer un bénéfice\"\n                                    },\n                                    \"min_items\": 1,\n                                    \"max_items\": 10\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        },\n        \"recommended\": {\n            \"type\": \"form\",\n            \"options\": {\n                \"title\": \"Saisissez le recommandé\",\n                \"display_title\": false,\n                \"@builder\": {\n                    \"worker\": \"extra_form_builder\",\n                    \"parameters\": {\n                        \"configuration\": {\n                            \"Recommended\": {\n                                \"extra_form_type\": \"tms_recommended_code_choice\",\n                                \"options\": {\n                                    \"lot_id\": \"{{ '{{ flow_data.retrievedData.identity.retrieved_request_uri.id }}'}}\"\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        },\n        \"end\": {\n            \"type\": \"html\",\n            \"options\": {\n                \"title\": \"Participation courrier crée\",\n                \"prevent_previous\": true,\n                \"previous_options\": {\n                    \"label\": \"Précédent\",\n                    \"attr\": {\n                        \"class\": \"btn btn-default fa btn_actions\"\n                    }\n                }\n            }\n        }\n    },\n    \"paths\": [\n        {\n            \"type\": \"single\",\n            \"options\": {\n                \"source\": \"identity\",\n                \"destination\": \"proofs\",\n                \"next_options\": {\n                    \"label\": \"Suivant\"\n                }\n            }\n        },\n        {\n            \"type\": \"single\",\n            \"options\": {\n                \"source\": \"proofs\",\n                \"destination\": \"benefit\",\n                \"next_options\": {\n                    \"label\": \"Suivant\"\n                }\n            }\n        },\n        {\n            \"type\": \"conditional_destination\",\n            \"options\": {\n                \"source\": \"benefit\",\n                \"destinations\": {\n                    \"recommended\": \"{{ '{% if flow_data.retrievedData.identity.retrieved_lot.lotCategory.name == \\'reco\\' %}1{% else %}0{% endif %}' }}\"\n                },\n                \"default_destination\": \"end\",\n                \"next_options\": {\n                    \"label\": \"Suivant\"\n                }\n            }\n        },\n        {\n            \"type\": \"single\",\n            \"options\": {\n                \"source\": \"recommended\",\n                \"destination\": \"end\",\n                \"next_options\": {\n                    \"label\": \"Suivant\"\n                }\n            }\n        },\n        {\n            \"type\": \"end\",\n            \"options\": {\n                \"source\": \"end\",\n                \"next_options\": {\n                    \"label\": \"Suivant\"\n                },\n                \"events\": {\n                    \"form.post_bind\": [\n                        {\n                            \"action\": \"create_participation\",\n                            \"name\": \"created_participation\",\n                            \"parameters\": {\n                                \"customer\": \"{{ participation.offer.customer.reference }}\",\n                                \"offer\": \"{{ participation.offer.reference }}\",\n                                \"operation\": \"{{ participation.offer.operation.reference }}\",\n                                \"source\": \"digifid - mailConsumerApp\",\n                                \"mail_lot_id\": \"{{ '{{ flow_data.retrievedData.identity.retrieved_request_uri.id }}'}}\"\n                            }\n                        },\n                        {\n                            \"action\": \"update_recommended_code\",\n                            \"name\": \"updated_recommended_code\",\n                            \"parameters\": {\n                                \"logical_expression\": \"{{ '{% if flow_data.retrievedData.identity.retrieved_lot.lotCategory.name == \\'reco\\' %}1{% else %}0{% endif %}' }}\",\n                                \"recommended_code_id\": \"{{ '{{ flow_data.remindedData.recommended.Recommended }}' }}\",\n                                \"participation_id\": \"{{ '{{ flow_data.retrievedData.end.created_participation.id }}'}}\"\n                            }\n                        }\n                    ]\n                }\n            }\n        }\n    ],\n    \"options\": {},\n    \"graphPositions\": {\n        \"steps\": {\n            \"identity\": {\n                \"x\": 20,\n                \"y\": 20\n            },\n            \"proofs\": {\n                \"x\": 220,\n                \"y\": 20\n            },\n            \"benefit\": {\n                \"x\": 170,\n                \"y\": 120\n            },\n            \"recommended\": {\n                \"x\": 370,\n                \"y\": 120\n            },\n            \"end\": {\n                \"x\": 320,\n                \"y\": 220\n            }\n        },\n        \"paths\": [\n            {},\n            {},\n            {\n                \"intersection\": {\n                    \"x\": 520,\n                    \"y\": 220\n                }\n            },\n            {},\n            {\n                \"endOfPath\": {\n                    \"x\": 470,\n                    \"y\": 320\n                }\n            }\n        ]\n    }\n}";
