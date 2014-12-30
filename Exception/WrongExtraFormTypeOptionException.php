<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Exception;

class WrongExtraFormTypeOptionException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     * @param string $optionName
     * @param string $message
     */
    public function __construct($name, $optionName, $message)
    {
        parent::__construct(sprintf(
            'The ExtraFormType "%s" contain a misconfigured extra_form_option "%s": %s',
            $name,
            $optionName,
            $message
        ));
    }
}
