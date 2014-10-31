ExtraFormBuilderType
====================

ExtraFormBuilderType is a Symfony2 FormType [define as service](http://symfony.com/doc/current/book/forms.html#defining-your-forms-as-services).
This FormType will allow you to generate just a part of a Form.

Here is a quick exemple:

```php
$form = $this
    ->createFormBuilder(array(
        'sub_form' => array(
            'first_name' => 'John',
            'last_name'  => 'DOE'
        )
    ))
    ->add('sub_form', 'extra_form_builder', array(
        'configurator_alias' => 'identity_form'
    ))
    ->getForm()
;
```

TODO: use event to transform data !