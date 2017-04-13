<?php

namespace IDCI\Bundle\ExtraFormBundle\Tests\Form\DataTransformer;

use IDCI\Bundle\ExtraFormBundle\Form\DataTransformer\JsonToArrayTransformer;

/**
 * @author:  Eddie BARRACO <eddie.barraco@idci-consulting.fr>
 * @license: MIT
 */
class JsonToArrayTransformerTest extends \PHPUnit_Framework_TestCase
{
    private $json;
    private $array;

    /**
     * @var JsonToArrayTransformer $jsonToArrayTransformer
     */
    private $jsonToArrayTransformer;

    /**
     * {@inheritDoc}
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
            "test" => array(
                "valueA" => "test",
                "valueB" => "test2"
            )
        );

        $this->jsonToArrayTransformer = new JsonToArrayTransformer();
    }

    public function testTransform()
    {
        $this->assertEquals($this->json, $this->jsonToArrayTransformer->transform($this->array));
    }

    public function testReverseTransform()
    {
        $this->assertEquals($this->array, $this->jsonToArrayTransformer->reverseTransform($this->json));
    }
}
