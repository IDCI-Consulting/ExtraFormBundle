<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TagsType extends AbstractType
{
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['separator'] = $options['separator'];
        $view->vars['jsTransformFunction'] = $options['jsTransformFunction'];

        if (isset($options['url'])) {
            $view->vars['url'] = $options['url'];
        }

        return $view->vars;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'separator' => ',',
                'jsTransformFunction' => 'function (tags) { return tags; };',
            ])
            ->setDefined('url')
            ->setAllowedTypes('separator', ['string'])
            ->setAllowedTypes('jsTransformFunction', ['string'])
            ->setAllowedTypes('url', ['string'])
        ;
    }

    /**
     * @deprecated
     */
    public function setDefaultOptions(OptionsResolver $resolver)
    {
        $this->configureOptions($resolver);
    }

    public function getParent()
    {
        return TextareaType::class;
    }

    public function getBlockPrefix()
    {
        return 'extra_form_tags';
    }
}
