<?php

/**
 * @author:  Brahim BOUKOUFALLAH <brahim.boukoufallah@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;


interface ExtraFormConstraintRegistryInterface
{
    /**
     * Set constraint.
     *
     * @param string                        $alias      The alias.
     * @param ExtraFormConstraintInterface  $constraint The constraint.
     */
    public function setConstraint($alias, ExtraFormConstraintInterface $constraint);

    /**
     * Returns constraints.
     *
     * @return array
     */
    public function getConstraints();

    /**
     * Returns a constraint
     *
     * @param string $alias
     *
     * @return ExtraFormConstraintInterface
     *
     * @throws \IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException if the passed alias is not a string.
     * @throws \InvalidArgumentException if the constraint can not be retrieved.
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