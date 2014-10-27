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

class ExtraFormGenerator implements ExtraFormGeneratorInterface
{
    protected $formFactory;

    /**
     * Constructor
     *
     * @param FormFactoryInterface $formFactory Instance of FormFactory
     */
    public function __construct(FormFactoryInterface $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    /**
     * {@inheritDoc}
     */
    public function generate($configuratorAlias, array $data = array())
    {
    }

    /**
     * {@inheritDoc}
     */
    public function addConfigurator(ExtraFormConfiguratorInterface $configurator)
    {
    }

    /**
     * {@inheritDoc}
     */
    public function getConfigurators()
    {
    }
    
    /**
     * {@inheritDoc}
     */
    public function getConfigurator($alias)
    {
    }
}