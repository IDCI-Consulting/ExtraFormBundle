<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use FOS\RestBundle\Request\ParamFetcher;
use IDCI\Bundle\ExtraFormBundle\Entity\ConfiguredType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\View\View;

/**
 * Api controller.
 */
class ApiController extends FOSRestController
{
    /**
     * [GET] /extra-form-types
     * Retrieve extra form types.
     *
     * @Get("/extra-form-types.{_format}")
     *
     * @param string $_format
     *
     * @return Response
     */
    public function getExtraFormTypesAction(Request $request, $_format)
    {
        $view = View::create()->setFormat($_format);

        if ('html' === $_format) {
            $form = $this->createForm('extra_form_type_choice');

            $view
                ->setData($form->createView())
                ->setTemplate("IDCIExtraFormBundle:Api:form.html.twig")
                ->setTemplateVar('form')
            ;
        } else {
            $types = $this->get('idci_extra_form.type_registry')->getTypes();
            ksort($types);
            $view->setData(array_values($types));
        }

        return $this->handleView($view);
    }

    /**
     * [GET] /extra-form-types/{type}/options.{_format}
     * Retrieve extra form type options.
     *
     * @Get("/extra-form-types/{type}/options.{_format}", requirements={"type" = "^[a-zA-Z0-9_-]+$"})
     *
     * @param string $type
     * @param string $_format
     *
     * @return Response
     */
    public function getExtraFormTypesOptionsAction(Request $request, $_format, $type)
    {
        $registry = $this->get('idci_extra_form.type_registry');
        if (!($registry->hasType($type))) {
            throw new NotFoundHttpException(sprintf(
                'The Type `%s` was not found',
                $type
            ));
        }

        $view = View::create()->setFormat($_format);
        $options = $registry->getType($type)->getExtraFormOptions();

        if ('html' === $_format) {
            $form = $this
                ->get('idci_extra_form.builder')
                ->build($options,
                    array(),
                    null,
                    $this->container->get('form.factory')->createNamedBuilder(
                        null,
                        'form',
                        null,
                        array('csrf_protection' => false)
                    )
                )
                ->getForm()
            ;

            $view
                ->setData($form->createView())
                ->setTemplate("IDCIExtraFormBundle:Api:form.html.twig")
                ->setTemplateVar('form')
            ;
        } else {
            $view->setData($options);
        }

        return $this->handleView($view);
    }

    /**
     * [GET] /extra-form-constraints
     * Retrieve extra form constraints.
     *
     * @Get("/extra-form-constraints.{_format}")
     *
     * @param string $_format
     *
     * @return Response
     */
    public function getExtraFormConstraintsAction(Request $request, $_format)
    {
        $view = View::create()->setFormat($_format);

        if ('html' === $_format) {
            $form = $this->createForm('extra_form_constraint_choice');

            $view
                ->setData($form->createView())
                ->setTemplate("IDCIExtraFormBundle:Api:form.html.twig")
                ->setTemplateVar('form')
            ;
        } else {
            $view->setData($this->get('idci_extra_form.constraint_registry')->getConstraints());
        }

        return $this->handleView($view);
    }


    /**
     * [GET] /extra-form-constraints/{constraint}/options
     * Retrieve extra form constraint options.
     *
     * @Get("/extra-form-constraints/{constraint}/options.{_format}", requirements={"constraint" = "^[a-zA-Z0-9_-]+$"})
     *
     * @param string $constraint
     * @param string $_format
     *
     * @return Response
     */
    public function getExtraFormConstraintsOptionsAction(Request $request, $_format, $constraint)
    {
        $registry = $this->get('idci_extra_form.constraint_registry');
        if (!($registry->hasConstraint($constraint))) {
            throw new NotFoundHttpException(sprintf(
                'The Constraint `%s` was not found',
                $constraint
            ));
        }

        $view = View::create()->setFormat($_format);
        $options = $registry->getConstraint($constraint)->getExtraFormOptions();

        if ('html' === $_format) {
            $form = $this
                ->get('idci_extra_form.builder')
                ->build(
                    $options,
                    array(),
                    null,
                    $this->container->get('form.factory')->createNamedBuilder(
                        null,
                        'form',
                        null,
                        array('csrf_protection' => false)
                    )
                )
                ->getForm()
            ;

            $view
                ->setData($form->createView())
                ->setTemplate("IDCIExtraFormBundle:Api:form.html.twig")
                ->setTemplateVar('form')
            ;
        } else {
            $view->setData($options);
        }

        return $this->handleView($view);
    }

