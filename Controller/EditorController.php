<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Editor controller.
 *
 * @Route("/extra-form")
 */
class EditorController extends Controller
{
    /**
     * Overview action.
     *
     * @Route("/overview", name="idci_extra_form_editor_overview")
     * @Method({"POST"})
     */
    public function overviewAction(
        Request $request,
        FormFactoryInterface $formFactory,
        ExtraFormBuilderInterface $extraFormBuilder
    ) {
        $formName = 'overview';
        $data = $request->request->get($formName);
        $configurationRaw = $data['configuration'];
        $configuration = json_decode($configurationRaw, true);

        $overviewBuilder = $formFactory
            ->createNamedBuilder($formName)
            ->setAction($this->generateUrl('idci_extra_form_editor_overview'))
            ->add('configuration', 'hidden', array(
                'data' => $configurationRaw,
            ))
        ;

        $form = $extraFormBuilder
            ->build($configuration, array(), array(), $overviewBuilder)
            ->add('submit', 'submit')
            ->getForm()
        ;

        // The form overview has been submitted
        if (count($data) > 1) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                return new Response('This form was well submitted');
            }
        }

        // Render the form with or without errors
        return $this->render('IDCIExtraFormBundle:Editor:overview.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}
