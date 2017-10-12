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
     * Retrieve extra form type option.
     *
     * @Annotations\Post("/types/{typeName}/options", name="idci_extra_form_render_options_post", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\Put("/types/{typeName}/options", name="idci_extra_form_render_options_put", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\View()
     *
     * @return View
     */
    public function optionsAction($typeName, $_format)
    {
        $typeRegistry = $this->get('idci_extra_form.type_registry');

        if (!($typeRegistry->hasType($typeName))) {
            throw new NotFoundHttpException(sprintf(
                '%s is not found',
                $typeName
            ));
        }

        $type = $typeRegistry->getType($typeName);
        $options = $type->getExtraFormOptions();

        $view = View::create();

        if ($_format === 'html') {
            $builder = $this
                ->get('idci_extra_form.builder')
                ->build($options);
            $form = $builder->getForm();

            $view->setData(array('form' => $form->createView()))->setStatusCode(200);

            return $view;
        }

        $view->setData($options)->setStatusCode(200);

        return $view;
    }

    /**
     * Retrieve extra form constraint options.
     *
     * @Annotations\Post("/constraints/{constraintName}/options", name="idci_extra_form_render_constraints_post", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
     * @Annotations\Put("/constraints/{constraintName}/options", name="idci_extra_form_render_constraints_put", requirements={"_format" = "json|xml|html"}, defaults={"_format" = "json"})
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

        if ($_format === 'html') {
            $builder = $this
                ->get('idci_extra_form.builder')
                ->build($options);
            $form = $builder->getForm();

            $view->setData(array('form' => $form->createView()))->setStatusCode(200);

            return $view;
        }

        $view->setData($options)->setStatusCode(200);

        return $view;
    }
}
