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
                array('preSetData', 1),
                array('buildCollection', 0),
            ),
            FormEvents::PRE_SUBMIT   => array(
                array('preSubmitData', 1),
                array('buildCollection', 0),
                array('changeData', -1),
            ),
            FormEvents::SUBMIT       => array(
                array('onSubmit', 50),
            )
        );
    }

    /**
     * Pre set data.
     *
     * @param FormEvent $event
     */
    public function preSetData(FormEvent $event)
    {
        $form = $event->getForm();

        foreach ($form as $name => $child) {
            $form->remove($name);
        }
    }

    /**
     * Pre submit data.
     *
     * @param FormEvent $event
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
    }

    /**
     * Build collection.
     *
     * @param FormEvent $event
     */
    public function buildCollection(FormEvent $event)
    {
        $form = $event->getForm();

        for ($i = 0; $i < $this->options['max_items']; $i++) {
            $required  = $i < $this->options['min_items'] ? true : false;
            $displayed = $i < $this->options['min_items'] || $this->isDisplayable($event, $i);

            $form->add($i, $this->options['type'], array_replace_recursive(
                $this->options['options'],
                array(
                    'required' => $required,
                    'attr'     => array(
                        'data-collection-id' => $this->options['collection_id'],
                        'data-display'       => $displayed ? 'show' : 'hide',
                    ),
                )
            ));

            $form->get($i)->add('__to_remove', 'checkbox', array(
                'mapped'   => false,
                'required' => false,
                'data'     => !$displayed,
                'attr'     => array(
                    'class' => 'unchangeable_field idci_collection_item_remove'
                )
            ));
        }
    }

    /**
     * Change data.
     *
     * @param FormEvent $event
     */
    public function changeData(FormEvent $event)
    {
        if (is_array($event->getData())) {
            $event->setData(array_values($event->getData()));
        }
    }

    /**
     * On submit.
     *
     * @param FormEvent $event
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
            if (null === $child || (
                $form->get($name)->has('__to_remove') &&
                true === $form->get($name)->get('__to_remove')->getData()
            )) {
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

        $item = is_object($data[$i]) ? (array)$data[$i] : $data[$i];

        if (!is_array($item)) {
            return true;
        }

        foreach ($item as $k => $v) {
            if ('__to_remove' === $k) {
                continue;
            }

            if (FormEvents::PRE_SUBMIT === $event->getName()) {
                // Not an hidden field
                if ('hidden' === $form->get($i)->get($k)->getConfig()->getType()->getName()) {
                    continue;
                }
            }

            // Value not null
            if (null !== $v) {
                return true;
            }
        }

        return false;
    }
}
