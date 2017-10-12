<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;

interface ExtraFormTypeInterface
{
    /**
     * Get form type.
     *
     * @return string
     */
    public function getFormType();

    /**
     * Returns the parent.
     *
     * @return ExtraFormTypeInterface
     */
    public function getParent();

    /**
     * Returns the description.
     *
     * @return string
     */
    public function getDescription();

    /**
     * Is abstract.
     *
     * @return bool
     */
    public function isAbstract();

    /**
     * Returns extra form options.
     *
     * @return array
     */
    public function getExtraFormOptions();

    /**
     * Returns extra form constraints.
     *
     * @return array
     */
    public function getExtraFormConstraints();
}
