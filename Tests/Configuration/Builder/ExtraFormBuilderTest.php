<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Tests\Configuration\Builder;

use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
use IDCI\Bundle\ExtraFormBundle\Form\Type\ExtraFormCollectionType;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Form\Form;

class ExtraFormBuilderTest extends WebTestCase
{
    /**
     * @var ExtraFormBuilder
     */
    private $extraFormBuilder;

    public function setUp()
    {
        require_once __DIR__.'/../../AppKernel.php';
        $kernel = new \AppKernel('test', true);
        $kernel->boot();
        $container = $kernel->getContainer();

        $this->extraFormBuilder = $container->get(ExtraFormBuilderInterface::class);
    }

    /**
     * The types provider.
     *
     * @return array
     */
    public function typesProvider()
    {
        return [
            ['birthday', ['label' => 'birthday_label']],
            ['captcha'],
            ['checkbox'],
            ['choice'],
            ['country'],
            ['date'],
            ['datetime'],
            ['email'],
            ['extra_form_builder', ['configuration' => []]],
            ['extra_form_collection'],
            [
                'extra_form_collection',
                [
                    'type' => ExtraFormCollectionType::class,
                    'label' => 'collection_test',
                    'attr' => ['class' => 'test'],
                    'constraints' => [[
                        'extra_form_constraint' => 'not_blank',
                        'options' => [
                            'message' => 'this value should not be blank',
                        ],
                    ]],
                ],
            ],
            ['extra_form_json_textarea'],
            ['extra_form_range'],
            ['html'],
            ['iban'],
            ['integer'],
            ['money'],
            ['number'],
            ['password'],
            ['percent'],
            ['repeated'],
            ['text'],
            [
                'text',
                ['label' => 'firstname'],
                [[
                    'extra_form_constraint' => 'length',
                    'options' => [
                        'min' => '3',
                        'max' => '50',
                        'minMessage' => 'too short',
                        'maxMessage' => 'too long',
                    ],
                ]],
            ],
            ['textarea'],
            ['time'],
            ['url'],
        ];
    }

    /**
     * Test build.
     *
     * @dataProvider typesProvider
     *
     * @param string $type
     * @param array  $options
     * @param array  $constraints
     */
    public function testBuild($type, $options = [], $constraints = [])
    {
        $builder = $this->extraFormBuilder->build([
            sprintf('field_%s', $type) => [
                'extra_form_type' => $type,
                'constraints' => $constraints,
                'options' => $options,
            ],
        ]);

        $form = $builder->getForm();

        $this->assertTrue($form instanceof Form);
    }
}
