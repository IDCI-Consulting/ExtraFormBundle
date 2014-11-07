<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

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
        $builder = $this->createFormBuilder(array(
            'first_name' => 'John',
            'last_name'  => 'DOE'
        ));

        $this
            ->get('idci_extra_form.builder')
            ->build(
                $builder,
                'identity_form', // configurator alias
                array()          // configurator parameters
            )
        ;
        $form = $builder->getForm();
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
                'configurator_alias' => 'identity_form'
            ))
            ->getForm()
        ;

        return array('form' => $form->createView());
    }
}