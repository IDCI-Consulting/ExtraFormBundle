<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;

use Doctrine\ORM\EntityManager;
use Doctrine\Common\Util\Inflector;

class DoctrineExtraFormConfigurator extends AbstractExtraFormConfigurator
{
    protected $entityManager;

    /**
     * Constructor
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Configure parameters
     *
     * @param  OptionsResolver $resolver
     */
    protected function configureParameters(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('class', 'criteria', 'property'))
            ->setAllowedTypes(array(
                'class'    => 'string',
                'criteria' => 'array',
                'property' => 'string',
            ))
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function doMakeConfiguration(array $parameters = array())
    {
        $entity = $this
            ->entityManager
            ->getRepository($parameters['class'])
            ->findBy($criteria)
        ;

        $getter = Inflector::camelize($parameters['property']);
        $rawConfiguration = call_user_func_array(array($entity, $getter), array());
        var_dump($rawConfiguration); die('Doctrine raw configuration');

        return json_decode($rawConfiguration, true);
    }
}