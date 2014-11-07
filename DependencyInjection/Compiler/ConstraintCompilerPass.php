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

class ConstraintCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('idci_extra_form.constraint') ||
            !$container->hasDefinition('idci_extra_form.constraint_handler')
        ) {
            return;
        }

        $handlerDefinition = $container->getDefinition('idci_extra_form.constraint_handler');

        $constraints = $container->getParameter('idci_extra_form.constraints');
        foreach ($constraints as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator('idci_extra_form.constraint');
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition(
                $this->getDefinitionName($name),
                $serviceDefinition
            );

            $handlerDefinition->addMethodCall(
                'setConstraint',
                array($name, new Reference($this->getDefinitionName($name)))
            );
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
        return sprintf('idci_extra_form.constraint.%s', $name);
    }
}
