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
     * @Route("/render", name="idci_extra_form")
     * @Method({"GET", "POST"})
     * @Template()
     */
    public function indexAction(Request $request)
    {
    /*
        Single form using the builder service directly
        $builder = $this
            ->get('idci_extra_form.builder')
            ->build(
                'identity_form', // configuration fetcher alias
                array(),         // configuration fetcher parameters
                array(
                    'first_name' => 'Johnny',
                    'last_name'  => 'DOE'
                )
            )
        ;
    */

    /*
        Without form builder
        $builder = $this
            ->get('idci_extra_form.builder')
            ->build('identity_form', array())
        ;
    */

    /*
        Without form builder and configuration fetcher
        $builder = $this
            ->get('idci_extra_form.builder')
            ->build(array(
                'first_name' => array(
                    'extra_form_type' => 'text',
                    'options' => array(
                        'label' => 'Prénom'
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
        ;
    */

    /*
        Sub form using the builder service through a form type
        $builder = $this
            ->createFormBuilder()
            ->add('sub_form', 'extra_form_builder', array(
                'configuration' => 'identity_form',
                'parameters'    => array(),
                'data'          => array(
                    'first_name' => 'Johnny',
                    'last_name'  => 'DOE'
                )
            ))
        ;
    */

    /*
    */
        $builder = $this
            ->createFormBuilder(array(
                'message'  => 'message test',
                'sub_form' => '{"first_name":"test"}'
            ))
            ->add('message', 'text')
            ->add('sub_form', 'extra_form_builder', array(
                'transform_method' => 'jsonize',
                'configuration' => array(
                    'first_name' => array(
                        'extra_form_type' => 'text',
                        'options' => array(
                            'label' => 'Prénom',
                        ),
                        'constraints' => array(
                            array(
                                'extra_form_constraint' => 'not_blank',
                                'options' => array(
                                    'message' => 'Pas vide on a dit !'
                                )
                            )
                        ),
                    ),
                    'last_name' => array(
                        'extra_form_type' => 'text',
                        'options' => array(
                            'label' => 'Nom',
                        ),
                        'constraints' => array(),
                    ),
                    'purchase' => array(
                        'extra_form_type' => 'extra_form_builder',
                        'options' => array(
                            'configuration' => array(
                                'date' => array(
                                    'extra_form_type' => 'datetime',
                                    'options' => array(
                                        'label' => 'Date d\'achat',
                                    ),
                                    'constraints' => array(),
                                ),
                            )
                        ),
                        'constraints' => array(),
                    )
                ),
                'parameters'    => array()
            ))
        ;

        $form = $builder
            ->add('send', 'submit')
            ->setMethod('POST')
            ->getForm()
        ;

        $form->handleRequest($request);

        if ($form->isValid()) {
            var_dump($form->getData()); die;
        }

        return array('form' => $form->createView());
    }

    /**
     * Test Editor.
     *
     * @Route("/editor", name="idci_extra_form_editor")
     * @Method({"GET", "POST"})
     */
    public function editorAction(Request $request)
    {
        $form = $this
            ->createFormBuilder()
            ->add('editor', 'extra_form_editor', array(
                'available_modes' => array('advanced', 'simple')
            ))
            ->add('send', 'submit')
            ->getForm()
        ;

        $form->handleRequest($request);

        if ($form->isValid()) {
            var_dump($form->getData()); die;
        }

        return $this->render('IDCIExtraFormBundle:Test:editor.html.twig', array(
            'form' => $form->createView()
        ));
    }
}
