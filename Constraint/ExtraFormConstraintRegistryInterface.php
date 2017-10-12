<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @author:  Brahim BOUKOUFALLAH <brahim.boukoufallah@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;

interface ExtraFormConstraintRegistryInterface
{
    /**
     * Sets an extra form constraint identify by a alias.
     *
     * @param string                       $alias      the constraint alias
     * @param ExtraFormConstraintInterface $constraint the constraint
     *
     * @return ExtraFormConstraintRegistryInterface
     */
    public function setConstraint($alias, ExtraFormConstraintInterface $constraint);

    /**
     * Returns constraints.
     *
     * @return array
     */
    public function getConstraints();

    /**
     * Returns an extra form constraint by alias.
     *
     * @param string $alias the alias of the constraint
     *
     * @return ExtraFormConstraintInterface The constraint
     *
     * @throws \IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException if the passed alias is not a string
     * @throws Exception\InvalidArgumentException                             if the constraint can not be retrieved
     */
    public function getConstraint($alias);

    /**
     * Returns whether the given extra form constraint is supported.
     *
     * @param string $alias the alias of the constraint
     *
     * @return bool whether the constraint is supported
     */
    public function hasConstraint($alias);
}
