<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class JsonToArrayTransformer implements DataTransformerInterface
{

    /**
     * {@inheritdoc}
     */
    public function transform($value)
    {
        if (null === $value) {
            return "";
        }

        return json_encode($value);
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($value)
    {
        return json_decode($value, true);
    }
}


