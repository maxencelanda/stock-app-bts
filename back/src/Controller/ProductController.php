<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'app_product')]
    public function getProducts(ProductRepository $productRepository, CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $productsJson = $serializer->serialize($products, 'json', ['groups' => ['product']]);
        return new JsonResponse($productsJson, Response::HTTP_OK, [], true);
    }

    #[Route('/productPage', name: 'app_p')]
    public function productPage(ProductRepository $productRepository): Response
    {
        $products = $productRepository->find(11);
        return $this->render('p/index.html.twig', [
            'categoryId' => $products->getIdCategory()->getId(),
            'categoryName' => $products->getIdCategory()->getName(),
        ]);
    }
}
