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
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/product')]
    public function getProducts(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $productsJson = $serializer->serialize($products, 'json', ['groups' => ['product']]);
        return new JsonResponse($productsJson, Response::HTTP_OK, [], true);
    }

    #[Route('/product/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function getProduct(Product $product)
    {
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['product']]);
    }
}
