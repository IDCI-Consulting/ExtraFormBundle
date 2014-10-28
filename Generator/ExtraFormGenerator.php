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
    protected $typeHandler;
    
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
    public function generate($configuratorAlias, array $parameters = array(), array $data = array())
    {
        $configuration = $this
            ->getConfigurator($configuratorAlias)
            ->makeConfiguration($parameters)
        ;

        var_dump($configuration); die('TODO: generate now !!!');
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
        if (!isset($this->configurators[$name])) {
            throw new UndefinedExtraFormConfiguratorException($name);
        }

        return $this->configurators[$name];
    }
}