<?php

namespace IDCI\Bundle\ExtraFormBundle\Event\Subscriber;

use IDCI\Bundle\ExtraFormBundle\Entity\ConfiguredType;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use JMS\Serializer\EventDispatcher\Events;

/**
 * SerializerSubscriber
 */
class SerializerSubscriber implements EventSubscriberInterface
{
    /**
     * @var ExtraFormTypeRegistryInterface
     */
     private $registry;

    /**
     * Constructor
     *
     * @param ExtraFormTypeRegistryInterface $registry
     */
    public function __construct(ExtraFormTypeRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            array(
                'event'     => Events::PRE_SERIALIZE,
                'method'    => 'onPreSerialize',
            ),
        );
    }

    /**
     * Method called on pre serialize event
     *
     * @param ObjectEvent $event
     */
    public function onPreSerialize(ObjectEvent $event)
    {
        $configuredType = $event->getObject();

        if ($configuredType instanceof ConfiguredType) {
            try {
                $configurationArray = json_decode($configuredType->getConfiguration(), true);
                $extraFormType = $this->registry->getType($configurationArray['form_type']);
                $configuredType->setExtraFormType($extraFormType);
            } catch (\Exception $e) {
                return;
            }
        }
    }
}