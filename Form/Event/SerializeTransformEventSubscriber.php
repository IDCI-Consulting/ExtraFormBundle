<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class SerializeTransformEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            FormEvents::PRE_SET_DATA => ['preSetData', 100],
            FormEvents::SUBMIT => ['submit', 100],
        ];
    }

    public function preSetData(FormEvent $event)
    {
        $data = $event->getData();

        if (empty($data)) {
            $data = [];
        } else {
            $data = unserialize($data);
        }

        $event->setData($data);
    }

    public function submit(FormEvent $event)
    {
        $event->setData(serialize($event->getData()));
    }
}
