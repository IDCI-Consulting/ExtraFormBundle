<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Exception;

class FetchConfigurationException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $fetcherName
     * @param array  $fetcherParameters
     * @param string $message
     */
    public function __construct($fetcherName, array $fetcherParameters, $message = null)
    {
        parent::__construct(sprintf(
            'Failed to fetch the configuration %s with parameters %s%s',
            $fetcherName,
            json_encode($fetcherParameters),
            null === $message ? '' : ' : '.$message
        ));
    }
}
