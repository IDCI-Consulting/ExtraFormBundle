<?php

namespace IDCI\Bundle\ExtraFormBundle\Form\Type;

use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\UploadedFileToPathTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type as Type;
use Symfony\Component\Form\FormBuilderInterface;

class FileType extends AbstractType
{
    private $uploadedFileToPathTransformer;

    public function __construct(UploadedFileToPathTransformer $uploadedFileToPathTransformer)
    {
        $this->uploadedFileToPathTransformer = $uploadedFileToPathTransformer;
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->addModelTransformer($this->uploadedFileToPathTransformer);
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return Type\FileType::class;
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'extra_form_file';
    }
}
