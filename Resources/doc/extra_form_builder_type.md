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
            'last_name'  => 'DOE',
        )
    ))
    ->add('sub_form', 'extra_form_builder', array(
        'configurator_alias' => 'identity_form',
    ))
    ->getForm()
;
```

Once the mapping beetween the form and a request is done, you will get jsonize data.
Here is an exemple on how to check this case:

```php

$form->submit($request);

if ($form->isValid()) {
    var_dump($form->getData());
}
```

The json format is used by default, but you could change this behavior.
You have the choice beetween *jsonize*, *serialize* or *null* (no tranformation).
This transformation is done using EventSubscriber, to choose one, specify the
`transform_method` option:

```php
$form = $this
    ->createFormBuilder(array(
        'sub_form' => array(
            'first_name' => 'John',
            'last_name'  => 'DOE',
        )
    ))
    ->add('sub_form', 'extra_form_builder', array(
        'configurator_alias' => 'identity_form',
        'transform_method'   => 'jsonize',
    ))
    ->getForm()
;
```

**/!\ For the moment, you could not create your own EventSubscriber (could change if needed)**
