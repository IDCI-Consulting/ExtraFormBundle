ExtraFormConstraint
===================

ExtraFormConstraint are services that add extra information about existing symfony Validation Constraints.
You can see an extra form constraint as an exhaustive description of an existing validation constraint (information about the options, constraint class, etc.).
All informations about extra form constraint will be used by the extra form builder to add constraints on your form types.

## Existing constraints

Have a look at the [default ExtraFormConstraint configuration](../config/constraints.yml). All these constraints are already configured and available

## Adding a new constraint

To create your own ExtraFormConstraint, add some configuration under the `idci_extra_form` and `constraints` keys.
The Bundle will automatically register it as a service.

Here are the main configuration keys used to create dynamically a Symfony2 Constraint:
 * The associated constraint class (class)
 * A description (description)
 * A list of available Constraint options (extra_form_options)

Here is an example for a service named `idci_extra_form.type.my_constraint`:
 ```yml
 idci_extra_form:
     constraints:
         my_constraint:
             class:   My\Constraint\ClassNamespace
             description: A short description about your Constraint
             extra_form_options:
                 my_option1: { extra_form_type: "text",     options: {required: false} }
                 my_option2: { extra_form_type: "checkbox", options: {required: false} }
                 ...
 ```

To check if ExtraFormConstraint are well configured, you could list them :
 ```sh
 $ php app/console container:debug | grep "idci_extra_form\.constraint\."
 ```


