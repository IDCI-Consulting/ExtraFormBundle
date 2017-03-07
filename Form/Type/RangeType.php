<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;

class RangeType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
                'value' => null
            ))
            ->setNormalizers(array(
                'value' => function (Options $options, $value) {
                    if (isset($options['data']) && null !== $options['data']) {
                        return $options['data'];
                    }

                    return $options['min'];
                },
                'attr'  => function (Options $options, $value) {
                    return array_merge(
                        array(
                            'min'   => $options['min'],
                            'max'   => $options['max'],
                            'step'  => $options['step'],
                            'value' => $options['value']
                        ),
                        $value
                    );
                }
            ))
            ->setAllowedTypes(array(
                'min'   => array('integer'),
                'max'   => array('integer'),
                'step'  => array('integer'),
                'value' => array('null', 'integer'),
            ))
        ;
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $this->configureOptions($resolver);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'text';
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_range';
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function getName()
    {
        return $this->getBlockPrefix();
    }
}
