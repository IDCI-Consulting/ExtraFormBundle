<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

class ConfigurationFetcher extends AbstractConfigurationFetcher
{
    protected $raw;

    /**
     * Constructor.
     *
     * @param array $raw
     */
    public function __construct(array $raw)
    {
        $this->raw = $raw;
    }

    /**
     * {@inheritDoc}
     */
    public function doFetch(array $parameters = array())
    {
        return $this->raw['fields'];
    }
}
