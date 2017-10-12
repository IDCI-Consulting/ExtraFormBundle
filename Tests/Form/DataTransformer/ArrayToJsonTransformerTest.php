<?php

namespace IDCI\Bundle\ExtraFormBundle\Tests\Form\DataTransformer;

use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\ArrayToJsonTransformer;

/**
 * @author:  Eddie BARRACO <eddie.barraco@idci-consulting.fr>
 * @license: MIT
 */
class ArrayToJsonTransformerTest extends \PHPUnit_Framework_TestCase
{
    private $json;
    private $array;

    /**
     * @var ArrayToJsonTransformer
     */
    private $arrayToJsonTransformer;

    /**
     * {@inheritdoc}
     */
    protected function setUp()
    {
        $this->json = <<<EOF
{
    "test": {
        "valueA": "test",
        "valueB": "test2"
    }
}
EOF;
        $this->array = array(
            'test' => array(
                'valueA' => 'test',
                'valueB' => 'test2',
            ),
        );

        $this->arrayToJsonTransformer = new ArrayToJsonTransformer();
    }

    public function testTransform()
    {
        $this->assertEquals($this->json, $this->arrayToJsonTransformer->transform($this->array));
    }

    public function testReverseTransform()
    {
        $this->assertEquals($this->array, $this->arrayToJsonTransformer->reverseTransform($this->json));
    }
}
