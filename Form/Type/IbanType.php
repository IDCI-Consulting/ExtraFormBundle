<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\IbanToArrayTransformer;

class IbanType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new IbanToArrayTransformer();
        $builder->addModelTransformer($transformer);

        $builder
            ->add('c1', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c2', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c3', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c4', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c5', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c6', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 4em;',
                    'maxlength' => 4,
                ),
            ))
            ->add('c7', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 3.5em;',
                    'maxlength' => 3,
                ),
            ))
            ->add('c8', IbanTextType::class, array(
                'attr' => array(
                    'style' => 'width: 6em;background:#DDD;',
                    'maxlength' => 7,
                ),
                'required' => false,
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_iban';
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
