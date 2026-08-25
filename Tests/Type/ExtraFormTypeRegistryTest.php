<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Tests\Type;

use IDCI\Bundle\ExtraFormBundle\Exception\InvalidArgumentException;
use IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormType;
use IDCI\Bundle\ExtraFormBundle\Type\ExtraFormTypeRegistry;

class ExtraFormTypeRegistryTest extends \PHPUnit_Framework_TestCase
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
            'parent' => 'form',
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
     * Test setType.
     */
    public function testSetType()
    {
        $registry = new ExtraFormTypeRegistry();
        $this->assertEquals($registry->setType('html', $this->extraFormType), $registry);
        $this->assertArrayHasKey('html', $registry->getTypes());
    }

    /**
     * Test getTypes.
     */
    public function testGetTypes()
    {
        $registry = new ExtraFormTypeRegistry();
        $registry->setType('html', $this->extraFormType);
        $this->assertArrayHasKey('html', $registry->getTypes());
        $this->assertEquals(1, count($registry->getTypes()));
    }

    /**
     * Test getType.
     */
    public function testGetType()
    {
        $registry = new ExtraFormTypeRegistry();
        $registry->setType('html', $this->extraFormType);
        $this->assertNotEmpty($registry->getType('html'));

        $this->expectException(UnexpectedTypeException::class);
        $registry->getType([]);

        $this->expectException(InvalidArgumentException::class);
        $registry->getType('no_blank');
    }

    /**
     * Test hasType.
     */
    public function testHasType()
    {
        $registry = new ExtraFormTypeRegistry();
        $registry->setType('html', $this->extraFormType);
        $this->assertTrue($registry->hasType('html'));
        $this->assertFalse($registry->hasType('html_'));
    }
}
