<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Builder;

use Symfony\Component\Form\FormBuilderInterface;

interface ExtraFormBuilderInterface
{
    /**
     * Build the extra form.
     *
     * @param mixed                $configuration
     * @param array                $parameters
     * @param array|null           $data
     * @param FormBuilderInterface $formBuilder
     *
     * @return FormBuilderInterface the built form builder
     */
    public function build(
        $configuration,
        array $parameters = array(),
        $data = null,
        FormBuilderInterface $formBuilder = null
    );
}
