import { TokenHandler } from "@/infra/gateways";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateData1683634567892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tokenHandler = new TokenHandler();
    // Categorias
    await queryRunner.query(`
      INSERT INTO categorias (categoria_id, nome, data_cadastro, data_atualizacao)
      VALUES
        ('${tokenHandler.generateUuid()}', 'Bebida', NOW(), NOW()),
        ('${tokenHandler.generateUuid()}', 'Acompanhamento', NOW(), NOW()),
        ('${tokenHandler.generateUuid()}', 'Lanche', NOW(), NOW()),
        ('${tokenHandler.generateUuid()}', 'Sobremesa', NOW(), NOW());
    `);

    // Produtos
    await queryRunner.query(`
    INSERT INTO produtos (produto_id, nome, descricao, preco, data_cadastro, data_atualizacao, categoryId)
    VALUES
      -- Hambúrguer de Queijo
      ('${tokenHandler.generateUuid()}', 'Hambúrguer de Queijo', 'Hambúrguer com queijo cheddar', 30.0, NOW(), NOW(),
      (SELECT id FROM categorias WHERE nome = 'Lanche')),
      -- Batata Frita
      ('${tokenHandler.generateUuid()}', 'Batata Frita', 'Porção de batata frita', 4.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
      -- Sorvete de Baunilha
      ('${tokenHandler.generateUuid()}', 'Sorvete de Baunilha', 'Bola de sorvete sabor baunilha', 15.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Sobremesa')),
      -- Suco de Frutas
      ('${tokenHandler.generateUuid()}', 'Suco de Frutas', 'Suco natural de frutas mistas', 12.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Bebida')),
      -- Sanduíche de Presunto
      ('${tokenHandler.generateUuid()}', 'Sanduíche de Presunto', 'Sanduíche simples de presunto', 15.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
      -- Onion Rings
      ('${tokenHandler.generateUuid()}', 'Onion Rings', 'Porção de onion rings crocantes', 13.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
      -- Nuggets de Frango
      ('${tokenHandler.generateUuid()}', 'Nuggets de Frango', 'Porção de nuggets de frango', 15.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
      -- Refrigerante
      ('${tokenHandler.generateUuid()}', 'Refrigerante', 'Lata de refrigerante', 6.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Bebida')),
      -- Bolo de Chocolate
      ('${tokenHandler.generateUuid()}', 'Bolo de Chocolate', 'Fatia de bolo de chocolate', 7.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Sobremesa')),
      -- Mousse de Maracujá
      ('${tokenHandler.generateUuid()}', 'Mousse de Maracujá', 'Taça de mousse de maracujá', 8.8, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Sobremesa'));
  `);


    // Ingredientes
    await queryRunner.query(`
      INSERT INTO ingredientes (ingrediente_id, nome, descricao, preco, data_cadastro, data_atualizacao, categoryId)
      VALUES
        -- Pão de Hambúrguer
        ('${tokenHandler.generateUuid()}', 'Pão de Hambúrguer', 'Pão específico para hambúrguer', 0.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Hambúrguer de Carne
        ('${tokenHandler.generateUuid()}', 'Hambúrguer de Carne', 'Carne bovina moída temperada', 2.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Queijo Cheddar
        ('${tokenHandler.generateUuid()}', 'Queijo Cheddar', 'Queijo cheddar derretido', 1.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Alface
        ('${tokenHandler.generateUuid()}', 'Alface', 'Folhas de alface fresca', 0.3, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Tomate
        ('${tokenHandler.generateUuid()}', 'Tomate', 'Fatias de tomate fresco', 0.4, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Maionese
        ('${tokenHandler.generateUuid()}', 'Maionese', 'Maionese tradicional', 0.2, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Lanche')),
        -- Ketchup
        ('${tokenHandler.generateUuid()}', 'Ketchup', 'Molho de tomate ketchup', 0.2, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
        -- Batata
        ('${tokenHandler.generateUuid()}', 'Batata Crispy', 'Batata frita crispy', 0.8, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
        -- Sal
        ('${tokenHandler.generateUuid()}', 'Sal', 'Sal de cozinha', 0.1, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
        -- Bacon
        ('${tokenHandler.generateUuid()}', 'Bacon', 'Bacon frito em cubos', 0.3, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
        -- Cheddar 
        ('${tokenHandler.generateUuid()}', 'Queijo Cheddar', 'Queijo cheddar muito saboroso', 0.3, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Acompanhamento')),
        -- Sorvete de Baunilha
        ('${tokenHandler.generateUuid()}', 'Calda de Baunilha', 'Calda sabor baunilha', 1.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Sobremesa')),
        -- Casquinha
        ('${tokenHandler.generateUuid()}', 'Casquinha', 'Casquinha de sorvete', 0.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Sobremesa')),
        -- Frutas Variadas
        ('${tokenHandler.generateUuid()}', 'Frutas Variadas', 'Frutas frescas selecionadas', 1.0, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Bebida')),
        -- Água Mineral
        ('${tokenHandler.generateUuid()}', 'Água Mineral', 'Água mineral natural', 0.5, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Bebida')),
        -- Açúcar
        ('${tokenHandler.generateUuid()}', 'Açúcar', 'Açúcar refinado', 0.1, NOW(), NOW(), (SELECT id FROM categorias WHERE nome = 'Bebida'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
