<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class ExtraFormConfiguratorRegistry
{
    protected $configurators;

    /**
     * Set configurator.
     *
     * @param string                         $alias         The alias.
     * @param ExtraFormConfiguratorInterface $configuration The configuration.
     */
    public function setConfigurator($alias, ExtraFormConfiguratorInterface $configuration)
    {
        $this->configurators[$alias] = $configuration;
    }

    /**
     * Returns configurators.
     *
     * @return array
     */
    public function getConfigurators()
    {
        return $this->configurators;
    }

    /**
     * Returns configurator.
     *
     * @param string $alias The alias.
     *
     * @return ExtraFormConfiguratorInterface
     */
    public function getConfigurator($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->configurators[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load configurator "%s"', $alias));
        }

        return $this->configurators[$alias];
    }
}