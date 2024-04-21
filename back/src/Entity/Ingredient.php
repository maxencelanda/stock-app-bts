<?php

namespace App\Entity;

use App\Repository\IngredientRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
class Ingredient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['compositions'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['compositions'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $allergen = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAllergen(): ?string
    {
        return $this->allergen;
    }

    public function setAllergen(string $allergen): static
    {
        $this->allergen = $allergen;

        return $this;
    }
}
