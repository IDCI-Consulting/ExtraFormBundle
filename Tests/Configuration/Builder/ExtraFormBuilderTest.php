<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
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

    /**
     * {@inheritdoc}
     */
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
        return array(
            array('birthday', array('label' => 'birthday_label')),
            array('captcha'),
            array('checkbox'),
            array('choice'),
            array('country'),
            array('date'),
            array('datetime'),
            array('email'),
            array('extra_form_builder', array('configuration' => array())),
            array('extra_form_collection'),
            array(
                'extra_form_collection',
                array(
                    'type' => ExtraFormCollectionType::class,
                    'label' => 'collection_test',
                    'attr' => array('class' => 'test'),
                    'constraints' => array(array(
                        'extra_form_constraint' => 'not_blank',
                        'options' => array(
                            'message' => 'this value should not be blank',
                        ),
                    )),
                ),
            ),
            array('extra_form_json_textarea'),
            array('extra_form_range'),
            array('html'),
            array('iban'),
            array('integer'),
            array('money'),
            array('number'),
            array('password'),
            array('percent'),
            array('repeated'),
            array('text'),
            array(
                'text',
                array('label' => 'firstname'),
                array(array(
                    'extra_form_constraint' => 'length',
                    'options' => array(
                        'min' => '3',
                        'max' => '50',
                        'minMessage' => 'too short',
                        'maxMessage' => 'too long',
                    ),
                )),
            ),
            array('textarea'),
            array('time'),
            array('url'),
        );
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
    public function testBuild($type, $options = array(), $constraints = array())
    {
        $builder = $this->extraFormBuilder->build(array(
           sprintf('field_%s', $type) => array(
                'extra_form_type' => $type,
                'constraints' => $constraints,
                'options' => $options,
            ),
        ));

        $form = $builder->getForm();

        $this->assertTrue($form instanceof Form);
    }
}
