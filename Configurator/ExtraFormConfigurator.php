<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;


class ExtraFormConfigurator extends AbstractExtraFormConfigurator
{
    protected $raw;

    /**
     * Constructor
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
    public function doMakeConfiguration(array $parameters = array())
    {
        return $this->raw['fields'];
    }
}