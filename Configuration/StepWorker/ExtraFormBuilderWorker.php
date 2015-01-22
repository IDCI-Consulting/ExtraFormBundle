<?php

/**
 * @author:  Thomas Prelot <tprelot@gmail.com>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\StepWorker;

use IDCI\Bundle\StepBundle\Configuration\Worker\ConfigurationWorkerInterface;
use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;

class ExtraFormBuilderWorker implements ConfigurationWorkerInterface
{
    /**
     * The extra form builder.
     *
     * @var ExtraFormBuilderInterface
     */
    protected $extraFormBuilder;

    /**
     * Constructor.
     *
     * @param ExtraFormBuilderInterface $extraFormBuilder The extra form builder.
     */
    public function __construct(ExtraFormBuilderInterface $extraFormBuilder)
    {
        $this->extraFormBuilder = $extraFormBuilder;
    }

    /**
     * {@inheritdoc}
     */
    public function work(array $parameters = array())
    {
        return $this->extraFormBuilder->build($parameters);
    }
}