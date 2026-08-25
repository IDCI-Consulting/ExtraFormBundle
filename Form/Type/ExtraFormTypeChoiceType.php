<?php

/**
 * @author:  Arthur FARRUGIA <farrugia.arthur@gmail.com>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExtraFormTypeChoiceType extends AbstractType
{
    /**
     * @var ExtraFormTypeRegistryInterface
     */
    protected $registry;

    /**
     * Constructor.
     */
    public function __construct(ExtraFormTypeRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $choices = [];

        foreach ($this->registry->getTypes() as $alias => $type) {
            $choices[$alias] = $type->getDescription();
        }

        $resolver
            ->setDefaults([
                'choices' => $choices,
            ])
        ;
    }

    /**
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $this->configureOptions($resolver);
    }

    public function getParent()
    {
        return 'choice';
    }

    public function getBlockPrefix()
    {
        return 'extra_form_type_choice';
    }
}
