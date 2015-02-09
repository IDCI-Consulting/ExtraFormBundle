ExtraFormConstraint
===================

ExtraFormConstraint are services that add extra informations about existing Constraint.
Mainly, informations about how create dynamically a Symfony2 Constraint, like:
 * The associated constraint class (class)
 * A description (description)
 * And a list of available Constraint options (extra_form_options)

 To create your own ExtraFormConstraint, simply use the configuration:
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

 Take a look at the [default ExtraFormConstraint configuration](../config/constraints.yml)

 To check if ExtraFormConstraint are well configured, you could list all them:
 ```sh
 $ php app/console container:debug | grep "idci_extra_form\.constraint\."
 ```
