<?php

/**
 *
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

 namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SerializeEventSubscriber implements EventSubscriberInterface
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SET_DATA => array('preSetData', 10),
            FormEvents::SUBMIT => array('onSubmit', 40)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function preSetData(FormEvent $event)
    {
        $form = $event->getForm();
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
    public function onSubmit(FormEvent $event)
    {
        $event->setData(serialize($event->getData()));
    }
}
