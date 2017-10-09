<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Tests\Constraint;

use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraint;
use Symfony\Component\Validator\Constraints\NotBlank;

class ExtraFormConstraintTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var ExtraFormConstraint
     */
    private $extraFormConstraint;

    /**
     * {@inheritdoc}
     */
    protected function setUp()
    {
        $configuration = array(
            'class' => NotBlank::class,
            'description' => 'Not blank constraint',
            'extra_form_options' => array(
                'message' => array(
                    'extra_form_type' => 'text',
                    'options' => array(
                        'required' => false,
                    ),
                ),
            ),
        );

        $this->extraFormConstraint = new ExtraFormConstraint($configuration);
    }

    /**
     * Test getClassName.
     */
    public function testGetClassName()
    {
        $this->assertEquals(NotBlank::class, $this->extraFormConstraint->getClassName());
    }

    /**
     * Test getDescription.
     */
    public function testGetDescription()
    {
        $description = 'Not blank constraint';

        $this->assertEquals($description, $this->extraFormConstraint->getDescription());
    }

    /**
     * Test getExtraFormOptions.
     */
    public function testGetExtraFormOptions()
    {
        $options = array(
            'message' => array(
                'extra_form_type' => 'text',
                'options' => array(
                    'required' => false,
                ),
            ),
        );

        $this->assertEquals($options, $this->extraFormConstraint->getExtraFormOptions());
    }
}
