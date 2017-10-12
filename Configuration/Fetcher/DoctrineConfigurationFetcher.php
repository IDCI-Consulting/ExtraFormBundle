<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Builder;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\Util\Inflector;
use IDCI\Bundle\ExtraFormBundle\Exception\FetchConfigurationException;

class DoctrineConfigurationFetcher extends AbstractConfigurationFetcher
{
    protected $entityManager;

    /**
     * Constructor.
     *
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    protected function setDefaultParameters(OptionsResolverInterface $resolver)
    {
        parent::configureParameters($resolver);

        $resolver
            ->setRequired(array('class', 'criteria', 'property'))
            ->setAllowedTypes(array(
                'class' => 'string',
                'criteria' => 'array',
                'property' => 'string',
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doFetch(array $parameters = array())
    {
        $entity = $this
            ->entityManager
            ->getRepository($parameters['class'])
            ->findOneBy($parameters['criteria'])
        ;

        if (null === $entity) {
            throw new FetchConfigurationException(
                'doctrine',
                $parameters
            );
        }

        $getter = sprintf(
            'get%s',
            Inflector::classify($parameters['property'])
        );

        $rc = new \ReflectionClass($entity);
        if (!$rc->hasMethod($getter)) {
            throw new FetchConfigurationException(
                'doctrine',
                $parameters,
                sprintf('Undefined method \'%s\' in \'%s\' class',
                    $getter,
                    get_class($entity)
                )
            );
        }

        $rawConfiguration = call_user_func_array(
            array($entity, $getter),
            array()
        );

        return json_decode($rawConfiguration, true);
    }
}
