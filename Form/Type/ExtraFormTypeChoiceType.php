<?php

/**
 * @author:  Arthur FARRUGIA <farrugia.arthur@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;

class ExtraFormTypeChoiceType extends AbstractType
{
    /**
     * @var ExtraFormTypeRegistryInterface
     */
    protected $registry;

    /**
     * Constructor.
     *
     * @param ExtraFormTypeRegistryInterface $registry
     */
    public function __construct(ExtraFormTypeRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $choices = array();

        foreach ($this->registry->getTypes() as $alias => $type) {
            $choices[$alias] = $type->getDescription();
        }

        $resolver
            ->setDefaults(array(
                'choices' => $choices,
            ))
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
        return 'choice';
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_type_choice';
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
