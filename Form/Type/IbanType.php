<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\IbanTransformer;

class IbanType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new IbanTransformer();
        $builder->addModelTransformer($transformer);

        $builder
            ->add('c1', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c2', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c3', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c4', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c5', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c6', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 4em;'),
                'max_length' => 4
            ))
            ->add('c7', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 3.5em;'),
                'max_length' => 3
            ))
            ->add('c8', 'extra_form_iban_text', array(
                'attr'       => array('style' => 'width: 6em;background:#DDD;'),
                'max_length' => 7,
                'required'   => false
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
