<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;


interface ExtraFormConstraintInterface
{
    /**
     * Get class name.
     *
     * @return string
     */
    public function getClassName();

    /**
     * Returns the description.
     *
     * @return string
     */
    public function getDescription();

    /**
     * Returns extra form options.
     *
     * @return array
     */
    public function getExtraFormOptions();
}