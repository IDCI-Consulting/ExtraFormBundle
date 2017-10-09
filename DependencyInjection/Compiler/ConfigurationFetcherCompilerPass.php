<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\ConfigurationFetcherInterface;
use IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher\ConfigurationFetcherRegistry;
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
        if (!$container->findDefinition(ConfigurationFetcherInterface::class) ||
            !$container->hasDefinition(ConfigurationFetcherRegistry::class)
        ) {
            return;
        }

        $registryDefinition = $container->getDefinition(ConfigurationFetcherRegistry::class);

        $configurations = $container->getParameter('idci_extra_form.configurations');
        foreach ($configurations as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.configuration.fetcher');
            $serviceName = sprintf('idci_extra_form.configuration.fetcher.%s', $name);

            $serviceDefinition->setAbstract(false);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition($serviceName, $serviceDefinition);

            $registryDefinition->addMethodCall(
                'setFetcher',
                array($name, new Reference($serviceName))
            );
        }

        $taggedServices = $container->findTaggedServiceIds('idci_extra_form.configuration.fetcher');
        foreach ($taggedServices as $id => $tags) {
            foreach ($tags as $attributes) {
                $registryDefinition->addMethodCall(
                    'setFetcher',
                    array($attributes['alias'], new Reference($id))
                );
            }
        }
    }
}
