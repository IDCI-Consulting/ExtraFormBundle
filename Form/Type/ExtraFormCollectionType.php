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
use Symfony\Component\OptionsResolver\Options;
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
        $view->vars['min_items']     = $options['min_items'];
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
                'type'          => 'text',
                'prototype'     => false,
                'add_button'    => array(),
                'remove_button' => array(),
                'options'       => array('label' => ' '),
            ))
            ->setNormalizers(array(
                'add_button' => function(Options $options, $value) {
                    return array_replace_recursive(
                        array('label' => 'add', 'attr' => array()),
                        $value
                    );
                },
                'remove_button' => function(Options $options, $value) {
                    return array_replace_recursive(
                        array('label' => 'remove', 'attr' => array()),
                        $value
                    );
                },
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
    public function getName()
    {
        return 'extra_form_collection';
    }
}
