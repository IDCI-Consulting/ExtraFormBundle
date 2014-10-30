<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Generator;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeHandler;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintHandler;
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConfiguratorException;

class ExtraFormGenerator implements ExtraFormGeneratorInterface
{
    protected $configurators;
    protected $formFactory;
    protected $typeHandler;
    protected $constraintHandler;

    /**
     * Constructor
     *
     * @param FormFactoryInterface       $formFactory
     * @param ExtraFormTypeHandler       $typeHandler
     * @param ExtraFormConstraintHandler $constraintHandler
     */
    public function __construct(
        FormFactoryInterface       $formFactory,
        ExtraFormTypeHandler       $typeHandler,
        ExtraFormConstraintHandler $constraintHandler
    )
    {
        $this->formFactory       = $formFactory;
        $this->typeHandler       = $typeHandler;
        $this->constraintHandler = $constraintHandler;
    }

    /**
     * {@inheritDoc}
     */
    public function setConfigurator($alias, ExtraFormConfiguratorInterface $configurator)
    {
        $this->configurators[$alias] = $configurator;
    }

    /**
     * {@inheritDoc}
     */
    public function getConfigurators()
    {
        return $this->configurators;
    }

    /**
     * {@inheritDoc}
     */
    public function getConfigurator($alias)
    {
        if (!isset($this->configurators[$alias])) {
            throw new UndefinedExtraFormConfiguratorException($alias);
        }

        return $this->configurators[$alias];
    }

    /**
     * {@inheritDoc}
     */
    public function generate(
        $configuratorAlias,
        array $configuratorParameters = array(),
        array $data = array()
    )
    {
        $configuration = $this
            ->getConfigurator($configuratorAlias)
            ->makeConfiguration($configuratorParameters)
        ;

        if (null === $configuration['name']) {
            $configuration['name'] = $configuratorAlias;
        }

        $formBuilder = $this
            ->formFactory
            ->createNamedBuilder(
                $configuration['name'],
                'form',
                $data,
                $configuration['options']
            )
        ;

        foreach ($configuration['fields'] as $name => $field) {
            $this->addFormField(
                $formBuilder,
                $name,
                $this->generateFieldType($field),
                $this->generateFieldOptions($field)
            );
        }

        return $formBuilder;
    }

    /**
     * Add form field
     *
     * @param FormBuilderInterface $formBuilder
     * @param string $name
     * @param ExtraFormTypeInterface $extraFormType
     * @param array  $options
     */
    protected function addFormField(
        FormBuilderInterface & $formBuilder,
        $name,
        ExtraFormTypeInterface $extraFormType,
        array $options
    )
    {
        $formBuilder->add(
            $name,
            $extraFormType->getFormType(),
            $options
        );
    }

    /**
     * Generate field type
     *
     * @param  array $field
     * @return string
     */
    protected function generateFieldType(array $field)
    {
        return $this
            ->typeHandler
            ->getType($field['extra_form_type'])
        ;
    }

    /**
     * Generate field options
     *
     * @param  array $field
     * @return array
     */
    protected function generateFieldOptions(array $field)
    {
        // TODO: build constraints and merge
        return $field['options'];
    }
}