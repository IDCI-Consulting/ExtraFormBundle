<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use IDCI\Bundle\ExtraFormBundle\Configuration\Builder\ExtraFormBuilderInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Editor controller.
 *
 * @Route("/extra-form")
 */
class EditorController extends AbstractController
{
    /**
     * Overview action.
     *
     * @Route("/overview", name="idci_extra_form_editor_overview", methods={"POST"})
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
            ->add('configuration', HiddenType::class, array(
                'data' => $configurationRaw,
            ))
        ;

        $form = $extraFormBuilder
            ->build($configuration, array(), array(), $overviewBuilder)
            ->add('submit', SubmitType::class)
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
        return $this->render('@IDCIExtraForm/Editor/overview.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}
