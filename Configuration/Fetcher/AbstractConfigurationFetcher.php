<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractConfigurationFetcher implements ConfigurationFetcherInterface
{
    public function fetch(array $parameters = [])
    {
        $resolver = new OptionsResolver();
        $this->setDefaultParameters($resolver);

        return $this->doFetch($resolver->resolve($parameters));
    }

    /**
     * Set default parameters.
     */
    protected function setDefaultParameters(OptionsResolver $resolver)
    {
    }

    /**
     * Fetch the configuration.
     *
     * @return array
     *
     * @throw  FetchConfigurationException
     */
    abstract protected function doFetch(array $parameters = []);
}
