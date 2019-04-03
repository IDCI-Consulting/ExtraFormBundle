<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class IDCIExtraFormExtension extends Extension implements PrependExtensionInterface
{
    public function prepend(ContainerBuilder $container)
    {
        $bundles = $container->getParameter('kernel.bundles');

        // Attempt to prepend the doctrine configuration only if the bundle is registered in the kernel
        // This make doctrine an optional dependency
        if (isset($bundles['DoctrineBundle'])) {
            $config = array(
                'orm' => array(
                    'mappings' => array(
                        'IDCIExtraFormBundle' => array(
                            'type' => 'xml',
                            'dir' => 'Resources/config/doctrine/',
                            'prefix' => 'IDCI\Bundle\ExtraFormBundle\Model',
                            'is_bundle' => true,
                        ),
                    ),
                ),
            );

            $container->prependExtensionConfig('doctrine', $config);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $container->setParameter('idci_extra_form.working_dir', $config['working_dir']);
        $container->setParameter('idci_extra_form.types', $config['types']);
        $container->setParameter('idci_extra_form.constraints', $config['constraints']);
        $container->setParameter('idci_extra_form.configurations', $config['configurations']);
    }
}
