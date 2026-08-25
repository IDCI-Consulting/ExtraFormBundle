<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Form;

use IDCI\Bundle\ExtraFormBundle\Form\Type\TagsType;
use IDCI\Bundle\ExtraFormBundle\Model\ConfiguredType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ConfiguredTypeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('blockPrefix')
            ->add('description')
            ->add('tags', TagsType::class, [
                'required' => false,
                'url' => '/api/configured-extra-form-types-tags.json',
            ])
            ->add('configuration')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults([
                'data_class' => ConfiguredType::class,
            ])
        ;
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
        return 'idci_extraform_configured_type_type';
    }
}
