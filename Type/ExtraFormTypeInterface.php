<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\Type;


interface ExtraFormTypeInterface
{
    /**
     * Get form type
     *
     * @return string
     */
    public function getFormType();

    /**
     * Get parent
     *
     * @return ExtraFormTypeInterface
     */
    public function getParent();

    /**
     * Get alias
     *
     * @return string
     */
    public function getAlias();

    /**
     * Is abstract
     *
     * @return boolean
     */
    public function isAbstract();

    /**
     * Get extra form options
     *
     * @return array
     */
    public function getExtraFormOptions();

    /**
     * Get extra form constraints
     *
     * @return array
     */
    public function getExtraFormConstraints();
}