<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\AssetLoaderBundle\AssetProvider\AssetProviderInterface;
use IDCI\Bundle\AssetLoaderBundle\Model\Asset;
use IDCI\Bundle\AssetLoaderBundle\Model\AssetCollection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ExtraFormEditorType extends AbstractType implements AssetProviderInterface
{
    /**
     * @var AssetCollection
     */
    private $assetCollection;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->assetCollection = new AssetCollection();
    }

    /**
     * {@inheritDoc}
     */
    public function getAssetCollection()
    {
        return $this->assetCollection;
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $this->assetCollection->add(new Asset('IDCIExtraFormBundle:Form:form_editor_assets.html.twig'));
        $this->assetCollection->add(new Asset('IDCIExtraFormBundle:Form:form_editor_configuration.html.twig', array(
            'options' => $options,
            'form'    => $view
        )));

        $attrClass = 'extra-form-editor';

        if (isset($options['attr']) && isset($options['attr']['class'])) {
            $attrClass .= ' ' . $options['attr']['class'];
        }

        $view->vars['attr']['class']                        = $attrClass;
        $view->vars['attr']['data-available-modes']         = implode($options['available_modes'], '__');
        $view->vars['attr']['data-configuration-variable']  = $view->vars['id'] . '_configuration';
        $view->vars['allow_configured_types_edition']       = $options['allow_configured_types_edition'];
        $view->vars['show_configured_types']                = $options['show_configured_types'];
        $view->vars['configured_types_tags']                = $options['configured_types_tags'];

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
