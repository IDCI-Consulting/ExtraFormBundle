<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Constraint;


class ExtraFormConstraint implements ExtraFormConstraintInterface 
{
    protected $className;
    protected $description;
    protected $extraFormOptions;

    /**
     * Constructor
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->className        = $configuration['class'];
        $this->description      = $configuration['description'];
        $this->extraFormOptions = $configuration['extra_form_options'];
    }

    /**
     * {@inheritDoc}
     */
    public function getClassName()
    {
        return $this->className;
    }

    /**
     * {@inheritDoc}
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormOptions()
    {
        return $this->extraFormOptions;
    }
}