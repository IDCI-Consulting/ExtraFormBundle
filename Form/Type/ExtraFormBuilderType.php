<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;
use IDCI\Bundle\ExtraFormBundle\Builder\ExtraFormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Form\Event\RawEventSubscriber;

class ExtraFormBuilderType extends AbstractType
{
    protected $extraFormBuilder;

    /**
     * Constructor.
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
                'IDCI\Bundle\ExtraFormBundle\Form\Event\%sTransformEventSubscriber',
                ucfirst(strtolower($options['transform_method']))
            );
            $builder->addEventSubscriber(new $subscriberClassName);
        }

        try {
            $this
                ->extraFormBuilder
                ->build(
                    $options['configuration'],
                    $options['parameters'],
                    $builder
                )
            ;
        } catch (\Exception $e) {
            $builder->add('raw', 'json_textarea');
            $builder->addEventSubscriber(new RawEventSubscriber());
        }
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setRequired(array(
                'configuration'
            ))
            ->setAllowedTypes(array(
                'configuration' => array(
                    'string',
                    'array',
                    'IDCI\Bundle\ExtraFormBundle\Builder\ConfigurationBuilderInterface'
                )
            ))
            ->setDefaults(array(
                'parameters'       => array(),
                'transform_method' => null
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
