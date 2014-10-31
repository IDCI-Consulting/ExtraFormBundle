<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\Form\FormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Configurator\ExtraFormConfiguratorInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeHandler;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintHandler;
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormConfiguratorException;

class ExtraFormBuilder implements ExtraFormBuilderInterface
{
    protected $configurators;
    protected $typeHandler;
    protected $constraintHandler;

    /**
     * Constructor
     *
     * @param ExtraFormTypeHandler       $typeHandler
     * @param ExtraFormConstraintHandler $constraintHandler
     */
    public function __construct(
        ExtraFormTypeHandler       $typeHandler,
        ExtraFormConstraintHandler $constraintHandler
    )
    {
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
    public function build(
        FormBuilderInterface & $formBuilder,
        $configuratorAlias,
        array $configuratorParameters = array()
    )
    {
        $configuration = $this
            ->getConfigurator($configuratorAlias)
            ->makeConfiguration($configuratorParameters)
        ;

        foreach ($configuration['fields'] as $name => $field) {
            $formBuilder->add(
                $name,
                $this->buildFieldType($field)->getFormType(),
                $this->buildFieldOptions($field)
            );
        }
    }

    /**
     * Build field type
     *
     * @param  array $field
     * @return string
     */
    protected function buildFieldType(array $field)
    {
        return $this
            ->typeHandler
            ->getType($field['extra_form_type'])
        ;
    }

    /**
     * Build field options
     *
     * @param  array $field
     * @return array
     */
    protected function buildFieldOptions(array $field)
    {
        // TODO: build constraints and merge
        return $field['options'];
    }
}