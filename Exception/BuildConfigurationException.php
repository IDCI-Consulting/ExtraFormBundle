<?php

/**
 *
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Exception;

class BuildConfigurationException extends \Exception
{
    /**
     * The constructor
     *
     * @param string $message
     */
    public function __construct($message)
    {
        parent::__construct(sprintf(
            'The ExtraFormConfigurator failed to build the configuration: %s',
            $message
        ));
    }
}
