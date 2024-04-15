<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/product', name: 'app_product')]
    public function getProducts(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $productsJson = $serializer->serialize($products, 'json', ['groups' => ['product']]);
        return new JsonResponse($productsJson, Response::HTTP_OK, [], true);
    }
}
