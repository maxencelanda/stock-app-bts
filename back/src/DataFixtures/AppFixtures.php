<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $category1 = new Category();
        $category1->setName("Traditionnelle");
        $manager->persist($category1);
        $this->addReference('category1', $category1);
        $product = new Product();
        $product->setName("Tarte au citron");
        $product->setPrice(18);
        $product->setQuantity(5);
        $product->setIdCategory($category1);
        $manager->persist($product);
        $manager->flush();
    }
}
