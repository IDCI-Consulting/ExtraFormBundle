<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class HtmlType extends AbstractType
{
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $content = $options['content'];
        if ($form->getData()) {
            $content = $form->getData();
        }

        $view->vars['content'] = $content;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'content' => null,
            'mapped' => false,
        ]);
    }

    /**
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $this->configureOptions($resolver);
    }

    public function getBlockPrefix()
    {
        return 'extra_form_html';
    }
}
