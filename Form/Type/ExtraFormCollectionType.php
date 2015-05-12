<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;

class ExtraFormCollectionType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addEventListener(
            FormEvents::PRE_SET_DATA,
            function(FormEvent $event) use ($options) {
                $form = $event->getForm();
                $data = $event->getData();

                $options['property_path'] = 'test' ;
                for ($i = 0; $i < $options['max_items']; $i++) {
                    $display  = $i < $options['min_items'] || isset($data[$i]) ? 'show' : 'hide';
                    $required = $i < $options['min_items'] ? true : false;

                    $form->add($i, $options['type'], array_replace_recursive(
                        $options['options'],
                        array(
                            'label'    => ' ',
                            'data'     => isset($data[$i]) ? $data[$i] : null,
                            'required' => $required,
                            'attr'     => array('data-display' => $display)
                        )
                    ));
                }
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'min_items'    => 1,
                'max_items'    => 10,
                'allow_add'    => true,
                'allow_delete' => true,
                'prototype'    => false,
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'collection';
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'extra_form_collection';
    }
}
