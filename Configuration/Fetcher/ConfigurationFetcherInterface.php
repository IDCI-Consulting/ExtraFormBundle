<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

interface ConfigurationFetcherInterface
{
    /**
     * Fetch the configuration.
     *
     * @param array $parameters the parameters used to fetch the configuration
     *
     * @return array
     */
    public function fetch(array $parameters = array());
}
