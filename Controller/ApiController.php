<?php

namespace IDCI\Bundle\ExtraFormBundle\Controller;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Controller\Annotations as Annotations;

/**
 * Api controller.
 */
class ApiController extends FOSRestController
{
    /**
     * Retrieve extra form type option
     *
     * @Annotations\Post("/types/{type_alias}/options.{_format}", name="idci_extra_form_render_options_post", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\Put("/types/{type_alias}/options.{_format}", name="idci_extra_form_render_options_put", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\View()
     *
     * @return View
     */
    public function optionsAction($type_alias, $_format)
    {
        $typeRegistry = $this->get('idci_extra_form.type_registry');

        if (!($typeRegistry->hasType($type_alias))) {
            throw new NotFoundHttpException(sprintf(
                '%s is not found',
                $type_alias
            ));
        }

        $options = $typeRegistry
            ->getType($type_alias)
            ->getExtraFormOptions()
        ;

        $view = View::create();

        if ('html' === $_format) {
            $form = $this
                ->get('idci_extra_form.builder')
                ->build($options)
                ->getForm()
            ;

            $view
                ->setData(array('form' => $form->createView()))
                ->setStatusCode(200)
            ;

            return $this->handleView($view);
        }

        $view
            ->setData($options)
            ->setStatusCode(200)
        ;

        return $this->handleView($view);
    }

    /**
     * Retrieve extra form constraint options
     *
     * @Annotations\Post("/constraints/{constraintName}/options.{_format}", name="idci_extra_form_render_constraints_post", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\Put("/constraints/{constraintName}/options.{_format}", name="idci_extra_form_render_constraints_put", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\View
     *
     * @return View
     */
    public function constraintsAction($constraintName, $_format)
    {
        $constraintRegistry = $this->get('idci_extra_form.constraint_registry');

        if (!($constraintRegistry->hasConstraint($constraintName))) {
            throw new NotFoundHttpException(sprintf(
                '%s is not found',
                $constraintName
            ));
        }

        $constraint = $constraintRegistry->getConstraint($constraintName);
        $options = $constraint->getExtraFormOptions();

        $view = View::create();

        if ('html' === $_format) {
            $builder = $this
                ->get('idci_extra_form.builder')
                ->build($options)
            ;

            $form = $builder->getForm();

            $view
                ->setData(array('form' => $form->createView()))
                ->setStatusCode(200)
            ;

            return $this->handleView($view);
        }

        $view
            ->setData($options)
            ->setStatusCode(200)
        ;

        return $this->handleView($view);
    }
}
