<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;


interface ConfigurationBuilderInterface
{
    /**
     * Build the configuration.
     *
     * @param array $parameters The parameters used to build the configuration.
     *
     * @return array
     */
    public function build(array $parameters = array());
}