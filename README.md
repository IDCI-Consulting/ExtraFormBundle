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
        new Gregwar\CaptchaBundle\GregwarCaptchaBundle(),
        new IDCI\Bundle\ExtraFormBundle\IDCIExtraFormBundle(),
        new FOS\RestBundle\FOSRestBundle(),
    );
}
```

Enable the serializer:

```yml
# app/config/config.yml
framework
    serializer:
        enabled: true
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCIExtraFormBundle/Resources/config/config.yml }
```

Finally import the routes if you need the api or the editor:
```yml
# app/config/routing.yml
extra_form:
    resource: "@IDCIExtraFormBundle/Controller/"
    type:     annotation
```

Documentation
-------------

* [Introduction](Resources/doc/introduction.md)
* [Architecture](Resources/doc/architecture.md)
* [ExtraFormBuilder](Resources/doc/extra_form_builder.md)
* [ExtraFormBuilderType](Resources/doc/extra_form_builder_type.md)
* [ExtraFormType](Resources/doc/extra_form_type.md)
* [ExtraFormConstraint](Resources/doc/extra_form_constraint.md)
* [ConfigurationFetcher](Resources/doc/configuration_fetcher.md)
* [Configuration reference](Resources/doc/configuration_reference.md)


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
