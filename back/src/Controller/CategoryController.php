<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
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
    #[Route('/category')]
    public function getCategory(CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $categoriesJson = $serializer->serialize($categories, 'json', ['groups' => ['categories']]);
        return new JsonResponse($categoriesJson, Response::HTTP_OK, [], true);
    }

    #[Route('/category/create', methods: ["POST", "GET"])]
    public function createCategory(Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $category = $serializer->deserialize($request->getContent(), Category::class, 'json');
        $em->persist($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }

    #[Route('/category/edit', methods: ["POST", "GET"])]
    public function editCategory(Request $request, EntityManagerInterface $em, CategoryRepository $categoryRepository)
    {
        $categoryData = json_decode($request->getContent(), true);
        $category = $categoryRepository->find($categoryData["id"]);
        $category->setName($categoryData["name"]);

        $em->persist($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }

    #[Route('/category/delete/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function deleteCategory(Category $category, EntityManagerInterface $em)
    {
        $em->remove($category);
        $em->flush();
        return $this->json($category, Response::HTTP_OK, [], ['groups' => ['categories']]);
    }
}
