<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;

class CollectionEventSubscriber implements EventSubscriberInterface
{
    /**
     * @var array
     */
    protected $options;

    /**
     * Constructor
     *
     * @param array $options
     */
    public function __construct(array $options)
    {
        $this->options = $options;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SET_DATA => array(
                array('preSetData', 0),
            ),
            FormEvents::PRE_SUBMIT   => array(
                array('preSubmitData', 0),
                array('changeData', 100),
            ),
            FormEvents::SUBMIT       => array(
                array('onSubmit', 50),
            )
        );
    }

    /**
     * {@inheritdoc}
     */
    public function preSetData(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        foreach ($form as $name => $child) {
            $form->remove($name);
        }

        for ($i = 0; $i < $this->options['max_items']; $i++) {
            $required = $i < $this->options['min_items'] ? true : false;
            $display  = $i < $this->options['min_items'] || isset($data[$i]) ? 'show' : 'hide';

            $form->add($i, $this->options['type'], array_replace_recursive(
                array(
                    'required' => $required,
                    'attr'     => array(
                        'data-collection-id' => $this->options['collection_id'],
                        'data-display'       => $display,
                    ),
                ),
                $this->options['options']
            ));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function preSubmitData(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data || '' === $data) {
            $data = array();
        }

        foreach ($form as $name => $child) {
            if (!isset($data[$name])) {
                $form->remove($name);
            }
        }

        for ($i = 0; $i < $this->options['max_items']; $i++) {
            $required = $i < $this->options['min_items'] ? true : false;
            // isDisplayable is an hugly hack for collection with sub form using hidden field !
            $display  = $i < $this->options['min_items'] ||$this->isDisplayable($event, $i) ? 'show' : 'hide';

            $form->add($i, $this->options['type'], array_replace_recursive(
                array(
                    'required' => $required,
                    'attr'     => array('data-display' => $display),
                ),
                $this->options['options']
            ));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function changeData(FormEvent $event)
    {
        if (is_array($event->getData())) {
            $event->setData(array_values($event->getData()));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function onSubmit(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data) {
            $data = array();
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess)) {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        // The data mapper only adds, but does not remove items, so do this here
        $toDelete = array();

        foreach ($data as $name => $child) {
            if (!$form->has($name)) {
                $toDelete[] = $name;
            }
        }

        foreach ($toDelete as $name) {
            unset($data[$name]);
        }

        $event->setData($data);
    }

    /**
     * Is displayable
     *
     * @param FormEvent $event
     * @param integer   $i
     *
     * @return boolean
     */
    protected function isDisplayable(FormEvent $event, $i)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (!isset($data[$i])) {
            return false;
        }

        if (!is_array($data[$i])) {
            return true;
        }

        foreach ($data[$i] as $k => $v) {
            if ('hidden' !== $form->get($i)->get($k)->getConfig()->getType()->getName()) {
                return true;
            }
        }

        return false;
    }
}
