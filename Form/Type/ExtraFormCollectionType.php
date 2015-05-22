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
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use IDCI\Bundle\ExtraFormBundle\Form\Event\CollectionEventSubscriber;

class ExtraFormCollectionType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addEventSubscriber(new CollectionEventSubscriber($options));
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['add_button']    = $options['add_button'];
        $view->vars['remove_button'] = $options['remove_button'];
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'min_items'     => 1,
                'max_items'     => 10,
                'allow_add'     => true,
                'allow_delete'  => true,
                'prototype'     => false,
                'add_button'    => array('label' => 'add', 'attr' => array()),
                'remove_button' => array('label' => 'remove', 'attr' => array()),
                'options'       => array('label' => ' '),
            ))
            ->setAllowedTypes(array(
                'add_button'    => array('array'),
                'remove_button' => array('array'),
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
