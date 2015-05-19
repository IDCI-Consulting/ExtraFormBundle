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
            FormEvents::PRE_SET_DATA => array('preSetData'),
            FormEvents::PRE_SUBMIT => array('preSubmit'),
            FormEvents::PRE_SUBMIT => array('changeData', 9999)
        );
    }

    /**
     * Build the collection.
     *
     * @param FormInterface $form The form.
     * @param array $data         The form data.
     */
    private function buildCollection(FormInterface $form, array $data = array())
    {
        for ($i = 0; $i < $this->options['max_items']; $i++) {
            $display  = $i < $this->options['min_items'] || isset($data[$i]) ? 'show' : 'hide';
            $required = $i < $this->options['min_items'] ? true : false;

            $form->add($i, $this->options['type'], array_replace_recursive(
                $this->options['options'],
                array(
                    'label'       => ' ',
                    'data'        => isset($data[$i]) ? $data[$i] : null,
                    'required'    => $required,
                    'attr'        => array('data-display' => $display),
                )
            ));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function preSetData(FormEvent $event)
    {
        $this->buildCollection($event->getForm(), $event->getData());
    }

    /**
     * {@inheritdoc}
     */
    public function preSubmit(FormEvent $event)
    {
        $this->buildCollection($event->getForm(), $event->getData());
    }

    /**
     * {@inheritdoc}
     */
    public function changeData(FormEvent $event)
    {
        $event->setData(array_values($event->getData()));
    }
}
