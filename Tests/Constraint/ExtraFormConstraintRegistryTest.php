<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Tests\Constraint;

use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraint;
use IDCI\Bundle\ExtraFormBundle\Tests\Constraint;
use IDCI\Bundle\ExtraFormBundle\Constraint\ExtraFormConstraintRegistry;

class ExtraFormConstraintRegistryTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var ExtraFormConstraint
     */
    private $extraFormConstraint;

    /**
     * {@inheritDoc}
     */
    protected function setUp()
    {
        $configuration = array(
            'class'              => '\Symfony\Component\Validator\Constraints\NotBlank',
            'description'        => 'Not blank constraint',
            'extra_form_options' => array(
                'message' => array(
                    'extra_form_type' => 'text',
                    'options' => array(
                        'required' => false
                    )
                )
            )
        );

        $this->extraFormConstraint = new ExtraFormConstraint($configuration);
    }

    /**
     * Test setConstraint
     */
    public function testSetConstraint()
    {
        $registry = new ExtraFormConstraintRegistry();
        $this->assertEquals($registry->setConstraint('not_blank', $this->extraFormConstraint), $registry);
        $this->assertArrayHasKey('not_blank', $registry->getConstraints());
    }

    /**
     * Test getConstraint
     */
    public function testGetConstraints()
    {
        $registry = new ExtraFormConstraintRegistry();
        $registry->setConstraint('not_blank', $this->extraFormConstraint);
        $this->assertArrayHasKey('not_blank', $registry->getConstraints());
        $this->assertEquals(1, count($registry->getConstraints()));
    }

    /**
     * Test getConstraint
     */
    public function testGetConstraint()
    {
        $registry = new ExtraFormConstraintRegistry();
        $registry->setConstraint('not_blank', $this->extraFormConstraint);
        $this->assertNotEmpty($registry->getConstraint('not_blank'));

        $this->expectException('IDCI\Bundle\ExtraFormBundle\Exception\UnexpectedTypeException');
        $registry->getConstraint(array());

        $this->expectException('IDCI\Bundle\ExtraFormBundle\Exception\InvalidArgumentException');
        $registry->getConstraint('no_blank');
    }

    /**
     * Test hasConstraint
     */
    public function testHasConstraint()
    {
        $registry = new ExtraFormConstraintRegistry();
        $registry->setConstraint('not_blank', $this->extraFormConstraint);
        $this->assertTrue($registry->hasConstraint('not_blank'));
        $this->assertFalse($registry->hasConstraint('no_blank'));
    }
}
