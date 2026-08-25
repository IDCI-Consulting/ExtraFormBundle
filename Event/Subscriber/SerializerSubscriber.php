<?php

namespace IDCI\Bundle\ExtraFormBundle\Event\Subscriber;

use IDCI\Bundle\ExtraFormBundle\Model\ConfiguredType;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistryInterface;
use JMS\Serializer\EventDispatcher\Events;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;

/**
 * SerializerSubscriber.
 */
class SerializerSubscriber implements EventSubscriberInterface
{
    /**
     * @var ExtraFormTypeRegistryInterface
     */
    private $registry;

    /**
     * Constructor.
     */
    public function __construct(ExtraFormTypeRegistryInterface $registry)
    {
        $this->registry = $registry;
    }

    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => Events::PRE_SERIALIZE,
                'method' => 'onPreSerialize',
            ],
        ];
    }

    /**
     * Method called on pre serialize event.
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
