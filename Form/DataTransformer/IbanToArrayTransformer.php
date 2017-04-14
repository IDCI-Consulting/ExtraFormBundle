<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: GPL
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class IbanToArrayTransformer implements DataTransformerInterface
{
    /**
     * Transforms
     *
     * @param string $in
     * @return array
     */
    public function transform($in)
    {
        if (null !== $in && !is_array($in)) {
            $in = strtoupper($in);
            return array(
                'c1' => substr($in, 0, 4),
                'c2' => substr($in, 4, 4),
                'c3' => substr($in, 8, 4),
                'c4' => substr($in, 12, 4),
                'c5' => substr($in, 16, 4),
                'c6' => substr($in, 20, 4),
                'c7' => substr($in, 24, 3),
                'c8' => substr($in, 27),
            );
        }

        return $in;
    }

    /**
     * Reverse transforms
     *
     * @param array $out
     * @return string
     */
    public function reverseTransform($out)
    {
        if (null !== $out && is_array($out)) {
            return strtoupper(
                sprintf(
                    '%s%s%s%s%s%s%s%s',
                    $out['c1'],
                    $out['c2'],
                    $out['c3'],
                    $out['c4'],
                    $out['c5'],
                    $out['c6'],
                    $out['c7'],
                    $out['c8']
                )
            );
        }

        return $out;
    }
}
