<?php

namespace App\Controller;


use App\Entity\Composition;
use App\Entity\Product;
use App\Repository\CompositionRepository;
use App\Repository\IngredientRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\SerializerInterface;

class CompositionController extends AbstractController
{
    #[Route('/composition')]
    public function getCompositions(CompositionRepository $compositionRepository, SerializerInterface $serializer): JsonResponse
    {
        $compositions = $compositionRepository->findAll();
        $compositionsJson = $serializer->serialize($compositions, 'json', ['groups' => ['compositions']]);
        return new JsonResponse($compositionsJson, Response::HTTP_OK, [], true);
    }

    #[Route('/composition/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function getProduitComposition(Request $request, int $id, CompositionRepository $compositionRepository, SerializerInterface $serializer): JsonResponse
    {
        $compositions = $compositionRepository->findByProduct($id);
        $compositionsJson = $serializer->serialize($compositions, 'json', ['groups' => ['compositions']]);
        return new JsonResponse($compositionsJson, Response::HTTP_OK, [], true);
    }
    

    #[Route('/composition/create', methods: ["POST", "GET"])]
    public function createComposition(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, ProductRepository $productRepository, IngredientRepository $ingredientRepository)
    {
        $compositionData = json_decode($request->getContent(), true);
        $product = $productRepository->find($compositionData["idProduct"]["id"]);
        $ingredient = $ingredientRepository->find($compositionData["idIngredient"]["id"]);
        $composition = $serializer->deserialize($request->getContent(), Composition::class, 'json');
        $composition->setIdProduct($product);
        $composition->setIdIngredient($ingredient);
        $em->persist($composition);
        $em->flush();
        return $this->json($composition, Response::HTTP_OK, [], ['groups' => ['compositions']]);
    }

    #[Route('/composition/delete/{id}', requirements: ["id" => Requirement::DIGITS])]
    public function deleteComposition(Composition $composition, EntityManagerInterface $em)
    {
        $em->remove($composition);
        $em->flush();
        return $this->json($composition, Response::HTTP_OK, [], ['groups' => ['product']]);
    }
}
