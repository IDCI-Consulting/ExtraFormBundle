<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormTypeException;
use IDCI\Bundle\ExtraFormBundle\Exception\WrongExtraFormTypeOptionException;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;
use Symfony\Component\DependencyInjection\ChildDefinition;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

class TypeCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        if (!$container->has(ExtraFormTypeInterface::class)
            || !$container->has(ExtraFormTypeRegistryInterface::class)
        ) {
            return;
        }

        $registryDefinition = $container->findDefinition(ExtraFormTypeRegistryInterface::class);

        $types = $container->getParameter('idci_extra_form.types');
        $extraFormOptions = [];
        foreach ($types as $blockPrefix => $configuration) {
            $serviceDefinition = new ChildDefinition(ExtraFormTypeInterface::class);

            if (null !== $configuration['parent']) {
                if (!$container->hasDefinition($this->getDefinitionName($configuration['parent']))) {
                    throw new UndefinedExtraFormTypeException($configuration['parent']);
                }

                $configuration['parent'] = new Reference(
                    $this->getDefinitionName($configuration['parent'])
                );
            }

            $configuration['block_prefix'] = $blockPrefix;

            $serviceDefinition->setAbstract(false);
            $serviceDefinition->setPublic(!$configuration['abstract']);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition(
                $this->getDefinitionName($blockPrefix),
                $serviceDefinition
            );

            $registryDefinition->addMethodCall(
                'setType',
                [$blockPrefix, new Reference($this->getDefinitionName($blockPrefix))]
            );

            $extraFormOptions[$blockPrefix] = $configuration['extra_form_options'];
        }

        // Check extra_form_options
        foreach ($extraFormOptions as $blockPrefix => $options) {
            foreach ($options as $optionName => $optionValue) {
                if (!$container->hasDefinition($this->getDefinitionName($optionValue['extra_form_type']))) {
                    throw new WrongExtraFormTypeOptionException($blockPrefix, $optionName, sprintf('Undefined ExtraFormType "%s"', $optionValue['extra_form_type']));
                }
            }
        }
    }

    /**
     * Get definition name.
     *
     * @return string
     */
    protected function getDefinitionName($blockPrefix)
    {
        return sprintf('idci_extra_form.type.%s', $blockPrefix);
    }
}
