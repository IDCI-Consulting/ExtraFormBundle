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

class ConfiguratorCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.configurator') ||
            !$container->hasDefinition('idci_extra_form.generator')
        ) {
            return;
        }

        $generatorDefinition = $container->getDefinition('idci_extra_form.generator');

        $configurators = $container->getParameter('idci_extra_form.configurators');
        foreach ($configurators as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.configurator');
            $serviceName = sprintf('idci_extra_form.configurator.%s', $name);

            $serviceDefinition->isAbstract(false);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition($serviceName, $serviceDefinition);

            $generatorDefinition->addMethodCall(
                'setConfigurator',
                array($name, new Reference($serviceName))
            );
        }

        $taggedServices = $container->findTaggedServiceIds('idci_extra_form.configurator');
        foreach ($taggedServices as $id => $attributes) {
            $generatorDefinition->addMethodCall(
                'setConfigurator',
                array($attributes[0]['alias'], new Reference($id))
            );
        }
    }
}
