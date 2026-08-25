<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\ConfigurationFetcherInterface;
use IDCI\Bundle\ExtraFormBundle\Form\Event\RawEventSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExtraFormBuilderType extends AbstractType
{
    protected $extraFormBuilder;

    /**
     * Constructor.
     */
    public function __construct(ExtraFormBuilderInterface $extraFormBuilder)
    {
        $this->extraFormBuilder = $extraFormBuilder;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        if (null !== $options['transform_method']) {
            $subscriberClassName = sprintf(
                'IDCI\Bundle\ExtraFormBundle\Form\Event\%sTransformEventSubscriber',
                ucfirst(strtolower($options['transform_method']))
            );
            $builder->addEventSubscriber(new $subscriberClassName());
        }

        try {
            $this
                ->extraFormBuilder
                ->build(
                    $options['configuration'],
                    $options['parameters'],
                    isset($options['data']) ? $options['data'] : null,
                    $builder
                )
            ;
        } catch (\Exception $e) {
            $builder->add('raw', JsonTextareaType::class);
            $builder->addEventSubscriber(new RawEventSubscriber());
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired([
                'configuration',
            ])
            ->setAllowedTypes(
                'configuration',
                [
                    'string',
                    'array',
                    ConfigurationFetcherInterface::class,
                ]
            )
            ->setDefaults([
                'inherit_data' => false,
                'parameters' => [],
                'transform_method' => null,
            ])
            ->setAllowedValues(
                'transform_method',
                [null, 'jsonize', 'serialize']
            )
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
        return 'extra_form_builder';
    }
}
