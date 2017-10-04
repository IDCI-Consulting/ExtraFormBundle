<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
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
                array('preSubmitData', 2),
                array('changeData', 1),
                array('buildCollection', 0),
            ),
            FormEvents::SUBMIT       => array(
                array('onSubmit', 50),
            ),
        );
    }

    /**
     * Disable constraints
     *
     * @param array $options
     */
    public static function disableConstraints(& $options)
    {
        if (!is_array($options)) {
            return;
        }

        foreach ($options as $key => $value) {
            if ('constraints' === $key) {
                $options[$key] = array();
            } elseif (is_array($value)) {
                self::disableConstraints($options[$key]);
            }
        }
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

            $options = $this->options['options'];
            $options['required'] = isset($options['required']) ?
                $options['required'] && $required :
                $required
            ;
            $options['attr'] = array_replace(
                isset($options['attr']) ? $options['attr'] : array(),
                array(
                    'data-collection-id' => $this->options['collection_id'],
                    'data-display'       => $displayed ? 'show' : 'hide',
                    'data-position'      => $i,
                )
            );

            if (!$displayed) {
                self::disableConstraints($options);
            }

            $form->add($i, $this->options['type'], $options);

            $form->get($i)->add('__to_remove', CheckboxType::class, array(
                'mapped'   => false,
                'required' => false,
                'data'     => !$displayed,
                'attr'     => array(
                    'class' => 'idci_collection_item_remove'
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
        $data = $event->getData();

        if (null === $data) {
            $data = array();
        }

        if ($data instanceof \Doctrine\Common\Collections\Collection) {
            $event->setData($data->getValues());
        } else {
            $event->setData(array_values($data));
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

        if ($data instanceof \Doctrine\Common\Collections\Collection) {
            $event->setData($data->getValues());
        } else {
            $event->setData(array_values($data));
        }
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

        if (FormEvents::PRE_SUBMIT === $event->getName()) {
            if (isset($item['__to_remove'])) {
                return !(bool)$item['__to_remove'];
            }
        }

        foreach ($item as $k => $v) {
            if (FormEvents::PRE_SUBMIT === $event->getName() &&
                'hidden' === $form->get($i)->get($k)->getConfig()->getType()->getName()
            ) {
                continue;
            }

            // Value not null
            if (null !== $v && '' !== $v) {
                return true;
            }
        }

        return false;
    }
}
