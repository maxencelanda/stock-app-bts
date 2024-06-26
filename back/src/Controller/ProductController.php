<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\CompositionRepository;
use App\Repository\IngredientRepository;
use App\Repository\IngredientStockRepository;
use App\Repository\ProductRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    #[Route('/product', methods:["GET"])]
    public function getProducts(ProductRepository $productRepository, SerializerInterface $serializer): JsonResponse
    {
        $products = $productRepository->findAll();
        $productsJson = $serializer->serialize($products, 'json', ['groups' => ['product']]);
        return new JsonResponse($productsJson, Response::HTTP_OK, [], true);
    }

    #[Route('/product/{id}', methods:["GET"], requirements: ["id" => Requirement::DIGITS])]
    public function getProduct(Product $product)
    {
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['product']]);
    }

    #[Route('/product/create', methods: ["POST"])]
    public function createProduct(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, CategoryRepository $categoryRepository)
    {
        $productData = json_decode($request->getContent(), true);
        $category = $categoryRepository->find($productData["idCategory"]["id"]);
        $product = $serializer->deserialize($request->getContent(), Product::class, 'json');
        $product->setIdCategory($category);
        $em->persist($product);
        $em->flush();
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['product']]);
    }

    #[Route('/product/edit', methods: ["PUT"])]
    public function editProduct(Request $request, EntityManagerInterface $em, CategoryRepository $categoryRepository, ProductRepository $productRepository)
    {
        $productData = json_decode($request->getContent(), true);
        $product = $productRepository->find($productData["id"]);
        $category = $categoryRepository->find($productData["idCategory"]["id"]);

        $product->setName($productData["name"]);
        $product->setPrice($productData["price"]);
        $product->setQuantity($productData["quantity"]);
        $product->setIdCategory($category);
        $em->persist($product);
        $em->flush();
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['productButId']]);
    }

    #[Route('/product/delete/{id}', methods:["DELETE"], requirements: ["id" => Requirement::DIGITS])]
    public function deleteProduct(Product $product, EntityManagerInterface $em, CompositionRepository $compositionRepository)
    {
        $compositions = $compositionRepository->findByProduct($product->getId());
        foreach($compositions as $compo){
            $em->remove($compo);
        }
        $em->remove($product);
        $em->flush();
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['product']]);
    }


    #[Route('/product/date/{id}', methods:["GET"], requirements: ["id" => Requirement::DIGITS])]
    public function getProductDateExp(Product $product)
    {
        return $this->json($product, Response::HTTP_OK, [], ['groups' => ['product']]);
    }
}
