<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Tests\Type;

use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormType;

class ExtraFormTypeTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var ExtraFormType
     */
    private $extraFormType;

    protected function setUp()
    {
        $configuration = [
            'block_prefix' => 'html',
            'description' => 'Html text field',
            'icon' => 'code',
            'parent' => null,
            'abstract' => false,
            'form_type' => 'extra_form_html',
            'extra_form_options' => [
                'content' => [
                    'extra_form_type' => 'textarea',
                    'options' => [
                        'required' => false,
                    ],
                ],
                'mapped' => [
                    'extra_form_type' => 'checkbox',
                    'options' => [
                        'required' => false,
                        'data' => false,
                    ],
                ],
            ],
        ];

        $this->extraFormType = new ExtraFormType($configuration);
    }

    /**
     * Test getBlockPrefix.
     */
    public function testGetBlockPrefix()
    {
        $blockPrefix = 'html';

        $this->assertEquals($blockPrefix, $this->extraFormType->getBlockPrefix());
    }

    /**
     * Test getFormType.
     */
    public function testGetFormType()
    {
        $formType = 'extra_form_html';

        $this->assertEquals($formType, $this->extraFormType->getFormType());
    }

    /**
     * Test getParent.
     */
    public function testGetParent()
    {
        $parent = null;

        $this->assertEquals($parent, $this->extraFormType->getParent());
    }

    /**
     * Test getDescription.
     */
    public function testGetDescription()
    {
        $description = 'Html text field';

        $this->assertEquals($description, $this->extraFormType->getDescription());
    }

    /**
     * Test getIcon.
     */
    public function testGetIcon()
    {
        $icon = 'code';

        $this->assertEquals($icon, $this->extraFormType->getIcon());
    }

    /**
     * Test isAbstract.
     */
    public function testIsAbstract()
    {
        $abstract = false;

        $this->assertEquals($abstract, $this->extraFormType->isAbstract());
    }

    /**
     * Test getExtraFormOptions.
     */
    public function testGetExtraFormOptions()
    {
        $options = [
            'content' => [
                'extra_form_type' => 'textarea',
                'options' => [
                    'required' => false,
                ],
            ],
            'mapped' => [
                'extra_form_type' => 'checkbox',
                'options' => [
                    'required' => false,
                    'data' => false,
                ],
            ],
        ];

        $this->assertEquals($options, $this->extraFormType->getExtraFormOptions());
    }
}
