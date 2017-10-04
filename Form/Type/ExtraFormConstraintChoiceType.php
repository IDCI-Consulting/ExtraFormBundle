<?php

/**
 * @author:  Arthur FARRUGIA <farrugia.arthur@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistryInterface;

class ExtraFormConstraintChoiceType extends AbstractType
{
    /**
     * @var ExtraFormConstraintRegistryInterface
     */
    protected $registry;

    /**
     * Constructor.
     *
     * @param ExtraFormConstraintRegistryInterface $registry
     */
    public function __construct(ExtraFormConstraintRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $choices = array();

        foreach ($this->registry->getConstraints() as $alias => $type) {
            $choices[$alias] = $type->getDescription();
        }

        $resolver
            ->setDefaults(array(
                'choices' => $choices
            ))
        ;
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $this->configureOptions($resolver);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return ChoiceType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_constraint_choice';
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
