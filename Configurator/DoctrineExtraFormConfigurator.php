<?php

/**
 * 
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 *
 */

namespace IDCI\Bundle\ExtraFormBundle\Configurator;


use Symfony\Component\OptionsResolver\OptionsResolver;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\Util\Inflector;
use IDCI\Bundle\ExtraFormBundle\Exception\BuildConfigurationException;


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
        parent::configureParameters($resolver);

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
    public function buildConfiguration(array $parameters = array())
    {
        $entity = $this
            ->entityManager
            ->getRepository($parameters['class'])
            ->findOneBy($parameters['criteria'])
        ;

        if (null === $entity) {
            throw new BuildConfigurationException(sprintf(
                'Wrong criteria: \'%s\'',
                json_encode($parameters['criteria'])
            ));
        }

        $getter = sprintf(
            'get%s',
            Inflector::classify($parameters['property'])
        );

        $rc = new \ReflectionClass($entity);
        if (!$rc->hasMethod($getter)) {
            throw new BuildConfigurationException(sprintf(
                'Undefined method \'%s\' in \'%s\' class',
                $getter,
                get_class($entity)
            ));
        }

        $rawConfiguration = call_user_func_array(
            array($entity, $getter),
            array()
        );

        return json_decode($rawConfiguration, true);
    }
}