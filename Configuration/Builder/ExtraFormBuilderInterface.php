<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Builder;

use Symfony\Component\Form\FormBuilderInterface;

interface ExtraFormBuilderInterface
{
    /**
     * Build the extra form.
     *
     * @param array|null $data
     *
     * @return FormBuilderInterface the built form builder
     */
    public function build(
        $configuration,
        array $parameters = [],
        $data = null,
        ?FormBuilderInterface $formBuilder = null,
    );
}
