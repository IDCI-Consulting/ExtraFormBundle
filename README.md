ExtraFormBundle
===============

ExtraFormBundle is a Symfony2 bundle that expand existing FormType features to allow dynamic forms generation.

This bundle provide:
* A builder to generate forms from a configuration array. This allow you to configure your forms in any format convertible in an array (yaml, json, etc) and dynamically generate your forms.
* A set of extra types (iban, captcha..) ready to use.
* An api that exposes all symfony form types as 'extra form types'
* An api that exposes all symfony validation constraints as 'extra form constraints'

[![SensioLabsInsight][insight-image]][insight-url]
[![Build][build-image]][build-url]

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
    );
}
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: '@IDCIExtraFormBundle/Resources/config/config.yml' }
```

That's it, you are ready to use the [extra form builder](Resources/doc/usage.md).

Use the editor
--------------

If you need the api or the editor:

```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new FOS\RestBundle\FOSRestBundle(),
        new JMS\SerializerBundle\JMSSerializerBundle(),
    );
}
```

Enable the serializer:

```yml
# app/config/config.yml

fos_rest:
    param_fetcher_listener: true # if you want to add configured types
    service:
        serializer: jms_serializer.serializer
```

Import the routes:
```yml
# app/config/routing.yml
extra_form:
    resource: "@IDCIExtraFormBundle/Controller/"
    type: annotation
```

Install the assets:
```sh
php bin/console assets:install --symlink
```

The editor requires bootstrap and jquery. If you don't use it already in your project, just add the following lines in your views.

```twig
{% block javascripts %}
    {{ parent() }}
    <script type="text/javascript" src="{{ asset('bundles/idciextraform/js/vendor/jquery-2.2.4.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('bundles/idciextraform/js/vendor/bootstrap.min.js') }}"></script>
{% endblock %}

{% block stylesheets %}
    {{ parent() }}
    <link rel="stylesheet" type="text/css" href="{{ asset('bundles/idciextraform/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('bundles/idciextraform/css/bootstrap-theme.min.css') }}" />
{% endlbock %}
```

Use the configured types
------------------------

You can register configured types via the editor. It allows you to access types with pre-configured fields.

Register doctrine bundle in your application kernel:
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
    );
}
```

Then update the doctrine schema. It will create a table to register the configured types in database.
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
* [ExtraFormBuilderType](Resources/doc/extra_form_builder_type.md)
* [ConfigurationFetcher](Resources/doc/configuration_fetcher.md)
* [Architecture](Resources/doc/architecture.md)

Tests
-----

We use [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) to run the tests, along with a Makefile.

Install the bundle dev dependencies:
```sh
$ make composer-update
```

To execute unit tests:
```sh
$ make phpunit
```

[build-image]: https://img.shields.io/travis/IDCI-Consulting/ExtraFormBundle.svg?style=flat
[build-url]: https://travis-ci.org/IDCI-Consulting/ExtraFormBundle
[insight-image]: https://insight.sensiolabs.com/projects/6b163476-64da-450a-8c34-3b1e5225bde2/mini.png
[insight-url]: https://insight.sensiolabs.com/projects/6b163476-64da-450a-8c34-3b1e5225bde2
