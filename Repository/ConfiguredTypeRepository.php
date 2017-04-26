<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * ConfiguredTypeRepository
 */
class ConfiguredTypeRepository extends EntityRepository
{
    /**
     * Get all tags query builder
     *
     * @return QueryBuilder
     */
    public function getAllTags()
    {
        $qb = $this->createQueryBuilder('c');

        $qb
            ->select('c.tags')
            ->where($qb->expr()->isNotNull('c.tags'))
            ->distinct()
        ;

        $tagStrings = array_map('current', $qb->getQuery()->getScalarResult());
        $distinctTags = array();

        foreach($tagStrings as $tagString) {
            foreach (explode(',', $tagString) as $tag) {
                if (!in_array($tag, $distinctTags)) {
                    array_push($distinctTags, $tag);
                }
            }
        }

        return $distinctTags;
    }
}
