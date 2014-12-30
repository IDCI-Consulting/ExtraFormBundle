<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ExtraFormTypeRegistry
{
    protected $types;

    /**
     * Set type.
     *
     * @param string                 $alias The alias.
     * @param ExtraFormTypeInterface $type  The type.
     */
    public function setType($alias, ExtraFormTypeInterface $type)
    {
        $this->types[$alias] = $type;
    }

    /**
     * Returns types.
     *
     * @return array
     */
    public function getTypes()
    {
        return $this->types;
    }

    /**
     * Returns type.
     *
     * @param string $alias The name.
     *
     * @return ExtraFormTypeInterface
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
}