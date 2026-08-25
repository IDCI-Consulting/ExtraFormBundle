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

class RawEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            FormEvents::PRE_SET_DATA => ['preSetData', 1],
            FormEvents::SUBMIT => ['submit', 900],
        ];
    }

    public function preSetData(FormEvent $event)
    {
        $data = $event->getData();

        $event->setData(['raw' => $data]);
    }

    public function submit(FormEvent $event)
    {
        $data = $event->getData();
        $event->setData($data['raw']);
    }
}
