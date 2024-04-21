<?php

namespace App\Entity;

use App\Repository\CompositionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CompositionRepository::class)]
class Composition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['compositions'])]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['compositions'])]
    private ?Product $idProduct = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['compositions'])]
    private ?Ingredient $idIngredient = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdProduct(): ?Product
    {
        return $this->idProduct;
    }

    public function setIdProduct(?Product $idProduct): static
    {
        $this->idProduct = $idProduct;

        return $this;
    }

    public function getIdIngredient(): ?Ingredient
    {
        return $this->idIngredient;
    }

    public function setIdIngredient(?Ingredient $idIngredient): static
    {
        $this->idIngredient = $idIngredient;

        return $this;
    }
}
