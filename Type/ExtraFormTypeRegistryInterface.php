<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */
 
namespace IDCI\Bundle\ExtraFormBundle\Type;

interface ExtraFormTypeRegistryInterface
{
    /**
     * Sets an extra form type identify by a alias.
     *
     * @param string                 $alias  The type alias.
     * @param ExtraFormTypeInterface $type   The type.
     *
     * @return ExtraFormTypeRegistryInterface
     */
    public function setType($alias, ExtraFormTypeInterface $type);

    /**
     * Returns an extra form type by alias.
     *
     * @param string $alias The alias of the type.
     *
     * @return ExtraFormTypeInterface The type
     *
     * @throws Exception\UnexpectedTypeException  if the passed alias is not a string.
     * @throws Exception\InvalidArgumentException if the type can not be retrieved.
     */
    public function getType($alias);

    /**
     * Returns whether the given extra form type is supported.
     *
     * @param string $alias The alias of the type.
     *
     * @return bool Whether the type is supported.
     */
    public function hasType($alias);
}
