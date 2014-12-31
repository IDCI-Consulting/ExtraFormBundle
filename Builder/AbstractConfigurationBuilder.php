<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Exception\BuildConfigurationException;

abstract class AbstractConfigurationBuilder implements ConfigurationBuilderInterface
{
    /**
     * {@inheritDoc}
     */
    public function build(array $parameters = array())
    {
        $resolver = new OptionsResolver();
        $this->setup($resolver);

        return $this->make($resolver->resolve($parameters));
    }

    /**
     * Configure parameters.
     *
     * @param OptionsResolver $resolver
     */
    protected function setup(OptionsResolver $resolver)
    {
    }

    /**
     * Make the configuration.
     *
     * @param  array $parameters
     *
     * @return array
     * @throw  BuildConfigurationException
     */
    abstract protected function make(array $parameters = array());
}