<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CompositionRepository;
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
    
}
