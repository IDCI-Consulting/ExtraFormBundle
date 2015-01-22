<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Builder;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\ConfigurationFetcherRegistry;
use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\ConfigurationFetcherInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistry;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistry;

class ExtraFormBuilder implements ExtraFormBuilderInterface
{
    protected $formFactory;
    protected $configurationFetcherRegistry;
    protected $typeRegistry;
    protected $constraintRegistry;

    /**
     * Constructor
     *
     * @param FormFactoryInterface         $formFactory                  The form factory.
     * @param ConfigurationFetcherRegistry $configurationFetcherRegistry The configuration fetcher registry.
     * @param ExtraFormTypeRegistry        $typeRegistry                 The type registry.
     * @param ExtraFormConstraintRegistry  $constraintRegistry           The constraint registry.
     */
    public function __construct(
        FormFactoryInterface         $formFactory,
        ConfigurationFetcherRegistry $configurationFetcherRegistry,
        ExtraFormTypeRegistry        $typeRegistry,
        ExtraFormConstraintRegistry  $constraintRegistry
    )
    {
        $this->formFactory                  = $formFactory;
        $this->configurationFetcherRegistry = $configurationFetcherRegistry;
        $this->typeRegistry                 = $typeRegistry;
        $this->constraintRegistry           = $constraintRegistry;
    }

    /**
     * {@inheritDoc}
     */
    public function build(
        $configuration,
        array $parameters = array(),
        FormBuilderInterface $formBuilder = null
    )
    {
        if (null === $formBuilder) {
            $formBuilder = $this->formFactory->createBuilder();
        }

        if (is_string($configuration)) {
            $configuration = $this
                ->configurationFetcherRegistry
                ->getFetcher($configuration)
            ;
        }

        if ($configuration instanceof ConfigurationFetcherInterface) {
            $configuration = $configuration->fetch($parameters);
        }

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