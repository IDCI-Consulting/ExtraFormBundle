<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;


interface ExtraFormConfiguratorInterface
{
    /**
     * Make configuration
     *
     * @param  array $parameters
     * @return array
     */
    public function makeConfiguration(array $parameters = array());
}