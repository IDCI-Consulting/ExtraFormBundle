ExtraFormBundle
===============

ExtraFormBundle is a Symfony2 bundle that expand existing FormType features to allow dynamic forms generation.

This bundle provide:
* A builder to generate forms from a configuration array. This allow you to configure your forms in any format convertible in an array (yaml, json, etc) and dynamically generate your forms.
* A set of extra types (iban, captcha..) ready to use.
* An api that exposes all symfony form types as 'extra form types'
* An api that exposes all symfony validation constraints as 'extra form constraints'

For a quick overview on what this bundle offer, you can [test the form editor](http://extra-form.labs.idci.fr/extra-form/editor).

[![SensioLabsInsight](https://insight.sensiolabs.com/projects/6b163476-64da-450a-8c34-3b1e5225bde2/mini.png)](https://insight.sensiolabs.com/projects/6b163476-64da-450a-8c34-3b1e5225bde2)

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
        new FOS\RestBundle\FOSRestBundle(),
        new Gregwar\CaptchaBundle\GregwarCaptchaBundle(),
        new IDCI\Bundle\ExtraFormBundle\IDCIExtraFormBundle(),
        new JMS\SerializerBundle\JMSSerializerBundle(),
    );
}
```

Enable the serializer:

```yml
fos_rest:
    param_fetcher_listener: true # if you want to add configured types
    service:
        serializer: jms_serializer.serializer
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCIExtraFormBundle/Resources/config/config.yml }
```

If you need the api or the editor:

Import the routes:
```yml
# app/config/routing.yml
extra_form:
    resource: "@IDCIExtraFormBundle/Controller/"
    type:     annotation
```

Install the assets:
```sh
php app/console assets:install --symlink
```

If you want to use already configured types in the editor:
```sh
doctrine:schema:update --force
```

Documentation
-------------

* [Usage](Resources/doc/usage.md)
* [Extra form types](Resources/doc/extra_form_type.md)
* [Extra form constraints](Resources/doc/extra_form_constraint.md)

Going further
-------------

* [Api](Resources/doc/api.md)
* [Editor](Resources/doc/editor.md)
* [ExtraFormBuilderType](Resources/doc/extra_form_builder_type.md)
* [ConfigurationFetcher](Resources/doc/configuration_fetcher.md)
* [Architecture](Resources/doc/architecture.md)

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
