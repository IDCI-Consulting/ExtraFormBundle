<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Exception\FetchConfigurationException;

abstract class AbstractConfigurationFetcher implements ConfigurationFetcherInterface
{
    /**
     * {@inheritdoc}
     */
    public function fetch(array $parameters = array())
    {
        $resolver = new OptionsResolver();
        $this->setDefaultParameters($resolver);

        return $this->doFetch($resolver->resolve($parameters));
    }

    /**
     * Set default parameters.
     *
     * @param OptionsResolverInterface $resolver
     */
    protected function setDefaultParameters(OptionsResolverInterface $resolver)
    {
    }

    /**
     * Fetch the configuration.
     *
     * @param array $parameters
     *
     * @return array
     *
     * @throw  FetchConfigurationException
     */
    abstract protected function doFetch(array $parameters = array());
}
