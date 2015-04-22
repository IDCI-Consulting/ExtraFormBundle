<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ExtraFormConstraintRegistry implements ExtraFormConstraintRegistryInterface
{
    protected $constraints;

    /**
     * Set constraint.
     *
     * @param string                        $alias      The alias.
     * @param ExtraFormConstraintInterface  $constraint The constraint.
     */
    public function setConstraint($alias, ExtraFormConstraintInterface $constraint)
    {
        $this->constraints[$alias] = $constraint;
    }

    /**
     * Returns constraints.
     *
     * @return array
     */
    public function getConstraints()
    {
        return $this->constraints;
    }

    /**
     * Returns a constraint
     *
     * @param string $alias
     *
     * @return ExtraFormConstraintInterface
     */
    public function getConstraint($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->constraints[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load constraint "%s"', $alias));
        }

        return $this->constraints[$alias];
    }

    /**
     * {@inheritDoc}
     */
    public function hasConstraint($alias)
    {
        if (!isset($this->constraints[$alias])) {
            return false;
        }

        return true;
    }
}