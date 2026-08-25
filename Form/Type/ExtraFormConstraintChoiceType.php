<?php

/**
 * @author:  Arthur FARRUGIA <farrugia.arthur@gmail.com>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistryInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExtraFormConstraintChoiceType extends AbstractType
{
    /**
     * @var ExtraFormConstraintRegistryInterface
     */
    protected $registry;

    /**
     * Constructor.
     */
    public function __construct(ExtraFormConstraintRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $choices = [];

        foreach ($this->registry->getConstraints() as $alias => $type) {
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
        return ChoiceType::class;
    }

    public function getBlockPrefix()
    {
        return 'extra_form_constraint_choice';
    }
}
