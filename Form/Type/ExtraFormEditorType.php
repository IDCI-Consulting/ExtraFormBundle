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
        $view->vars['attr']['v-model'] = 'output';
        $view->vars['attr']['v-if'] = $options['display_raw'] ? 'true' : 'false';
        $view->vars['disabled_editor'] = $options['disabled_editor'];

        return $view->vars;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver
            ->setDefaults(array(
                'required'        => false,
                'display_raw'     => false,
                'disabled_editor' => false,
                'attr'            => array(
                    'style' => 'display: block; width: 100%; height: 150px;'
                ),
            ))
            ->setAllowedTypes(array(
                'display_raw'     => array('bool'),
                'disabled_editor' => array('bool'),
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
