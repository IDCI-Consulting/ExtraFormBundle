<?php

/**
 * @author:  Brahim BOUKOUFALLAH <brahim.boukoufallah@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;

interface ExtraFormTypeRegistryInterface
{
    /**
     * Set type.
     *
     * @param string                 $alias The alias.
     * @param ExtraFormTypeInterface $type  The type.
     */
    public function setType($alias, ExtraFormTypeInterface $type);

    /**
     * Returns types.
     *
     * @return array
     */
    public function getTypes();

    /**
     * Returns type.
     *
     * @param string $alias The name.
     *
     * @return ExtraFormTypeInterface
     *
     * @throws \IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException if the passed alias is not a string.
     * @throws \InvalidArgumentException if the type can not be retrieved.
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