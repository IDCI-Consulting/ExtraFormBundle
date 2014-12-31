<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\DefinitionDecorator;

class ConfigurationBuilderCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.configuration_builder') ||
            !$container->hasDefinition('idci_extra_form.configuration_builder_registry')
        ) {
            return;
        }

        $registryDefinition = $container->getDefinition('idci_extra_form.configuration_builder_registry');

        $configurations = $container->getParameter('idci_extra_form.configurations');
        foreach ($configurations as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.configuration_builder');
            $serviceName = sprintf('idci_extra_form.configuration.%s', $name);

            $serviceDefinition->isAbstract(false);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition($serviceName, $serviceDefinition);

            $registryDefinition->addMethodCall(
                'setBuilder',
                array($name, new Reference($serviceName))
            );
        }

        $taggedServices = $container->findTaggedServiceIds('idci_extra_form.configuration_builder');
        foreach ($taggedServices as $id => $attributes) {
            $registryDefinition->addMethodCall(
                'setBuilder',
                array($attributes[0]['alias'], new Reference($id))
            );
        }
    }
}
