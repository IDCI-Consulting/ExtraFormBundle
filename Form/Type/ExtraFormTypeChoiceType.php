<?php

/**
 * @author:  Arthur FARRUGIA <farrugia.arthur@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;
use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;
use IDCI\Bundle\ExtraFormBundle\Form\Event\RawEventSubscriber;

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
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $choices = array();

        foreach ($this->registry->getTypes() as $alias => $type) {
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
     */
    public function getParent()
    {
        return 'choice';
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'extra_form_type_choice';
    }
}
