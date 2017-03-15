<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;

interface ExtraFormTypeInterface
{
    /**
     * Get name.
     *
     * @return string
     */
    public function getName();

    /**
     * Get form type service name.
     *
     * @deprecated To be replace with a 'getFormTypeClass' with symfony 2.8 and upper.
     *
     * @return string
     */
    public function getFormTypeName();

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
     * Returns the icon.
     *
     * @return string
     */
    public function getIcon();

    /**
     * Is abstract.
     *
     * @return boolean
     */
    public function isAbstract();

    /**
     * Returns extra form options.
     *
     * @return array
     */
    public function getExtraFormOptions();
}
