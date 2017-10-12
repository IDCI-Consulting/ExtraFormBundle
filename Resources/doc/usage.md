Usage
=====

This bundle provide an extra form builder to generate forms. You can use it in two different way.

## As service

The `idci_extra_form.builder` service is the main service that you will use in order to generate your forms.

To use it:
```php
$builder = $this
    ->get(ExtraFormBuilderInterface::class)
    ->build(array(
        'first_name' => array(
            'extra_form_type' => 'text',
            'options' => array(
                'label' => 'Prénom',
            ),
            'constraints' => array(),
        ),
        'last_name' => array(
            'extra_form_type' => 'text',
            'options' => array(
                'label' => 'Nom',
            ),
            'constraints' => array(),
        )
    ))
;
```

Now you get a Symfony2 [FormBuilder](https://github.com/symfony/symfony/blob/master/src/Symfony/Component/Form/FormBuilder.php) object.
So simply call the getForm() method :
```php
$form = $builder->getForm();
```

And follow the usual process with symfony2 forms :
Return a view from your controller
```php
return array(
    'form' => $form->createView()
);
```

Finally you could display it in your twig :
```twig
<form>
{{ form_widget(form) }}
</form>
```

Instead of injecting a configuration array in the `build()` method, you may use a Configuration fetcher as shown after :
```php
$form = $this
    ->get(ExtraFormBuilderInterface::class)
    ->build('identity_form', array())
    ->getForm()
;
```
See the [ConfigurationFetcher](configuration_fetcher.md) documentation to learn how to create a configuration.

## As Symfony2 a FormType

In this case you must create a form first, and then add a field using the special
FormType *extra_form_builder*. The generated form will be a field of the created form.
```php
$form = $this
    ->createFormBuilder()
    ->add('my_form', 'extra_form_builder', array(
        'configuration' => array(
            'first_name' => array(
                'extra_form_type' => 'text',
                'options' => array(
                    'label' => 'Prénom',
                ),
                'constraints' => array(),
            ),
            'last_name' => array(
                'extra_form_type' => 'text',
                'options' => array(
                    'label' => 'Nom',
                ),
                'constraints' => array(),
            )
        ),
        'parameters' => array(),
    ))
    ->getForm()
```

And follow the usual process with symfony2 forms :
Return a view from your controller
```php
return array(
    'form' => $form->createView()
);
```

Finally you could display it in your twig
```twig
<form>
{{ form_widget(form) }}
</form>
```

To get more informations about this method, read the [ExtraFormBuilderType](extra_form_builder_type.md) section.
