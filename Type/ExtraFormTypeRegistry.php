<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ExtraFormTypeRegistry implements ExtraFormTypeRegistryInterface
{
    /**
     * @var array
     */
    protected $types;

    /**
     * {@inheritDoc}
     */
    public function setType($alias, ExtraFormTypeInterface $type)
    {
        $this->types[$alias] = $type;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getTypes()
    {
        return $this->types;
    }

    /**
     * {@inheritDoc}
     */
    public function getType($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->types[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load type "%s"', $alias));
        }

        return $this->types[$alias];
    }

    /**
     * {@inheritDoc}
     */
    public function hasType($alias)
    {
        return isset($this->types[$alias]);
    }
}
