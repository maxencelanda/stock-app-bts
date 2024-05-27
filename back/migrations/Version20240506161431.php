<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240506161431 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE composition (id INT AUTO_INCREMENT NOT NULL, id_product_id INT NOT NULL, id_ingredient_id INT NOT NULL, INDEX IDX_C7F4347E00EE68D (id_product_id), INDEX IDX_C7F43472D1731E9 (id_ingredient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ingredient (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, allergen VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ingredient_stock (id INT AUTO_INCREMENT NOT NULL, id_ingredient_id INT NOT NULL, expiration_date DATE NOT NULL, INDEX IDX_520431A12D1731E9 (id_ingredient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, id_category_id INT NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, quantity INT NOT NULL, INDEX IDX_D34A04ADA545015 (id_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE composition ADD CONSTRAINT FK_C7F4347E00EE68D FOREIGN KEY (id_product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE composition ADD CONSTRAINT FK_C7F43472D1731E9 FOREIGN KEY (id_ingredient_id) REFERENCES ingredient (id)');
        $this->addSql('ALTER TABLE ingredient_stock ADD CONSTRAINT FK_520431A12D1731E9 FOREIGN KEY (id_ingredient_id) REFERENCES ingredient (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADA545015 FOREIGN KEY (id_category_id) REFERENCES category (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE composition DROP FOREIGN KEY FK_C7F4347E00EE68D');
        $this->addSql('ALTER TABLE composition DROP FOREIGN KEY FK_C7F43472D1731E9');
        $this->addSql('ALTER TABLE ingredient_stock DROP FOREIGN KEY FK_520431A12D1731E9');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04ADA545015');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE composition');
        $this->addSql('DROP TABLE ingredient');
        $this->addSql('DROP TABLE ingredient_stock');
        $this->addSql('DROP TABLE product');
    }
}
