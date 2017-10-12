ConfigurationFetcher
====================

ConfigurationFetcher are services that fetch a configuration raw and provide an
understandable data structure that is use by a ExtraFormBuilder to build a FormBuilder.
A ConfigurationFetcher is identify by a name.
By default this bundle provide some configuration fetcher.


## Default configuration fetcher

This is the default ConfigurationFetcher, the raw is located in your configuration.
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
```
In this example, "identity_form" is the ConfigurationFetcher identifier.

**use case**:
It can be use to replace the default FormType behavior, but instead of added fields
in the `buildForm` method, you declare the fields in a configuration file.

**note**:
Generated form are [without class](http://symfony.com/doc/current/book/forms.html#using-a-form-without-a-class)


## Create your own configuration fetcher

If you wish to create your own configuration fetcher, you have to create a class
which extends `AbstractConfigurationFetcher` and implement necessary methods.
```php
<?php
// src/My/Bundle/Configuration/ExtraFormFetcher/MyConfigurationFetcher.php

namespace My\Bundle\Configuration\ExtraFormFetcher;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\AbstractConfigurationFetcher;
use IDCI\Bundle\ExtraFormBundle\Exception\FetchConfigurationException;

class MyConfigurationFetcher extends AbstractConfigurationFetcher
{
    /**
     * {@inheritDoc}
     */
    protected function setDefaultParameters(OptionsResolver $resolver)
    {
        ...
    }


    /**
     * {@inheritDoc}
     */
    public function doFetch(array $parameters = array())
    {
        ...
    }
}
```

Then declare this new ConfigurationFetcher as service:
```yml
services:
    My\Bundle\Configuration\ExtraFormFetcher\MyConfigurationFetcher:
        tags:
            - { name: idci_extra_form.configuration.fetcher, alias: my_fetcher }
```
The alias "my_fetcher" will be the ConfigurationFetcher identifier.

The doFetch function must return an array that should be in the following format:
```
array(
    'field_name' => array(
        'extra_form_type' => ...<string a valid ExtraFormType name>
        'options' => ...<array list of valid options>
        'constraints' => ...<array list of valid constraints>
    )
    // ...
)
```

To check if ConfigurationFetcher are well configured, you could list all them:
```sh
$ php app/console container:debug | grep "idci_extra_form\.configuration\.fetcher\."
```
