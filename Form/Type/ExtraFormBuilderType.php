<?php

/**
 *
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;
use IDCI\Bundle\ExtraFormBundle\Builder\ExtraFormBuilderInterface;


class ExtraFormBuilderType extends AbstractType
{
    protected $extraFormBuilder;

    /**
     * Constructor
     *
     * @param ExtraFormBuilderInterface $extraFormBuilder
     */
    public function __construct(ExtraFormBuilderInterface $extraFormBuilder)
    {
        $this->extraFormBuilder = $extraFormBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if (null !== $options['transform_method']) {
            $subscriberClassName = sprintf(
                'IDCI\Bundle\ExtraFormBundle\Form\Event\%sEventSubscriber',
                ucfirst(strtolower($options['transform_method']))
            );
            $builder->addEventSubscriber(new $subscriberClassName);
        }

        $this
            ->extraFormBuilder
            ->build(
                $builder,
                $options['configurator_alias'],
                $options['configurator_parameters']
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setRequired(array(
                'configurator_alias'
            ))
            ->setAllowedTypes(array(
                'configurator_alias' => 'string'
            ))
            ->setDefaults(array(
                'configurator_parameters' => array(),
                'transform_method'        => null
            ))
            ->setAllowedValues(array(
                'transform_method' => array(null, 'jsonize', 'serialize')
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'extra_form_builder';
    }
}
