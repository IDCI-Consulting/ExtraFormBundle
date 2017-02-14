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
     * @param $name
     * @param $configuration
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
    public function getDescription()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        return $this->extraFormType->getDescription();
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
    public function getExtraFormOptions()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        $configurationArray = json_decode($this->configuration, true);

        return $configurationArray['options'];
    }

    /**
     * {@inheritDoc}
     */
    public function getExtraFormConstraints()
    {
        if (null === $this->extraFormType) {
            return null;
        }

        $configurationArray = json_decode($this->configuration, true);

        return $configurationArray['constraints'];
    }
}
