<?php

namespace App\Controller;

use App\Repository\IngredientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
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
}
