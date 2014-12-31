<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

class ConfigurationBuilder extends AbstractConfigurationBuilder
{
    protected $raw;

    /**
     * Constructor.
     *
     * @param array $raw
     */
    public function __construct(array $raw)
    {
        $this->raw = $raw;
    }

    /**
     * {@inheritDoc}
     */
    public function make(array $parameters = array())
    {
        return $this->raw['fields'];
    }
}