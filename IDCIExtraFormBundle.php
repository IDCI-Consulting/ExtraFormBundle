<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle;

use IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler\ConfigurationFetcherCompilerPass;
use IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler\ConstraintCompilerPass;
use IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler\ExtraFormStepWorkerCompilerPass;
use IDCI\Bundle\ExtraFormBundle\DependencyInjection\Compiler\TypeCompilerPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class IDCIExtraFormBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new TypeCompilerPass());
        $container->addCompilerPass(new ConstraintCompilerPass());
        $container->addCompilerPass(new ConfigurationFetcherCompilerPass());
        $container->addCompilerPass(new ExtraFormStepWorkerCompilerPass());
    }
}
