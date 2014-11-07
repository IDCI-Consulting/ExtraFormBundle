<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\Form\FormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;

interface ExtraFormBuilderInterface
{
    /**
     * Build
     *
     * @param  FormBuilderInterface $formBuilder
     * @param  string $configuratorAlias
     * @param  array  $configuratorParameters
     */
    public function build(
        FormBuilderInterface & $formBuilder,
        $configuratorAlias,
        array $configuratorParameters = array()
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