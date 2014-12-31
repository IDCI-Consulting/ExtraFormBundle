<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ConfigurationBuilderRegistry
{
    protected $builders;

    /**
     * Set configuration.
     *
     * @param string                        $alias   The alias.
     * @param ConfigurationBuilderInterface $builder The configuration builder.
     */
    public function setBuilder($alias, ConfigurationBuilderInterface $builder)
    {
        $this->builders[$alias] = $builder;
    }

    /**
     * Returns configuration builders.
     *
     * @return array
     */
    public function getBuilders()
    {
        return $this->builders;
    }

    /**
     * Returns builder.
     *
     * @param string $alias The alias.
     *
     * @return ConfigurationBuilderInterface
     */
    public function getBuilder($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->builders[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load configuration builder "%s"', $alias));
        }

        return $this->builders[$alias];
    }
}