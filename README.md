ExtraFormBundle
===============

Symfony2 bundle that expand existing FormType feature to allow a dynamic form generation


Installation
------------

Add dependencies in your `composer.json` file:
```json
"require": {
    ...
    "idci/extra-form-bundle": "dev-master"
},
```

Install these new dependencies in your application using composer:
```sh
$ php composer.phar update
```

Register needed bundles in your application kernel:
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new IDCI\ExtraFormBundle\IDCIExtraFormBundle(),
    );
}
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCIExtraFormBundle/Resources/config/config.yml }
```


Documentation
-------------

* [Introduction](Resources/doc/introduction.md)
* [Architecture](Resources/doc/architecture.md)
* [Configuration reference](Resources/doc/configuration_reference.md)
* [ExtraFormType](Resources/doc/extra_form_type.md)
* [ExtraFormConstraint](Resources/doc/extra_form_constraint.md)
* [ExtraFormConfigurator](Resources/doc/extra_form_configurator.md)
* [ExtraFormBuilderGenerator](Resources/doc/extra_form_builder_generator.md)


Tests
-----

Install bundle dependencies:
```sh
$ php composer.phar update
```

To execute unit tests:
```sh
$ phpunit --coverage-text
```
