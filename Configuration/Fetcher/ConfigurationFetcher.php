<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

class ConfigurationFetcher extends AbstractConfigurationFetcher
{
    protected $raw;

    /**
     * Constructor.
     */
    public function __construct(array $raw)
    {
        $this->raw = $raw;
    }

    public function doFetch(array $parameters = [])
    {
        return $this->raw['fields'];
    }
}
