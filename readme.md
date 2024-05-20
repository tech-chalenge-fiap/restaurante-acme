# FIAP - Software Architecture Pós Tech - 7SOAT
### Fase 1: Tech Challenge

#### Restaurante ACME

### Grupo
- <a href="https://linkedin.com/in/mauricio-carvalho-programmer" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Mauricio Carvalho Pinheiro RM: rm356030](https://www.linkedin.com/in/mauricio-carvalho-developer)
- <a href="https://linkedin.com/in/geovanelourenco" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Geovane Lourenço da Silva RM: 356061](https://www.linkedin.com/in/geovanelourenco)
- <a href="https://linkedin.com/in/mauricio-carvalho-programmer" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Integrante Y](https://linkedin.com/in/yyy)
- <a href="https://linkedin.com/in/mauricio-carvalho-programmer" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Integrante Z](https://linkedin.com/in/zzz)
- <a href="https://linkedin.com/in/mauricio-carvalho-programmer" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Integrante W](https://linkedin.com/in/wwww)


<h3 align="left">Linguagens e Ferramentas:</h3>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a><a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>



<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arquitetura Hexagonal</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #555;
        }
        p {
            line-height: 1.6;
        }
        .layer {
            margin-bottom: 20px;
        }
        ul {
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <h1>Arquitetura Hexagonal</h1>
    <p>A arquitetura apresentada segue o estilo da Arquitetura Hexagonal (ou Arquitetura de Portos e Adaptadores), que visa separar a lógica de negócios (núcleo da aplicação) das interfaces externas, como bancos de dados, serviços externos, interfaces de usuário, etc. Vamos analisar cada camada e suas pastas:</p>

    <div class="layer">
        <h2>application</h2>
        <ul>
            <li><strong>controllers</strong>: Contém os controladores que recebem as requisições e coordenam a interação entre as interfaces de entrada e a lógica de negócios.</li>
            <li><strong>errors</strong>: Define os tipos de erros específicos da aplicação que podem ser utilizados para tratamento de exceções.</li>
            <li><strong>helpers</strong>: Inclui funções auxiliares que podem ser reutilizadas em diferentes partes da aplicação.</li>
        </ul>
    </div>

    <div class="layer">
        <h2>main</h2>
        <ul>
            <li><strong>adapters</strong>: Adaptadores que servem como intermediários entre a aplicação e os serviços externos ou interfaces. Eles traduzem dados e solicitações entre sistemas.</li>
            <li><strong>config</strong>: Configurações gerais da aplicação, como variáveis de ambiente, configurações de banco de dados, etc.</li>
            <li><strong>factories</strong>: Fábricas responsáveis por instanciar e configurar objetos, geralmente usados para injeção de dependência.</li>
            <li><strong>middlewares</strong>: Funções intermediárias que processam as requisições antes de chegarem aos controladores ou aos adaptadores.</li>
            <li><strong>routes</strong>: Define as rotas da aplicação, mapeando URLs para controladores específicos.</li>
            <li><strong>types</strong>: Tipos TypeScript usados na aplicação para garantir tipagem estática e evitar erros de tipagem.</li>
            <li><strong>index.ts</strong>: O ponto de entrada principal da aplicação, onde a inicialização ocorre.</li>
        </ul>
    </div>

    <div class="layer">
        <h2>domain</h2>
        <ul>
            <li><strong>contracts</strong>: Interfaces e contratos que definem as regras de negócio e as operações possíveis dentro do domínio da aplicação.</li>
            <li><strong>errors</strong>: Erros específicos do domínio, utilizados para sinalizar problemas específicos da lógica de negócios.</li>
            <li><strong>services</strong>: Serviços que encapsulam a lógica de negócios, garantindo que as regras de negócio sejam aplicadas corretamente.</li>
        </ul>
    </div>

    <div class="layer">
        <h2>infra</h2>
        <ul>
            <li><strong>docs</strong>: Documentação da aplicação, que pode incluir especificações de API, manuais de usuário, etc.</li>
            <li><strong>errors</strong>: Erros relacionados à infraestrutura, como problemas de conexão com banco de dados, falhas de rede, etc.</li>
            <li><strong>gateways</strong>: Implementações específicas para comunicação com sistemas externos, como APIs de terceiros ou bancos de dados.</li>
            <li><strong>helpers</strong>: Funções auxiliares específicas para a camada de infraestrutura.</li>
            <li><strong>repos</strong>: Repositórios que gerenciam a persistência de dados, interagindo com o banco de dados ou outras formas de armazenamento.</li>
        </ul>
    </div>

    <p>Essa estrutura visa isolar a lógica de negócios da infraestrutura e das interfaces externas, promovendo uma maior modularidade, testabilidade e facilidade de manutenção. Cada camada tem uma responsabilidade bem definida e se comunica com as outras através de interfaces bem estabelecidas.</p>
</body>
</html>

