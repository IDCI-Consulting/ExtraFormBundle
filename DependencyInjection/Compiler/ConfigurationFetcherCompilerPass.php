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

class ConfigurationFetcherCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.configuration.fetcher') ||
            !$container->hasDefinition('idci_extra_form.configuration.fetcher_registry')
        ) {
            return;
        }

        $registryDefinition = $container->getDefinition('idci_extra_form.configuration.fetcher_registry');

        $configurations = $container->getParameter('idci_extra_form.configurations');
        foreach ($configurations as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.configuration.fetcher');
            $serviceName = sprintf('idci_extra_form.configuration.fetcher.%s', $name);

            $serviceDefinition->isAbstract(false);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition($serviceName, $serviceDefinition);

            $registryDefinition->addMethodCall(
                'setFetcher',
                array($name, new Reference($serviceName))
            );
        }

        $taggedServices = $container->findTaggedServiceIds('idci_extra_form.configuration.fetcher');
        foreach ($taggedServices as $id => $attributes) {
            $registryDefinition->addMethodCall(
                'setFetcher',
                array($attributes[0]['alias'], new Reference($id))
            );
        }
    }
}
