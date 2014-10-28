<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;


use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConstraintException;


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
        $this->constraints[$name] = $constraint;
    }

    /**
     * Get constraints
     *
     * @return array
     */
    public function getConstraints()
    {
        return $this->constraints;
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
        if (!isset($this->constraints[$name])) {
            throw new UndefinedExtraFormConstraintException($name);
        }

        return $this->constraints[$name];
    }
}