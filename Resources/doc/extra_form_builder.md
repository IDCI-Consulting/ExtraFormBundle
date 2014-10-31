ExtraFormBuilder
================

ExtraFormBuilder is the main service that you will use in order to generate
your forms. The build process is the following:

1] Create a FormBuilder:
```php
$builder = $this->createFormBuilder(array(
    'first_name' => 'John',
    'last_name'  => 'DOE'
));
```
The data must be an array containing a key value pair.

2] Use the `idci_extra_form.builder` service:
```php
$this
    ->get('idci_extra_form.builder')
    ->build(
        $builder,
        'identity_form', // configurator alias
        array()          // configurator parameters
    )
;
```
You need to have an [ExtraFormConfigurator](extra_form_configurator.md) configurated.

3] Get your form:
```php
$form = $builder->getForm();
```
You work with a Symfony2 [FormBuilder](https://github.com/symfony/symfony/blob/master/src/Symfony/Component/Form/FormBuilder.php) object.
So simply call the getForm() method

4] Follow the usual process with forms:
Return a view from your controller
```php
return array(
    'form' => $form->createView()
);
```
Then you could display it in your twig
```twig
<form>
{{ form_widget(form) }}
</form>
```