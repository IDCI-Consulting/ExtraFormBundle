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
use IDCI\Bundle\ExtraFormBundle\Exception\UndefinedExtraFormTypeException;

class TypeCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.type') ||
            !$container->hasDefinition('idci_extra_form.type_handler')
        ) {
            return;
        }

        $handlerDefinition = $container->getDefinition('idci_extra_form.type_handler');

        $types = $container->getParameter('idci_extra_form.types');
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

            $serviceDefinition->isAbstract($configuration['abstract']);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition(
                $this->getDefinitionName($name),
                $serviceDefinition
            );
            
            $handlerDefinition->addMethodCall(
                'setType',
                array($name, new Reference($this->getDefinitionName($name)))
            );
        }
    }

    /**
     * Get definition name
     *
     * @return string $name
     */
    protected function getDefinitionName($name)
    {
        return sprintf('idci_extra_form.type.%s', $name);
    }
}