    /**
     * [GET] /configured-extra-form-types
     * Retrieve extra form types.
     *
     * @Get("/configured-extra-form-types.{_format}")
     *
     * @param string $_format
     *
     * @return Response
     */
    public function getConfiguredExtraFormTypesAction($_format)
    {
        $view = View::create()->setFormat($_format);
        $types = $this->getDoctrine()->getManager()->getRepository('IDCIExtraFormBundle:ConfiguredType')->findAll();
        ksort($types);
        $view->setData($types);

        return $this->handleView($view);
    }

    /**
     * [POST] /configured-extra-form-types
     *
     * Save an extra form type.
     *
     * @RequestParam(
     *   name="name",
     *   description="The name of the configured type",
     *   allowBlank=false
     * ),
     * @RequestParam(
     *   name="configuration",
     *   description="The configured type configuration",
     *   allowBlank=false
     * ),
     *
     * @Post("/configured-extra-form-types")
     *
     * @return Response
     */
    public function postConfiguredExtraFormTypesAction(ParamFetcher $paramFetcher)
    {
        $em = $this->getDoctrine()->getManager();
        $existingConfiguredType = $em
            ->getRepository('IDCIExtraFormBundle:ConfiguredType')
            ->findOneByName($paramFetcher->get('name'))
        ;

        if (null !== $existingConfiguredType) {
            return new Response('A field with the name ' . $paramFetcher->get('name') . ' already exists', Response::HTTP_CONFLICT);
        }

        $configuredType = new ConfiguredType(
            $paramFetcher->get('name'),
            $paramFetcher->get('configuration')
        );

        $em->persist($configuredType);
        $em->flush();

        $view = View::create()->setFormat('json');
        $type = $this->getDoctrine()->getManager()->getRepository('IDCIExtraFormBundle:ConfiguredType')->findOneByName($paramFetcher->get('name'));
        $view->setData($type);
        $view->setStatusCode(Response::HTTP_CREATED);

        return $this->handleView($view);
    }

    /**
     * [PUT] /configured-extra-form-types/{name}
     *
     * Update an extra form type.
     *
     * @RequestParam(
     *   name="configuration",
     *   description="The configured type configuration",
     *   allowBlank=false
     * ),
     *
     * @Put("/configured-extra-form-types/{name}")
     *
     * @return Response
     */
    public function putConfiguredExtraFormTypesAction(ParamFetcher $paramFetcher, $name)
    {
        $em = $this->getDoctrine()->getManager();
        $configuredType = $em
            ->getRepository('IDCIExtraFormBundle:ConfiguredType')
            ->findOneByName($name)
        ;

        if (null === $configuredType) {
            return new Response('No configured type found with name ' . $name, Response::HTTP_NOT_FOUND);
        }

        $configuredType->setConfiguration($paramFetcher->get('configuration'));

        $em->persist($configuredType);
        $em->flush();

        $view = View::create()->setFormat('json');
        $type = $this->getDoctrine()->getManager()->getRepository('IDCIExtraFormBundle:ConfiguredType')->findOneByName($name);
        $view->setData($type);
        $view->setStatusCode(Response::HTTP_OK);

        return $this->handleView($view);
    }

    /**
     * [DELETE] /configured-extra-form-types/{name}
     *
     * Delete an extra form type.
     *
     * @Delete("/configured-extra-form-types/{name}")
     *
     * @return Response
     */
    public function deleteConfiguredExtraFormTypesAction(ParamFetcher $paramFetcher, $name)
    {
        $em = $this->getDoctrine()->getManager();
        $configuredType = $em
            ->getRepository('IDCIExtraFormBundle:ConfiguredType')
            ->findOneByName($name)
        ;

        if (null === $configuredType) {
            return new Response('No configured type found with name ' . $name, Response::HTTP_NOT_FOUND);
        }

        $em->remove($configuredType);
        $em->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}


