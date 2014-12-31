<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use IDCI\Bundle\ExtraFormBundle\Builder\ConfigurationBuilder;

/**
 * Test controller.
 *
 * @Route("/extra-form")
 */
class TestController extends Controller
{
    /**
     * Test.
     *
     * @Route("/", name="idci_extra_form")
     * @Method("GET")
     * @Template()
     */
    public function indexAction(Request $request)
    {
    /*
        Single form using the builder service directly

        $form = $this
            ->get('idci_extra_form.builder')
            ->build(
                'identity_form', // configuration alias
                array(),         // configuration parameters
                $this->createFormBuilder(array(
                    'first_name' => 'John',
                    'last_name'  => 'DOE'
                ))
            )
            ->getForm();
        ;
    */

    /*
        Without form builder
        $form = $this
            ->get('idci_extra_form.builder')
            ->build('identity_form', array())
            ->getForm()
        ;
    */

    /*
        Without form builder and without declared configurator
        $form = $this
            ->get('idci_extra_form.builder')
            ->build(array(
                'first_name' => array(
                    'extra_form_type' => 'text',
                    'options' => array(
                        'label' => 'Prénom',
                    ),
                    'constraints' => array(),
                ),
                'last_name' => array(
                    'extra_form_type' => 'text',
                    'options' => array(
                        'label' => 'Nom',
                    ),
                    'constraints' => array(),
                )
            ))
            ->getForm();
        ;
    */

    /*
        Sub form using the builder service through a form type
    */
        $form = $this
            ->createFormBuilder(array(
                'sub_form' => array(
                    'first_name' => 'John',
                    'last_name'  => 'DOE'
                )
            ))
            ->add('sub_form', 'extra_form_builder', array(
                'configuration' => 'identity_form',
                'parameters'    => array(),
            ))
            ->getForm()
        ;

    /*
        $form = $this
            ->createFormBuilder(array(
                'sub_form' => array(
                    'first_name' => 'John',
                    'last_name'  => 'DOE'
                )
            ))
            ->add('sub_form', 'extra_form_builder', array(
                'configuration' => array(
                    'first_name' => array(
                        'extra_form_type' => 'text',
                        'options' => array(
                            'label' => 'Prénom',
                        ),
                        'constraints' => array(),
                    ),
                    'last_name' => array(
                        'extra_form_type' => 'text',
                        'options' => array(
                            'label' => 'Nom',
                        ),
                        'constraints' => array(),
                    )
                ),
                'parameters'    => array(),
            ))
            ->getForm()
        ;
    */

        return array('form' => $form->createView());
    }
}