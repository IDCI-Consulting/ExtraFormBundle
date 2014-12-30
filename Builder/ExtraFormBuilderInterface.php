<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\Form\FormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConfiguratorException;

interface ExtraFormBuilderInterface
{
    /**
     * Build the extra form.
     *
     * @param  ExtraFormConfiguratorInterface|string $configurator
     * @param  array                                 $parameters
     * @param  FormBuilderInterface                  $formBuilder
     *
     * @return FormBuilderInterface The built form builder.
     */
    public function build(
        $configurator,
        array $parameters = array(),
        FormBuilderInterface $formBuilder = null
    );
}