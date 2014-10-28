<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;


use Symfony\Component\OptionsResolver\OptionsResolver;


abstract class AbstractExtraFormConfigurator implements ExtraFormConfiguratorInterface 
{   
    /**
     * {@inheritDoc}
     */
    public function makeConfiguration(array $parameters = array())
    {
        $resolver = new OptionsResolver();
        $this->configureParameters($resolver);

        return $this->doMakeConfiguration($resolver->resolve($parameters));
    }

    /**
     * Configure parameters
     *
     * @param  OptionsResolver $resolver
     */
    protected function configureParameters(OptionsResolver $resolver)
    {
    }

    /**
     * Do make configuration
     *
     * @param  array $parameters
     * @return array
     */
    abstract protected function doMakeConfiguration(array $parameters = array());
}