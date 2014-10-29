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
     * @param  string $formName
     * @param  array  $formOpions
     * @return Symfony\Component\Form\FormBuilderInterface
     */
    public function generate(
        $configuratorAlias,
        array $configuratorParameters = array(),
        $formName = null,
        array $formOptions = array()
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