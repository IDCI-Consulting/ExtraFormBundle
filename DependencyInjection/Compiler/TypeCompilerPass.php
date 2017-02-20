<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\DefinitionDecorator;
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormTypeException;
use IDCI\Bundle\ExtraFormBundle\Exception\WrongExtraFormTypeOptionException;

class TypeCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.type') ||
            !$container->hasDefinition('idci_extra_form.type_registry')
        ) {
            return;
        }

        $registryDefinition = $container->getDefinition('idci_extra_form.type_registry');

        $types = $container->getParameter('idci_extra_form.types');
        $extraFormOptions = array();
        foreach ($types as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.type');

            if (null !== $configuration['parent']) {
                if (!$container->hasDefinition($this->getDefinitionName($configuration['parent']))) {
                    throw new UndefinedExtraFormTypeException($configuration['parent']);
                }

                $configuration['parent'] = new Reference(
                    $this->getDefinitionName($configuration['parent'])
                );
            }

            $configuration['name'] = $name;

            $serviceDefinition->isAbstract($configuration['abstract']);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition(
                $this->getDefinitionName($name),
                $serviceDefinition
            );

            $registryDefinition->addMethodCall(
                'setType',
                array($name, new Reference($this->getDefinitionName($name)))
            );

            $extraFormOptions[$name] = $configuration['extra_form_options'];
        }

        // Check extra_form_options
        foreach ($extraFormOptions as $name => $options) {
            foreach ($options as $optionName => $optionValue) {
                if (!$container->hasDefinition($this->getDefinitionName($optionValue['extra_form_type']))) {
                    throw new WrongExtraFormTypeOptionException(
                        $name,
                        $optionName,
                        sprintf('Undefined ExtraFormType "%s"', $optionValue['extra_form_type'])
                    );
                }
            }
        }
    }

    /**
     * Get definition name
     *
     * @param  string $name
     * @return string
     */
    protected function getDefinitionName($name)
    {
        return sprintf('idci_extra_form.type.%s', $name);
    }
}
