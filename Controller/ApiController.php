<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Route;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\View\View;
use IDCI\Bundle\ExtraFormBundle\Form\Type\ExtraFormTypeChoiceType;

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

            $newTypes = array();

            foreach ($types as $key => $type) {
                $newTypes[] = $type;
            }

            $view->setData($newTypes);
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

            $newOptions = array();

            foreach ($options as $key => $option) {
                $newOption = array('name' => $key);
                $newOptions[] = array_merge($newOption, $option);
            }

            $view->setData($newOptions);
        }

        return $this->handleView($view);
    }

    /**
     * [GET] /extra-form-constraints
     * Retrieve extra form constraints.
     *
     * @Get("/extra-form-constraints.{_format}")
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
     * @Get("/extra-form-constraints/{constraint}/options", requirements={"constraint" = "^[a-zA-Z0-9_-]+$"})
     *
     * @param string $constraint
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
}
