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
    public function generate(
        $configuratorAlias,
        array $configuratorParameters = array(),
        $formName = null,
        array $formOptions = array()
    )
    {
        $configuration = $this
            ->getConfigurator($configuratorAlias)
            ->makeConfiguration($configuratorParameters)
        ;

        if (null === $formName) {
            $formBuilder = $this
                ->formFactory
                ->createBuilder('form', null, $formOptions);
        } else {
            $formBuilder = $this
                ->formFactory
                ->createNamedBuilder($formName, 'form', null, $formOptions)
            ;
        }

        // TODO: buildForm

        return $formBuilder;
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
}