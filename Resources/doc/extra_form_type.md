ExtraFormType
=============


ExtraFormType are services that add extra informations about existing FormType.
Mainly, informations about how create dynamicaly a Symfony2 FormType, like:
 * The associated FormType (form_type)
 * The ExtraFormType parent associated to the parent FormType (parent)
 * Is the FormType is abstract or not (abstract)
 * A description (description)
 * And a list of available FormType options (extra_form_options)

To create your own ExtraFormType, simply use the configuration:

```yml
idci_extra_form:
    types:
        my_type:
            parent:      form
            form_type:   sf2_my_type
            description: A short description about your FormType
            extra_form_options:
                my_option1: { extra_form_type: "text",     options: {required: false} }
                my_option2: { extra_form_type: "checkbox", options: {required: false} }
                ...
```

Take a look at the [default ExtraFormTypes configuration](../config/types.yml)


To check if ExtraFormType are well configurated, you could list all them:

```sh
$ php app/console container:debug | grep "idci_extra_form\.type\."
```
