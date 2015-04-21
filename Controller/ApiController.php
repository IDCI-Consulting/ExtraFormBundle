<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Api controller.
 */
class ApiController extends Controller
{
    /**
     * Retrieve extra form type option
     *
     * @Route("{typeName}/options.{_format}", name="idci_extra_form_render_options", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Method({"POST", "PUT"})
     * @Template()
     */
    public function optionsAction(Request $request, $_format, $typeName)
    {
        $type = $this->get('idci_extra_form.type_registry')->getType($typeName);
        $options = $type->getExtraFormOptions();

        $response = new Response();
        if ($_format === 'json') {
            $response->setContent(json_encode($options));
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        }

        if ($_format === 'html') {
            $builder = $this
                ->get('idci_extra_form.builder')
                ->build($options)
            ;

            $form = $builder
                ->getForm()
            ;

            return array('form' => $form->createView());
        }
    }
}