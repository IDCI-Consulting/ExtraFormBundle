<?php

/**
 * @author:  Thomas Prelot <tprelot@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\StepWorker;

use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use IDCI\Bundle\StepBundle\Configuration\Worker\ConfigurationWorkerInterface;
use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;

class ExtraFormBuilderWorker implements ConfigurationWorkerInterface
{
    /**
     * The extra form builder.
     *
     * @var ExtraFormBuilderInterface
     */
    protected $extraFormBuilder;

    /**
     * Constructor.
     *
     * @param ExtraFormBuilderInterface $extraFormBuilder the extra form builder
     */
    public function __construct(ExtraFormBuilderInterface $extraFormBuilder)
    {
        $this->extraFormBuilder = $extraFormBuilder;
    }

    /**
     * Sets the default parameters.
     *
     * @param OptionsResolverInterface $resolver the options resolver
     */
    public function setDefaultParameters(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setRequired(array('configuration'))
            ->setDefaults(array(
                'parameters' => array(),
                'data' => array(),
                'formBuilder' => null,
            ))
            ->setAllowedTypes(array(
                'formBuilder' => array(
                    'null',
                    'Symfony\Component\Form\FormBuilderInterface',
                ),
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function work(array $parameters = array())
    {
        $resolver = new OptionsResolver();
        $this->setDefaultParameters($resolver);
        $resolvedParameters = $resolver->resolve($parameters);

        return $this->extraFormBuilder->build(
            $resolvedParameters['configuration'],
            $resolvedParameters['parameters'],
            $resolvedParameters['data'],
            $resolvedParameters['formBuilder']
        );
    }
}
