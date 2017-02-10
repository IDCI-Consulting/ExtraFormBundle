<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Type;


class ExtraFormType implements ExtraFormTypeInterface 
{
    /**
     * @var string
     */
    protected $formType;

    /**
     * @var ExtraFormType
     */
    protected $parent;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $icon;

    /**
     * @var boolean
     */
    protected $abstract;

    /**
     * @var array
     */
    protected $extraFormOptions;

    /**
     * @var array<ExtraFormConstraint>
     */
    protected $extraFormConstraints;

    /**
     * Constructor
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->formType             = $configuration['form_type'];
        $this->parent               = $configuration['parent'];
        $this->description          = $configuration['description'];
        $this->icon                 = $configuration['icon'];
        $this->abstract             = $configuration['abstract'];
        $this->extraFormOptions     = $configuration['extra_form_options'];
        $this->extraFormConstraints = $configuration['extra_form_constraints'];
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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritDoc}
     */
    public function getIcon()
    {
        return $this->icon;
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
        if (null === $this->getParent()) {
            return $this->extraFormOptions;
        }

        return array_merge_recursive(
            $this->getParent()->getExtraFormOptions(),
            $this->extraFormOptions
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormConstraints()
    {
        if (null === $this->getParent()) {
            return $this->extraFormConstraints;
        }

        return array_merge_recursive(
            $this->getParent()->getExtraFormConstraints(),
            $this->extraFormConstraints
        );
    }
}