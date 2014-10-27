<?php

/**
 *
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Exception;

class UndefinedExtraFormTypeException extends \Exception
{
    /**
     * The constructor
     *
     * @param string $name
     */
    public function __construct($name)
    {
        parent::__construct(sprintf(
            'The ExtraFormType %s is undefined',
            $name
        ));
    }
}
