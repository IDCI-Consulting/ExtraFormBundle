Usage
=====

This bundle provide an extra form builder to generate forms. You can use it in two different way.

## As service

The `idci_extra_form.builder` service is the main service that you will use in order to generate your forms.

To use it:
```php
use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
...

public function myAction(ExtraFormBuilderInterface $extraFormBuilder)
{
    $builder = $extraFormBuilder->build([
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
    ]);
}
```

Now you get a Symfony [FormBuilder](https://github.com/symfony/symfony/blob/master/src/Symfony/Component/Form/FormBuilder.php) object.
So simply call the getForm() method :
```php
$form = $builder->getForm();
```

And follow the usual process with symfony forms :
Return a view from your controller
```php
return [
    'form' => $form->createView()
];
```

Finally you could display it in your twig :
```twig
<form>
{{ form_widget(form) }}
</form>
```

Instead of injecting a configuration array in the `build()` method, you may use a Configuration fetcher as shown after :
```php
public function myAction(ExtraFormBuilderInterface $extraFormBuilder)
{
    $form = $extraFormBuilder->build('identity_form', [])->getForm();
}
```
See the [ConfigurationFetcher](configuration_fetcher.md) documentation to learn how to create a configuration.

## As Symfony a FormType

In this case you must create a form first, and then add a field using the special
FormType *extra_form_builder*. The generated form will be a field of the created form.
```php
$form = $this
    ->createFormBuilder()
    ->add('my_form', 'extra_form_builder', [
        'configuration' => [
            'first_name' => [
                'extra_form_type' => 'text',
                'options' => [
                    'label' => 'Prénom',
                ],
                'constraints' => [],
            ],
            'last_name' => [
                'extra_form_type' => 'text',
                'options' => [
                    'label' => 'Nom',
                ],
                'constraints' => [],
            ]
        ),
        'parameters' => [],
    ))
    ->getForm()
```

And follow the usual process with symfony forms :
Return a view from your controller
```php
return [
    'form' => $form->createView()
];
```

Finally you could display it in your twig
```twig
<form>
{{ form_widget(form) }}
</form>
```

To get more informations about this method, read the [ExtraFormBuilderType](extra_form_builder_type.md) section.
