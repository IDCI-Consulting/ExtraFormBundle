<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler;

use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintInterface;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistryInterface;
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
        if (!$container->findDefinition(ExtraFormConstraintInterface::class) ||
            !$container->findDefinition(ExtraFormConstraintRegistryInterface::class)
        ) {
            return;
        }

        $registryDefinition = $container->findDefinition(ExtraFormConstraintRegistryInterface::class);

        $constraints = $container->getParameter('idci_extra_form.constraints');
        foreach ($constraints as $name => $configuration) {
            $serviceDefinition = new DefinitionDecorator(ExtraFormConstraintInterface::class);
            $serviceDefinition->replaceArgument(0, $configuration);

            $container->setDefinition(
                $this->getDefinitionName($name),
                $serviceDefinition
            );

            $registryDefinition->addMethodCall(
                'setConstraint',
                array($name, new Reference($this->getDefinitionName($name)))
            );
        }
    }

    /**
     * Get definition name.
     *
     * @param string $name
     *
     * @return string
     */
    protected function getDefinitionName($name)
    {
        return sprintf('idci_extra_form.constraint.%s', $name);
    }
}
