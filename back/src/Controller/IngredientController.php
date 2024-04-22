<?php

namespace App\Controller;

use App\Entity\Ingredient;
use App\Repository\CompositionRepository;
use App\Repository\IngredientRepository;
use App\Repository\IngredientStockRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\SerializerInterface;

class IngredientController extends AbstractController
{
    #[Route('/ingredient')]
    public function getIngredients(IngredientRepository $ingredientRepository, SerializerInterface $serializer): JsonResponse
    {
        $ingredients = $ingredientRepository->findAll();
        $ingredientsJson = $serializer->serialize($ingredients, 'json', ['groups' => ['ingredients']]);
        return new JsonResponse($ingredientsJson, Response::HTTP_OK, [], true);
    }

    #[Route('/ingredient/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function getProduct(Ingredient $ingredient)
    {
        return $this->json($ingredient, Response::HTTP_OK, [], ['groups' => ['ingredients']]);
    }

    #[Route('/ingredient/create', methods: ["POST", "GET"])]
    public function createIngredient(Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $ingredient = $serializer->deserialize($request->getContent(), Ingredient::class, 'json');
        $em->persist($ingredient);
        $em->flush();
        return $this->json($ingredient, Response::HTTP_OK, [], ['groups' => ['ingredients']]);
    }

    #[Route('/ingredient/edit', methods: ["POST", "GET"])]
    public function editIngredient(Request $request, EntityManagerInterface $em, IngredientRepository $categoryRepository)
    {
        $ingredientData = json_decode($request->getContent(), true);
        $ingredient = $categoryRepository->find($ingredientData["id"]);
        $ingredient->setName($ingredientData["name"]);
        $ingredient->setAllergen($ingredientData["allergen"]);

        $em->persist($ingredient);
        $em->flush();
        return $this->json($ingredient, Response::HTTP_OK, [], ['groups' => ['ingredients']]);
    }

    #[Route('/ingredient/delete/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function deleteIngredient(Ingredient $ingredient, EntityManagerInterface $em, CompositionRepository $compositionRepository, IngredientStockRepository $ingredientStockRepository)
    {
        $compositions = $compositionRepository->findByIngredient($ingredient->getId());
        foreach($compositions as $compo){
            $em->remove($compo);
        }
        $ingredientsStocks = $ingredientStockRepository->findByIngredient($ingredient->getId());
        foreach($ingredientsStocks as $ingredientStock){
            $em->remove($ingredientStock);
        }
        $em->remove($ingredient);
        $em->flush();
        return $this->json($ingredient, Response::HTTP_OK, [], ['groups' => ['ingredients']]);
    }
}
