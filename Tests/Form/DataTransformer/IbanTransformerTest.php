<?php

namespace IDCI\Bundle\ExtraFormBundle\Tests\Form\DataTransformer;

use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\IbanTransformer;

/**
 * @author:  Eddie BARRACO <eddie.barraco@idci-consulting.fr>
 * @license: MIT
 */
class IbanTransformerTest extends \PHPUnit_Framework_TestCase
{
    private $iban;
    private $array;

    /**
     * @var IbanTransformer $ibanTransformer
     */
    private $ibanTransformer;

    /**
     * {@inheritDoc}
     */
    protected function setUp()
    {
        $this->iban = "GR1601101250000000012300695";
        $this->array = array(
            "c1" => 'GR16',
            "c2" => '0110',
            "c3" => '1250',
            "c4" => '0000',
            "c5" => '0001',
            "c6" => '2300',
            "c7" => '695',
            "c8" => ''
        );

        $this->ibanTransformer = new IbanTransformer();
    }

    public function testTransform()
    {
        $this->assertEquals($this->array, $this->ibanTransformer->transform($this->iban));
    }

    public function testReverseTransform()
    {
        $this->assertEquals($this->iban, $this->ibanTransformer->reverseTransform($this->array));
    }
}
