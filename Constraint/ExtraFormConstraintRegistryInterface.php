<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;

interface ExtraFormConstraintRegistryInterface
{
    /**
     * Sets an extra form constraint identify by a alias.
     *
     * @param string                       $alias      The constraint alias.
     * @param ExtraFormConstraintInterface $constraint The constraint.
     *
     * @return ExtraFormConstraintInterface
     */
    public function setConstraint($alias, ExtraFormConstraintInterface $constraint);

    /**
     * Returns an extra form constraint by alias.
     *
     * @param string $alias The alias of the constraint.
     *
     * @return ExtraFormConstraintInterface The constraint
     *
     * @throws Exception\UnexpectedTypeException  if the passed alias is not a string.
     * @throws Exception\InvalidArgumentException if the constraint can not be retrieved.
     */
    public function getConstraint($alias);

    /**
     * Returns whether the given extra form constraint is supported.
     *
     * @param string $alias The alias of the constraint.
     *
     * @return bool Whether the constraint is supported.
     */
    public function hasConstraint($alias);
}