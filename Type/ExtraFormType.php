<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\ExtraFormBundle\Type;


class ExtraFormType implements ExtraFormTypeInterface 
{
    protected $formType;
    protected $parent;
    protected $name;
    protected $description;
    protected $abstract;
    protected $extraFormOptions;
    protected $extraFormConstraints;

    /**
     * Constructor
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        die('ExtraFormType:__construct');
        var_dump($configuration);
    }

    /**
     * {@inheritDoc}
     */
    public function getFormType()
    {
        return $this->formType;
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return $this->name;
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
    public function isAbstract()
    {
        return $this->abstract;
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormOptions()
    {
        return $this->extraFormOptions;
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormConstraints()
    {
        return $this->extraFormConstraints;
    }
}