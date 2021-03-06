<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RangeType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
                'min' => 0,
                'max' => 100,
                'step' => 1,
                'value' => null,
            ))
            ->setNormalizer(
                'value',
                function (OptionsResolver $options, $value) {
                    if (isset($options['data']) && null !== $options['data']) {
                        return $options['data'];
                    }

                    return $options['min'];
                }
            )
            ->setNormalizer(
                'attr',
                function (OptionsResolver $options, $value) {
                    return array_merge(
                        array(
                            'min' => $options['min'],
                            'max' => $options['max'],
                            'step' => $options['step'],
                            'value' => $options['value'],
                        ),
                        $value
                    );
                }
            )
            ->setAllowedTypes('min', array('integer'))
            ->setAllowedTypes('max', array('integer'))
            ->setAllowedTypes('step', array('integer'))
            ->setAllowedTypes('value', array('null'))
        ;
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $this->configureOptions($resolver);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return TextType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_range';
    }
}
