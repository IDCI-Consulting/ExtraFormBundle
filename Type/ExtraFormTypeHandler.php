<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;


use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormTypeException;


class ExtraFormTypeHandler
{
    protected $types;

    /**
     * Set type
     *
     * @param string $name
     * @param ExtraFormTypeInterface $type
     */
    public function setType($name, ExtraFormTypeInterface $type)
    {
        $this->types[$name] = $type;
    }

    /**
     * Get types
     *
     * @return array
     */
    public function getTypes()
    {
        return $this->types;
    }

    /**
     * Get type
     *
     * @param  string $name
     * @return ExtraFormTypeInterface
     * @throw  UndefinedExtraFormTypeException
     */
    public function getType($name)
    {
        if (!isset($this->types[$name])) {
            throw new UndefinedExtraFormTypeException($name);
        }

        return $this->types[$name];
    }
}