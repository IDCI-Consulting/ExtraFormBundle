<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorRegistry;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistry;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistry;
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConfiguratorException;

class ExtraFormBuilder implements ExtraFormBuilderInterface
{
    protected $formFactory;
    protected $configuratorRegistry;
    protected $typeRegistry;
    protected $constraintRegistry;

    /**
     * Constructor
     *
     * @param FormFactoryInterface          $formFactory The form factory.
     * @param ExtraFormConfiguratorRegistry $configuratorRegistry The configurator registry.
     * @param ExtraFormTypeRegistry         $typeRegistry         The type registry.
     * @param ExtraFormConstraintRegistry   $constraintRegistry   The constraint registry.
     */
    public function __construct(
        FormFactoryInterface          $formFactory,
        ExtraFormConfiguratorRegistry $configuratorRegistry,
        ExtraFormTypeRegistry         $typeRegistry,
        ExtraFormConstraintRegistry   $constraintRegistry
    )
    {
        $this->formFactory          = $formFactory;
        $this->configuratorRegistry = $configuratorRegistry;
        $this->typeRegistry         = $typeRegistry;
        $this->constraintRegistry   = $constraintRegistry;
    }

    /**
     * {@inheritDoc}
     */
    public function build(
        $configurator,
        array $parameters = array(),
        FormBuilderInterface $formBuilder = null
    )
    {
        if (null === $formBuilder) {
            $formBuilder = $this->formFactory->createBuilder();
        }

        if (! $configurator instanceof ExtraFormConfiguratorInterface) {
            $configurator = $this
                ->configuratorRegistry
                ->getConfigurator($configurator)
            ;
        }

        $configuration = $configurator->makeConfiguration($parameters);
        foreach ($configuration as $name => $field) {
            $formBuilder->add(
                $name,
                $this->buildFieldType($field)->getFormType(),
                $this->buildFieldOptions($field)
            );
        }

        return $formBuilder;
    }

    /**
     * Build field type.
     *
     * @param array $field
     *
     * @return string
     */
    protected function buildFieldType(array $field)
    {
        return $this
            ->typeRegistry
            ->getType($field['extra_form_type'])
        ;
    }

    /**
     * Build field options.
     *
     * @param array $field
     *
     * @return array
     */
    protected function buildFieldOptions(array $field)
    {
        // TODO: build constraints and merge
        return $field['options'];
    }
}