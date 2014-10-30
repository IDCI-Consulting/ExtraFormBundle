ExtraFormGenerator
==================

ExtraFormGenerator is the main service that you will use in order to generate
your forms. The generated object is a Symfony2 FormBuilder.
The generation process is the following:

 1] Use an existing [ExtraFormConfigurator](extra_form_configurator.md) to make a specific configuration.
 2] Create a FormBuilder.
 3] Based on this configuration, add field using [ExtraFormType](extra_form_type.md) and [ExtraFormConstraint](extra_form_constraint).


## How to generate a FormBuilder

First, you need to have an [ExtraFormConfigurator](extra_form_configurator.md) configurated.
Then, use the `idci_extra_form.generator` service as follow:

```php
$formBuilder = $this
    ->get('idci_extra_form.generator')
    ->generate(
        'identity_form', // configurator alias
        array(),         // configurator parameters
        array(           // form data
            'first_name' => 'John',
            'last_name'  => 'DOE'
        )
    )
;
```

You will get a Symfony2 [FormBuilder](https://github.com/symfony/symfony/blob/master/src/Symfony/Component/Form/FormBuilder.php) object.
If you wish to return the form from a controller to a view:

```php
return array(
    'form' => $formBuilder->getForm()->createView()
);
```

Then you could display it in your twig

```twig
<form>
{{ form_widget(form) }}
</form>
```