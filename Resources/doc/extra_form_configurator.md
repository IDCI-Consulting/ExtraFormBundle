ExtraFormConfigurator
=====================


ExtraFormConfigurator are services that transform a specific raw data to an understandable
configuration that is use by a ExtraFormGenerator to generate a FormBuilder.
An ExtraFormConfigurator is identitfy by a name.
By default this bundle provide two kind of configurator.


## Default configurators

### ExtraFormConfigurator

This is the default ExtraFormConfigurator, the specific raw is located in your configuration.

To define an ExtraFormConfiguration, simply use the configuration:

```yml
idci_extra_form:
    configurators:
        identity_form:
            name: ~
            fields:
                first_name:
                    extra_form_type: text
                    options:
                        label: Prénom
                    constraints: ~
                last_name:
                    extra_form_type: text
                    options:
                        label: Nom
                    constraints: ~
                sex:
                    extra_form_type: choice
                    options:
                        label: Sexe
                        choices:
                            m: Masculin
                            f: Feminin
                        multiple: false
                        expanded: true
                address:
                    extra_form_type: textarea
            options: ~
```

In this example, "identity_form" became the ExtraFormConfigurator identifier.

**use case**:
It can be use to replace the default FormType behavior, but instead of added fields
in the `buildForm` method, you declare the fields in a configuration file.

**note**:
Generated form are [without class](http://symfony.com/doc/current/book/forms.html#using-a-form-without-a-class)


### DoctrineExtraFormConfigurator

WIP


## Create your own configurator

If you wish to create your own configurator, you have to create a class which
extends `AbstractExtraFormConfigurator` and implement necessary methods.

```php
<?php
// src/My/Bundle/ExtraFormConfigurator/MyConfigurator.php

namespace My\Bundle\ExtraFormConfigurator;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Configurator\AbstractExtraFormConfigurator;
use IDCI\Bundle\ExtraFormBundle\Exception\BuildConfigurationException;

class MyConfigurator extends AbstractExtraFormConfigurator
{
    /**
     * {@inheritDoc}
     */
    public function buildConfiguration(array $parameters = array())
    {
        ...
    }

    /**
     * Configure parameters
     *
     * This method allow you to configure the needed parameters before call
     * doMakeConfiguration function
     *
     * @param OptionsResolver $resolver
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

The alias "my_configurator" will be the ExtraFormConfigurator identifier.

The doMakeConfiguration function must return an array that should be in the following format:

```
array(
    'name'    => ...<string without special characters>
    'fields'  => array(
        'field_name' => array(
            'extra_form_type' => ...<string a valid ExtraFormType name>
            'options'         => ...<array list of valid options>
            'constraints'     => ...<array list of valid constraints>
        )
    'options' => <array>...
)
```


To check if ExtraFormConfigurator are well configurated, you could list all them:
```sh
$ php app/console container:debug | grep "idci_extra_form\.configurator\."
```
