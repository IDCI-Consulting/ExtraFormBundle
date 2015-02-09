ExtraFormBuilderType
====================

ExtraFormBuilderType is a Symfony2 FormType [define as service](http://symfony.com/doc/current/book/forms.html#defining-your-forms-as-services).
This FormType will allow you to generate just a part of a Form.

Here is a quick example :
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
    ))
    ->getForm()
;
```

Once the mapping between the form and a request is done, you will get your data.
Here is an example on how to check this case:
```php
$form->submit($request);

if ($form->isValid()) {
    var_dump($form->getData());
}
```

But you could change this by using a transform method.
You have the choice between *jsonize*, *serialize* or *null* (no transformation, use by default).
This transformation is done using EventSubscriber, to choose one, specify the
`transform_method` option:
```php
$form = $this
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
        'transform_method' => 'jsonize',
    ))
    ->getForm()
;
```

**/!\ For the moment, you could not create your own EventSubscriber (could change if needed)**
