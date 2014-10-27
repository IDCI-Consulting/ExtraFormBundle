<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;


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
    }

    /**
     * Get types
     *
     * @return array
     */
    public function getTypes()
    {
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
    }
}