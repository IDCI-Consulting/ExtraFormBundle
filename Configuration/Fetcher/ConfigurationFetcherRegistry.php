<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ConfigurationFetcherRegistry
{
    protected $fetchers;

    /**
     * Set configuration.
     *
     * @param string                        $alias   The alias.
     * @param ConfigurationBuilderInterface $builder The configuration fetcher.
     */
    public function setFetcher($alias, ConfigurationFetcherInterface $fetcher)
    {
        $this->fetchers[$alias] = $fetcher;
    }

    /**
     * Returns configuration fetchers.
     *
     * @return array
     */
    public function getFetchers()
    {
        return $this->fetchers;
    }

    /**
     * Returns fetcher.
     *
     * @param string $alias The alias.
     *
     * @return ConfigurationFetcherInterface
     */
    public function getFetcher($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->fetchers[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load configuration fetcher "%s"', $alias));
        }

        return $this->fetchers[$alias];
    }
}