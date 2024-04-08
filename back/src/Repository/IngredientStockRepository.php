<?php

namespace App\Repository;

use App\Entity\IngredientStock;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<IngredientStock>
 *
 * @method IngredientStock|null find($id, $lockMode = null, $lockVersion = null)
 * @method IngredientStock|null findOneBy(array $criteria, array $orderBy = null)
 * @method IngredientStock[]    findAll()
 * @method IngredientStock[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IngredientStockRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, IngredientStock::class);
    }

    //    /**
    //     * @return IngredientStock[] Returns an array of IngredientStock objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('i.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?IngredientStock
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
