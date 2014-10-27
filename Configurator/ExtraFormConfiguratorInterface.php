<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\Configurator;


interface ExtraFormConfiguratorInterface
{
    /**
     * Get raw
     *
     * @return array
     */
    public function getRaw();

    /**
     * Make configuration
     *
     * @param  array $parameters
     * @return array
     */
    public function makeConfiguration(array $parameters = array());
}