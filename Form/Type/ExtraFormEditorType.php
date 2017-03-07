<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExtraFormEditorType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $attrClass = 'extra-form-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' ' . $options['attr']['class'];
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
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
                'required'                      => false,
                'available_modes'               => array('advanced'),
                'allow_configured_type_edition' => false,
            ))
            ->setAllowedTypes(array(
                'available_modes' => array('array')
            ))
        ;
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $this->configureOptions($resolver);
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
    public function getBlockPrefix()
    {
        return 'extra_form_editor';
    }

    /**
     * {@inheritdoc}
     *
     * @deprecated
     */
    public function getName()
    {
        return $this->getBlockPrefix();
    }
}
