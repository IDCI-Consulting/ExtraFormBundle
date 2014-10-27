<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use IDCI\ExtraFormBundle\DependencyInjection\Compiler\TypeCompilerPass;
use IDCI\ExtraFormBundle\DependencyInjection\Compiler\ConstraintCompilerPass;
use IDCI\ExtraFormBundle\DependencyInjection\Compiler\ConfiguratorCompilerPass;

class IDCIExtraFormBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new TypeCompilerPass());
        $container->addCompilerPass(new ConstraintCompilerPass());
        $container->addCompilerPass(new ConfiguratorCompilerPass());
    }
}
