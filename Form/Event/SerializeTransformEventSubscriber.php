<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SerializeTransformEventSubscriber implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SET_DATA => array('preSetData', 100),
            FormEvents::SUBMIT => array('submit', 100),
        );
    }

    /**
     * {@inheritdoc}
     */
    public function preSetData(FormEvent $event)
    {
        $data = $event->getData();

        if (empty($data)) {
            $data = array();
        } else {
            $data = unserialize($data);
        }

        $event->setData($data);
    }

    /**
     * {@inheritdoc}
     */
    public function submit(FormEvent $event)
    {
        $event->setData(serialize($event->getData()));
    }
}
