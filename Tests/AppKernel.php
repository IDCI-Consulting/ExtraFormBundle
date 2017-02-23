<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array();
        if (in_array($this->getEnvironment(), array('test'))) {
            $bundles[] = new Symfony\Bundle\FrameworkBundle\FrameworkBundle();
            $bundles[] = new Symfony\Bundle\TwigBundle\TwigBundle();
            $bundles[] = new IDCI\Bundle\ExtraFormBundle\IDCIExtraFormBundle();
            $bundles[] = new Gregwar\CaptchaBundle\GregwarCaptchaBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config.yml');
    }
}
