ExtraFormEditorType
===================

ExtraFormEditorType is a Symfony2 FormType [define as service](http://symfony.com/doc/current/book/forms.html#defining-your-forms-as-services).
This FormType will allow you to create a json compliant with the extra form types and constraints schemas.
You can then use this json as data to the extra form builder and create forms.

The editor is developed thanks to the [vuejs javascript framework](https://vuejs.org/)

Here is a quick example :
```php
$form = $this
    ->createFormBuilder()
    ->add('editor', ExtraFormEditorType::class, array(
        'available_modes'               => array('advanced', 'simple'),
        'allow_configured_type_edition' => true,
    ))
;
```

## Options

* This form type currently provide 2 modes to create form fields in different ways: `advanced` and `simple`.
Use the `available_modes` option as an array to specify which modes you want.
* You can enable the edition of configured types by setting the `allow_configured_type_edition` option to `true`.
