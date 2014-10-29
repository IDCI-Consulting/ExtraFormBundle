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
        $generated = $this
            ->get('idci_extra_form.generator')
            ->generate('doctrine', array(
                'class'    => 'TmsOperationBundle:ParticipationStep',
                'criteria' => array('id' => 2),
                'property' => 'content_parameters'
            ))
        ;
        */

        $generated = $this
            ->get('idci_extra_form.generator')
            ->generate('my_first_form', array())
        ;

        var_dump($generated);die;
    }
}