<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Generator;

use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;

interface ExtraFormGeneratorInterface
{
    /**
     * Generate
     *
     * @param  string $configuratorAlias
     * @param  array  $configuratorParameters
     * @param  array  $data
     * @return Symfony\Component\Form\FormBuilderInterface
     */
    public function generate(
        $configuratorAlias,
        array $configuratorParameters = array(),
        array $data = array()
    );

    /**
     * set configurator
     *
     * @param string $alias
     * @param ExtraFormConfiguratorInterface $configurator
     */
    public function setConfigurator($alias, ExtraFormConfiguratorInterface $configurator);

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
     * @throw  IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConfiguratorException
     */
    public function getConfigurator($alias);
}