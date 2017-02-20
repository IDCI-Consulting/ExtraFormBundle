<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use IDCI\Bundle\ExtraFormBundle\Builder\ConfigurationBuilder;

/**
 * Editor controller.
 *
 * @Route("/extra-form")
 */
class EditorController extends Controller
{
    /**
     * Overview action
     *
     * @Route("/overview", name="idci_extra_form_editor_overview")
     * @Method({"POST"})
     */
    public function overviewAction(Request $request)
    {
        $configuration = json_decode($request->request->get('configuration'), true);

        $builder = $this
            ->get('idci_extra_form.builder')
            ->build($configuration)
        ;

        $form = $builder->getForm();

        return $this->render('IDCIExtraFormBundle:Test:overview.html.twig', array(
            'form' => $form->createView()
        ));
    }
}
