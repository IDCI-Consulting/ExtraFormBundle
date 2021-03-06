<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;

class ExtraFormConstraint implements ExtraFormConstraintInterface
{
    /**
     * @var string
     */
    protected $className;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var array
     */
    protected $extraFormOptions;

    /**
     * Constructor.
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->className = $configuration['class'];
        $this->description = $configuration['description'];
        $this->extraFormOptions = $configuration['extra_form_options'];
    }

    /**
     * {@inheritdoc}
     */
    public function getClassName()
    {
        return $this->className;
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritdoc}
     */
    public function getExtraFormOptions()
    {
        return $this->extraFormOptions;
    }
}
