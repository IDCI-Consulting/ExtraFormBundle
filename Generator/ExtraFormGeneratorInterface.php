<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\Generator;

use IDCI\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;

interface ExtraFormGeneratorInterface
{
    /**
     * Generate
     *
     * @param  string $configuratorAlias
     * @param  array  $data
     * @return Symfony\Component\Form\FormBuilderInterface
     */
    public function generate($configuratorAlias, array $data = array());

    /**
     * Add configurator
     *
     * @param ExtraFormConfiguratorInterface $configurator
     */
    public function addConfigurator(ExtraFormConfiguratorInterface $configurator);

    /**
     * Get configurators
     *
     * @return array
     */
    public function getConfigurators();
    
    /**
     * Get configurator
     *
     * @param  string $alias
     * @return ExtraFormConfiguratorInterface
     */
    public function getConfigurator($alias);
}