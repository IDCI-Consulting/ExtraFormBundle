<?php

/**
 * @author:  Baptiste BOUCHEREAU <baptiste.bouchereau@idci-consulting.fr>
 * @license: MIT
 */

namespace IDCI\Bundle\ExtraFormBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * ConfiguredTypeRepository.
 */
class ConfiguredTypeRepository extends EntityRepository
{
    /**
     * Find configured types by tags.
     *
     * @return array
     */
    public function findByTags(array $tags)
    {
        $qb = $this->createQueryBuilder('c');

        foreach ($tags as $key => $tag) {
            $operator = substr($tag, 0, 1);

            if ($operator === '+' || $operator === '-') {
                $tag = substr($tag, 1);
            }

            $literalExpr = $qb->expr()->literal('%'.$tag.'%');

            if ($operator === '-') {
                $qb->andWhere($qb->expr()->notLike('c.tags', $literalExpr));
            } elseif ($operator === '+') {
                $qb->andWhere($qb->expr()->like('c.tags', $literalExpr));
            } elseif ($key === 0) {
                $qb->where($qb->expr()->like('c.tags', $literalExpr));
            } else {
                $qb->orWhere($qb->expr()->like('c.tags', $literalExpr));
            }
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * Get all tags.
     *
     * @return array
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

        foreach ($tagStrings as $tagString) {
            foreach (explode(',', $tagString) as $tag) {
                if (!in_array($tag, $distinctTags)) {
                    array_push($distinctTags, $tag);
                }
            }
        }

        return $distinctTags;
    }
}
