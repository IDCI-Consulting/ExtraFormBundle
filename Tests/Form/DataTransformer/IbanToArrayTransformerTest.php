<?php

namespace IDCI\Bundle\ExtraFormBundle\Tests\Form\DataTransformer;

use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\IbanToArrayTransformer;

/**
 * @author:  Eddie BARRACO <eddie.barraco@idci-consulting.fr>
 * @license: MIT
 */
class IbanToArrayTransformerTest extends \PHPUnit_Framework_TestCase
{
    private $iban;
    private $array;

    /**
     * @var IbanToArrayTransformer
     */
    private $ibanToArrayTransformer;

    /**
     * {@inheritdoc}
     */
    protected function setUp()
    {
        $this->iban = 'GR1601101250000000012300695';
        $this->array = array(
            'c1' => 'GR16',
            'c2' => '0110',
            'c3' => '1250',
            'c4' => '0000',
            'c5' => '0001',
            'c6' => '2300',
            'c7' => '695',
            'c8' => '',
        );

        $this->ibanToArrayTransformer = new IbanToArrayTransformer();
    }

    public function testTransform()
    {
        $this->assertEquals($this->array, $this->ibanToArrayTransformer->transform($this->iban));
    }

    public function testReverseTransform()
    {
        $this->assertEquals($this->iban, $this->ibanToArrayTransformer->reverseTransform($this->array));
    }
}
