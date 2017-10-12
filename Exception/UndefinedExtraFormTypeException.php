<?php

/**
 * @author:  Eddie BARRACO <eddie.barraco@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Exception;

class UndefinedExtraFormTypeException extends \InvalidArgumentException
{
    public function __construct($expectedType)
    {
        parent::__construct(sprintf(
            'Expected extra form type "%s"',
            $expectedType
        ));
    }
}
