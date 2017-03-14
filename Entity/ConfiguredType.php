<?php

namespace IDCI\Bundle\ExtraFormBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="configured_type")
 */
class ConfiguredType implements ExtraFormTypeInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", unique=true)
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $description;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    protected $tags;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    protected $configuration;


    /**
     *  @var ExtraFormTypeInterface
     */
    protected $extraFormType;

    /**
     * Constructor
     *
     * @param string $name
     * @param string $configuration
     */
    public function __construct($name = null, $configuration = null)
    {
        $this->name          = $name;
        $this->configuration = $configuration;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return ConfiguredType
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return ConfiguredType
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * {@inheritDoc}
     */
    public function getDescription()
    {
        if (null !== $this->description) {
            return $this->description;
        }

        if (null !== $this->extraFormType) {
            return $this->extraFormType->getDescription();
        }

        return null;
    }

    /**
     * Set tags
     *
     * @param string $tags
     *
     * @return ConfiguredType
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags
     *
     * @return string
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set configuration
     *
     * @param string $configuration
     *
     * @return ConfiguredType
     */
    public function setConfiguration($configuration)
    {
        $this->configuration = $configuration;

        return $this;
    }

    /**
     * Get configuration
     *
     * @return string
     */
    public function getConfiguration()
    {
        return $this->configuration;
    }

    /**
     * Set extraFormType
     *
     * @param ExtraFormTypeInterface $extraFormType
     *
     * @return ConfiguredType
     */
    public function setExtraFormType(ExtraFormTypeInterface $extraFormType)
    {
        $this->extraFormType = $extraFormType;

        return $this;
    }

    /**
     * Get extraFormType
     *
     * @return ExtraFormTypeInterface
     */
    public function getExtraFormType()
    {
        return $this->extraFormType;
    }

    /**
     * {@inheritDoc}
     */
    public function getFormType()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->getFormType();
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->getParent();
    }

    /**
     * {@inheritDoc}
     */
    public function getIcon()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->getIcon();
    }

    /**
     * {@inheritDoc}
     */
    public function isAbstract()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->isAbstract();
    }

    /**
     * {@inheritDoc}
     */
    public function getFormTypeName()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->getName();
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormOptions()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        $configurationArray = json_decode($this->configuration, true);
        $options = $this->extraFormType->getExtraFormOptions();

        foreach ($configurationArray['extra_form_options'] as $optionName => $optionValue) {
            if ($optionName === 'configuration') {
                $options[$optionName]['options']['data'] = json_encode($optionValue);
            } else {
                $options[$optionName]['options']['data'] = $optionValue;
            }
        }

        return $options;
    }

    /**
     * Get extra form constraints
     */
    public function getExtraFormConstraints()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        $configurationArray = json_decode($this->configuration, true);

        return $configurationArray['extra_form_constraints'];
    }
}
