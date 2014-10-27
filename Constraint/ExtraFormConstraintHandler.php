<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\Constraint;


class ExtraFormConstraintHandler
{
    protected $constraints;

    /**
     * Set constraint
     *
     * @param string $name
     * @param ExtraFormConstraintInterface $constraint
     */
    public function setConstraint($name, ExtraFormConstraintInterface $constraint)
    {
    }
    /**
     * Get constraints
     *
     * @return array
     */
    public function getConstraints()
    {
    }

    /**
     * Get constraint
     *
     * @param  string $name
     * @return ExtraFormConstraintInterface
     * @throw  UndefinedExtraFormConstraintException
     */
    public function getConstraint($name)
    {
    }
}