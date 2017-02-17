<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\OptionsResolver\Options;

class ExtraFormEditorType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $attrClass = 'extra-form-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' '.$options['attr']['class'];
        }

        $view->vars['attr']['class']                        = $attrClass;
        $view->vars['attr']['data-available-modes']         = implode($options['available_modes'], '__');
        $view->vars['attr']['data-configuration-variable']  = $view->vars['id'] . '_configuration';
        $view->vars['allow_configured_type_edition']        = $options['allow_configured_type_edition'];

        return $view->vars;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'required'                      => false,
                'available_modes'               => array('simple', 'advanced'),
                'allow_configured_type_edition' => false,
            ))
            ->setAllowedTypes(array(
                'available_modes' => array('array')
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'textarea';
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'extra_form_editor';
    }
}
