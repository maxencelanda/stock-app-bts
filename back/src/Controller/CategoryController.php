<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\CompositionRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
    #[Route('/category', methods:["GET"])]
    public function getCategory(CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $categoriesJson = $serializer->serialize($categories, 'json', ['groups' => ['categories']]);
        return new JsonResponse($categoriesJson, Response::HTTP_OK, [], true);
    }

    #[Route('/category/create', methods: ["POST"])]
    public function createCategory(Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $category = $serializer->deserialize($request->getContent(), Category::class, 'json');
        $em->persist($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }

    #[Route('/category/edit', methods: ["PUT"])]
    public function editCategory(Request $request, EntityManagerInterface $em, CategoryRepository $categoryRepository)
    {
        $categoryData = json_decode($request->getContent(), true);
        $category = $categoryRepository->find($categoryData["id"]);
        $category->setName($categoryData["name"]);

        $em->persist($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }

    #[Route('/category/delete/{id}',methods:["DELETE"], requirements: ["id" => Requirement::DIGITS])]
    public function deleteCategory(Category $category, EntityManagerInterface $em, ProductRepository $productRepository, CompositionRepository $compositionRepository)
    {
        $produits = $productRepository->findByCategory($category->getId());
        foreach($produits as $produit){
            $compositions = $compositionRepository->findByProduct($produit->getId());
            foreach($compositions as $compo){
                $em->remove($compo);
            }
            $em->remove($produit);
        }
        $em->remove($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }
}
