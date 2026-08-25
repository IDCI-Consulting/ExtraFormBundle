<?php

/**
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 *
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Configuration\Fetcher;

use Doctrine\Common\Util\Inflector;
use Doctrine\ORM\EntityManager;
use IDCI\Bundle\ExtraFormBundle\Exception\FetchConfigurationException;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DoctrineConfigurationFetcher extends AbstractConfigurationFetcher
{
    protected $entityManager;

    /**
     * Constructor.
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    protected function setDefaultParameters(OptionsResolver $resolver)
    {
        parent::setDefaultParameters($resolver);

        $resolver
            ->setRequired(['class', 'criteria', 'property'])
            ->setAllowedTypes([
                'class' => 'string',
                'criteria' => 'array',
                'property' => 'string',
            ])
        ;
    }

    public function doFetch(array $parameters = [])
    {
        $entity = $this
            ->entityManager
            ->getRepository($parameters['class'])
            ->findOneBy($parameters['criteria'])
        ;

        if (null === $entity) {
            throw new FetchConfigurationException('doctrine', $parameters);
        }

        $getter = sprintf(
            'get%s',
            Inflector::classify($parameters['property'])
        );

        $rc = new \ReflectionClass($entity);
        if (!$rc->hasMethod($getter)) {
            throw new FetchConfigurationException('doctrine', $parameters, sprintf('Undefined method \'%s\' in \'%s\' class', $getter, get_class($entity)));
        }

        $rawConfiguration = call_user_func_array(
            [$entity, $getter],
            []
        );

        return json_decode($rawConfiguration, true);
    }
}
