<?php

/**
 * @author:  Thomas Prelot <tprelot@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilder;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\Definition;

class ExtraFormStepWorkerCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        // Process it only if the step bundle is loaded.
        if (!class_exists('IDCI\Bundle\StepBundle\Configuration\Worker\ConfigurationWorkerRegistryInterface') ||
            !$container->findDefinition(
                'IDCI\Bundle\StepBundle\Configuration\Worker\ConfigurationWorkerRegistryInterface'
            )
        ) {
            return;
        }

        $registryDefinition = $container->findDefinition(
            'IDCI\Bundle\StepBundle\Configuration\Worker\ConfigurationWorkerRegistryInterface'
        );
        $workerDefinition = new Definition(
            'IDCI\\Bundle\\ExtraFormBundle\\Configuration\\StepWorker\\ExtraFormBuilderWorker'
        );
        $workerServiceId = 'idci_extra_form.configuration.step_worker.extra_form_builder';

        $workerDefinition->addArgument(new Reference(ExtraFormBuilder::class));

        $container->setDefinition(
            $workerServiceId,
            $workerDefinition
        );

        $registryDefinition->addMethodCall(
            'setWorker',
            array('extra_form_builder', new Reference($workerServiceId))
        );
    }
}
