<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ExtraFormConstraintRegistry implements ExtraFormConstraintRegistryInterface
{
    /**
     * @var array
     */
    protected $constraints;

    /**
     * {@inheritDoc}
     */
    public function setConstraint($alias, ExtraFormConstraintInterface $constraint)
    {
        $this->constraints[$alias] = $constraint;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getConstraints()
    {
        return $this->constraints;
    }

    /**
     * {@inheritDoc}
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
        return isset($this->constraints[$alias]);
    }
}
