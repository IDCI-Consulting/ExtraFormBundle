ExtraFormConfigurator
=====================


ExtraFormConfigurator are services that transform a specific raw data to an understandable
configuration that is use by a ExtraFormGenerator to generate a FormBuilder.
By default this bundle provide two kind of configurator.


## Default configurators

### ExtraFormConfigurator

This is the default ExtraFormConfigurator, the specific raw is located in your configuration.

To define an ExtraFormConfiguration, simply use the configuration:

```yml
idci_extra_form:
    configurators:
        my_first_form:
            fields:
                field1:
                    extra_form_type: text
                    options: ~
                    constraints: ~
                field2:
                    extra_form_type: text
                    options: ~
                    constraints: ~
```

**use case**:
It can be use to replace the default FormType behavior, but instead of added fields
in the `buildForm` method, you declare the fields in a configuration file.

**note**:
Generated form are [without class](http://symfony.com/doc/current/book/forms.html#using-a-form-without-a-class)


### HMIExtraFormConfigurator

WIP


## Create your own configurator

If you wish to create your own configurator, you have to create a class which
extends `AbstractExtraFormConfigurator` and implement necessary methods.

```php
<?php
// src/My/Bundle/ExtraFormConfigurator/MyConfigurator.php

namespace My\Bundle\ExtraFormConfigurator\MyConfigurator

use IDCI\Bundle\ExtraFormBundle\Configurator\AbstractExtraFormConfigurator;

class MyConfigurator extends AbstractExtraFormConfigurator
{
    /**
     * {@inheritDoc}
     */
    public function getRaw()
    {
        ...
    }

    /**
     * {@inheritDoc}
     */
    public function doMakeConfiguration(array $parameters = array())
    {
        ...
    }

    /**
     * Configure parameters
     *
     * This method allow you to configure the needed parameters before call
     * doMakeConfiguration function
     *
     * @param  OptionsResolver $resolver
     */
    protected function configureParameters(OptionsResolver $resolver)
    {
        // $resolver-> ...
    }
}
```

Then declare this new ExtraFormConfigurator as service:

```yml
services:
    idci_extra_form.configurator.my_configurator:
        class: My\Bundle\ExtraFormConfigurator\MyConfigurator
        arguments: []
        tags:
            - { name: idci_extra_form.configurator, alias: my_configurator }
```


To check if ExtraFormConfigurator are well configurated, you could list all them:
```sh
$ php app/console container:debug | grep "idci_extra_form\.configurator\."
```
