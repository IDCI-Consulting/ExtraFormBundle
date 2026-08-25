<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Form\Event\CollectionEventSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExtraFormCollectionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $prototype = $builder->create(
            '__collection_item_prototype__',
            $options['type'],
            array_merge(
                $options['options'],
                [
                    'required' => false,
                    'attr' => array_merge(
                        $options['options']['attr'],
                        [
                            'data-collection-id' => $options['collection_id'],
                            'data-display' => 'prototype',
                        ]
                    ),
                ]
            )
        );
        $prototype->add('__to_remove', CheckboxType::class, [
            'mapped' => false,
            'required' => false,
            'data' => true,
            'attr' => [
                'class' => 'unchangeable_field idci_collection_item_remove',
            ],
        ]);

        $builder->setAttribute('prototype', $prototype->getForm());

        $builder->addEventSubscriber(new CollectionEventSubscriber($options));
    }

    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['min_items'] = $options['min_items'];
        $view->vars['max_items'] = $options['max_items'];
        $view->vars['add_button'] = $options['add_button'];
        $view->vars['remove_button'] = $options['remove_button'];
        $view->vars['collection_id'] = $options['collection_id'];
        $view->vars['prototype'] = $form->getConfig()->getAttribute('prototype')->createView($view);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'min_items' => 1,
                'max_items' => 10,
                'type' => TextareaType::class,
                'add_button' => [],
                'remove_button' => [],
                'options' => [],
                'collection_id' => 'default',
            ])
            ->setNormalizer(
                'add_button',
                function (OptionsResolver $options, $value) {
                    $attr = ($options['min_items'] == $options['max_items']) ?
                        ['style' => 'display:none;'] :
                        []
                    ;

                    return array_replace_recursive(
                        ['label' => 'add', 'attr' => $attr],
                        $value
                    );
                }
            )
            ->setNormalizer(
                'remove_button',
                function (OptionsResolver $options, $value) {
                    $attr = ($options['min_items'] == $options['max_items']) ?
                        ['style' => 'display:none;'] :
                        []
                    ;

                    return array_replace_recursive(
                        ['label' => 'remove', 'attr' => $attr],
                        $value
                    );
                }
            )
            ->setNormalizer(
                'options',
                function (OptionsResolver $options, $value) {
                    return array_merge(
                        [
                            'label' => ' ',
                            'attr' => [],
                            'compound' => true,
                        ],
                        $value
                    );
                }
            )
            ->setAllowedTypes('add_button', ['array'])
            ->setAllowedTypes('remove_button', ['array'])
            ->setAllowedTypes('collection_id', ['string'])
        ;
    }

    /**
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $this->configureOptions($resolver);
    }

    public function getBlockPrefix()
    {
        return 'extra_form_collection';
    }
}
