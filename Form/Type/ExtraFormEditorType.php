<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExtraFormEditorType extends AbstractType
{
    /**
     * \Twig_Environment
     */
    private $twig;

    /**
     * EventDispatcherInterface
     */
    private $dispatcher;

    /**
     * Constructor
     *
     * @param \Twig_Environment $twig
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(\Twig_Environment $twig, EventDispatcherInterface $dispatcher)
    {
        $this->twig       = $twig;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Load the widget assets (css and js files) at the end of the body
     */
    private function loadWidgetAssets($id, $options)
    {
        $this->dispatcher->addListener('kernel.response', function($event) use ($id, $options) {
            $response = $event->getResponse();
            $content  = $response->getContent();
            $scripts = '';

            if (strripos($content, 'bundles/idciextraform/js/dist/editor.js') === false) {
                $scripts .= $this->twig->render('IDCIExtraFormBundle:Form:extra_form_editor_assets.html.twig');
            }

            $scripts .= $this->twig->render(
                'IDCIExtraFormBundle:Form:extra_form_editor_configuration.html.twig',
                array(
                    'id'                             => $id,
                    'allow_configured_types_edition' => $options['allow_configured_types_edition'],
                    'show_configured_types'          => $options['show_configured_types'],
                    'configured_types_tags'          => $options['configured_types_tags']
                )
            );

            $pos      = strripos($content, '</body>');
            $content  = substr($content, 0, $pos) . $scripts.substr($content, $pos);

            $response->setContent($content);

            $event->setResponse($response);
        });
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $this->loadWidgetAssets($view->vars['id'], $options);

        $attrClass = 'extra-form-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' ' . $options['attr']['class'];
        }

        $view->vars['attr']['class']                        = $attrClass;
        $view->vars['attr']['data-available-modes']         = implode($options['available_modes'], '__');
        $view->vars['attr']['data-configuration-variable']  = $view->vars['id'] . '_configuration';

        return $view->vars;
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
                'required'                       => false,
                'available_modes'                => array('advanced'),
                'allow_configured_types_edition' => false,
                'show_configured_types'          => false,
                'configured_types_tags'          => array()
            ))
            ->setAllowedTypes(array(
                'available_modes'                => array('array'),
                'configured_types_tags'          => array('array'),
                'allow_configured_types_edition' => array('boolean'),
                'show_configured_types'          => array('boolean')
            ))
            ->setNormalizer('allow_configured_types_edition', function (Options $options, $value) {
                if ($value && !$options['show_configured_types']) {
                    throw new \Exception(
                        'The option `allow_configured_types_edition` for the extra_form_editor form type' .
                        ' is set to true, therefore the option `show_configured_types` should not be set to false'
                    );
                }

                return $value;
            })
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
