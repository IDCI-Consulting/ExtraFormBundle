<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Exception\BuildConfigurationException;

abstract class AbstractExtraFormConfigurator implements ExtraFormConfiguratorInterface 
{
    /**
     * {@inheritDoc}
     */
    public function makeConfiguration(array $parameters = array())
    {
        $resolver = new OptionsResolver();
        $this->configureParameters($resolver);

        return $this->buildConfiguration($resolver->resolve($parameters));
    }

    /**
     * Configure parameters.
     *
     * @param OptionsResolver $resolver
     */
    protected function configureParameters(OptionsResolver $resolver)
    {
    }

    /**
     * Build configuration.
     *
     * @param  array $parameters
     *
     * @return array
     * @throw  BuildConfigurationException
     */
    abstract protected function buildConfiguration(array $parameters = array());
}