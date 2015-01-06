ConfigurationBuilder
====================


ConfigurationBuilder are services that transform a specific raw data to an understandable
configuration that is use by a ExtraFormGenerator to generate a FormBuilder.
An ConfigurationBuilder is identitfy by a name.
By default this bundle provide a configuration builder.


## Default configuration builder

This is the default ConfigurationBuilder, the specific raw is located in your configuration.

To define a configuration :

```yml
idci_extra_form:
    configurations:
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

In this example, "identity_form" became the ConfigurationBuilder identifier.

**use case**:
It can be use to replace the default FormType behavior, but instead of added fields
in the `buildForm` method, you declare the fields in a configuration file.

**note**:
Generated form are [without class](http://symfony.com/doc/current/book/forms.html#using-a-form-without-a-class)


## Create your own configuration builder

If you wish to create your own configuration builder, you have to create a class
which extends `AbstractConfigurationBuilder` and implement necessary methods.

```php
<?php
// src/My/Bundle/ExtraForm/MyConfigurationBuilder.php

namespace My\Bundle\ExtraForm;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Builder\AbstractConfigurationBuilder;
use IDCI\Bundle\ExtraFormBundle\Exception\BuildConfigurationException;

class MyConfigurationBuilder extends AbstractConfigurationBuilder
{
    /**
     * Configure parameters.
     *
     * @param OptionsResolver $resolver
     */
    protected function setup(OptionsResolver $resolver)
    {
        ...
    }

    /**
     * Make the configuration.
     *
     * @param  array $parameters
     *
     * @return array
     * @throw  BuildConfigurationException
     */
    protected function make(array $parameters = array())
    {
        ...
    }
}
```

Then declare this new ConfigurationBuilder as service:

```yml
services:
    idci_extra_form.configuration_builder.my_configuration:
        class: My\Bundle\ExtraForm\MyConfigurationBuilder
        arguments: []
        tags:
            - { name: idci_extra_form.configuration_builder, alias: my_configuration }
```

The alias "my_configuration" will be the ConfigurationBuilder identifier.

The make function must return an array that should be in the following format:

```
array(
    'field_name' => array(
        'extra_form_type' => ...<string a valid ExtraFormType name>
        'options'         => ...<array list of valid options>
        'constraints'     => ...<array list of valid constraints>
    )
    // ...
)
```


To check if ConfigurationBuilder are well configurated, you could list all them:
```sh
$ php app/console container:debug | grep "idci_extra_form\.configuration_builder"
```
