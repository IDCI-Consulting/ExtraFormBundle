ExtraFormType
=============

ExtraFormType are services that add extra information about existing symfony FormType.
You can see an extra form type as an exhaustive description of an existing form type (information about the options, form type class, etc.).
All information about extra form types will be used by the extra form builder for generation.

## Existing types

Have a look at the [default ExtraFormTypes configuration](../config/types.yml). All these types are already configured and available.

## Adding a new type

To create your own ExtraFormType, add some configuration under the `idci_extra_form` and `types` keys.
The Bundle will automatically register it as a service.

Here are the main configuration keys used to create dynamically a Symfony2 FormType:
 * The associated FormType (form_type)
 * The ExtraFormType parent associated to the parent FormType (parent)
 * Is the FormType is abstract or not (abstract)
 * A description (description)
 * A list of available FormType options (extra_form_options)

Here is an example for a service named `idci_extra_form.type.my_type`:

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

To check if ExtraFormType are well configured, you could list them :
```sh
$ php app/console container:debug | grep "idci_extra_form\.type\."
```
