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
        $prototype = $builder->create(
            '__collection_item_prototype__',
            $options['type'],
            array_merge(
                $options['options'],
                array(
                    'required' => false,
                    'attr' => array_merge(
                        $options['options']['attr'],
                        array(
                            'data-collection-id' => $options['collection_id'],
                            'data-display' => 'prototype',
                        )
                    ),
                )
            )
        );
        $prototype->add('__to_remove', 'checkbox', array(
            'mapped' => false,
            'required' => false,
            'data' => true,
            'attr' => array(
                'class' => 'unchangeable_field idci_collection_item_remove',
            ),
        ));

        $builder->setAttribute('prototype', $prototype->getForm());

        $builder->addEventSubscriber(new CollectionEventSubscriber($options));
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['min_items'] = $options['min_items'];
        $view->vars['max_items'] = $options['max_items'];
        $view->vars['add_button'] = $options['add_button'];
        $view->vars['remove_button'] = $options['remove_button'];
        $view->vars['collection_id'] = $options['collection_id'];
        $view->vars['prototype'] = $form->getConfig()->getAttribute('prototype')->createView($view);
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'min_items' => 1,
                'max_items' => 10,
                'type' => 'text',
                'add_button' => array(),
                'remove_button' => array(),
                'options' => array(),
                'collection_id' => 'default',
            ))
            ->setNormalizers(array(
                'add_button' => function (Options $options, $value) {
                    $attr = ($options['min_items'] == $options['max_items']) ?
                        array('style' => 'display:none;') :
                        array()
                    ;

                    return array_replace_recursive(
                        array('label' => 'add', 'attr' => $attr),
                        $value
                    );
                },
                'remove_button' => function (Options $options, $value) {
                    $attr = ($options['min_items'] == $options['max_items']) ?
                        array('style' => 'display:none;') :
                        array()
                    ;

                    return array_replace_recursive(
                        array('label' => 'remove', 'attr' => $attr),
                        $value
                    );
                },
                'options' => function (Options $options, $value) {
                    return array_merge(
                        array(
                            'label' => ' ',
                            'attr' => array(),
                        ),
                        $value
                    );
                },
            ))
            ->setAllowedTypes(array(
                'add_button' => array('array'),
                'remove_button' => array('array'),
                'collection_id' => array('string'),
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
