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
    protected $blockPrefix;

    /**
     * @var string
     */
    protected $formType;

    /**
     * @var ExtraFormTypeInterface
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
     * @var bool
     */
    protected $abstract;

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
        $this->blockPrefix = $configuration['block_prefix'];
        $this->formType = $configuration['form_type'];
        $this->parent = $configuration['parent'];
        $this->description = $configuration['description'];
        $this->icon = $configuration['icon'];
        $this->abstract = $configuration['abstract'];
        $this->extraFormOptions = $configuration['extra_form_options'];
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return $this->blockPrefix;
    }

    /**
     * {@inheritdoc}
     */
    public function getFormTypeName()
    {
        return $this->getBlockPrefix();
    }

    /**
     * {@inheritdoc}
     */
    public function getFormType()
    {
        return $this->formType;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return $this->parent;
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
    public function getIcon()
    {
        if (null === $this->icon && null !== $this->getParent()) {
            return $this->getParent()->getIcon();
        }

        return $this->icon;
    }

    /**
     * {@inheritdoc}
     */
    public function isAbstract()
    {
        return $this->abstract;
    }

    /**
     * {@inheritdoc}
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
}
