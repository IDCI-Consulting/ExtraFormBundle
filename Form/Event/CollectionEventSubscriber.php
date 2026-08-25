<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Event;

use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class CollectionEventSubscriber implements EventSubscriberInterface
{
    /**
     * @var array
     */
    protected $options;

    /**
     * Constructor.
     */
    public function __construct(array $options)
    {
        $this->options = $options;
    }

    public static function getSubscribedEvents()
    {
        return [
            FormEvents::PRE_SET_DATA => [
                ['preSetData', 1],
                ['buildCollection', 0],
            ],
            FormEvents::PRE_SUBMIT => [
                ['preSubmitData', 2],
                ['changeData', 1],
                ['buildCollection', 0],
            ],
            FormEvents::SUBMIT => [
                ['onSubmit', 50],
            ],
        ];
    }

    /**
     * Disable constraints.
     *
     * @param array $options
     */
    public static function disableConstraints(&$options)
    {
        if (!is_array($options)) {
            return;
        }

        $options['validation_groups'] = false;
    }

    /**
     * Pre set data.
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
     */
    public function preSubmitData(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data || '' === $data) {
            $data = [];
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
     * @param string $eventName
     */
    public function buildCollection(FormEvent $event, $eventName)
    {
        $form = $event->getForm();

        for ($i = 0; $i < $this->options['max_items']; ++$i) {
            $required = $i < $this->options['min_items'] ? true : false;
            $displayed = $i < $this->options['min_items'] || $this->isDisplayable($event, $i, $eventName);

            $options = $this->options['options'];
            $options['required'] = isset($options['required']) ?
                $options['required'] && $required :
                $required
            ;
            $options['attr'] = array_replace(
                isset($options['attr']) ? $options['attr'] : [],
                [
                    'data-collection-id' => $this->options['collection_id'],
                    'data-display' => $displayed ? 'show' : 'hide',
                    'data-position' => $i,
                ]
            );

            if (!$displayed) {
                self::disableConstraints($options);
            }

            $form->add($i, $this->options['type'], $options);

            $form->get($i)->add('__to_remove', CheckboxType::class, [
                'mapped' => false,
                'required' => false,
                'data' => !$displayed,
                'attr' => [
                    'class' => 'idci_collection_item_remove',
                ],
            ]);
        }
    }

    /**
     * Change data.
     */
    public function changeData(FormEvent $event)
    {
        $data = $event->getData();

        if (null === $data) {
            $data = [];
        }

        if ($data instanceof \Doctrine\Common\Collections\Collection) {
            $event->setData($data->getValues());
        } else {
            $event->setData(array_values($data));
        }
    }

    /**
     * On submit.
     */
    public function onSubmit(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data) {
            $data = [];
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess)) {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        // The data mapper only adds, but does not remove items, so do this here
        $toDelete = [];

        foreach ($data as $name => $child) {
            if (null === $child || (
                $form->get($name)->has('__to_remove')
                && true === $form->get($name)->get('__to_remove')->getData()
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
            $event->setData($data);
        }
    }

    /**
     * Is displayable.
     *
     * @param int    $i
     * @param string $eventName
     *
     * @return bool
     */
    protected function isDisplayable(FormEvent $event, $i, $eventName)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (!isset($data[$i])) {
            return false;
        }

        $item = is_object($data[$i]) ? (array) $data[$i] : $data[$i];

        if (!is_array($item)) {
            return true;
        }

        if (FormEvents::PRE_SUBMIT === $eventName) {
            if (isset($item['__to_remove'])) {
                return !(bool) $item['__to_remove'];
            }
        }

        foreach ($item as $k => $v) {
            if (FormEvents::PRE_SUBMIT === $eventName
                && HiddenType::class === get_class($form->get($i)->get($k)->getConfig()->getType()->getInnerType())
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
