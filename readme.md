# FIAP - Software Architecture Pós Tech - 7SOAT
### Fase 1: Tech Challenge

#### Restaurante ACME

### Grupo
- <a href="https://linkedin.com/in/mauricio-carvalho-programmer" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Mauricio Carvalho Pinheiro RM: rm356030](https://www.linkedin.com/in/mauricio-carvalho-developer)
- <a href="https://linkedin.com/in/geovanelourenco" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Geovane Lourenço da Silva RM: 356061](https://www.linkedin.com/in/geovanelourenco)
- <a href="https://linkedin.com/in/marciocintrafilho" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Márcio de Souza Cintra Filho RM: 355344](https://linkedin.com/in/marciocintrafilho)
- <a href="https://www.linkedin.com/in/arnoldosilva/" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Antonio Arnoldo Lima da Silva RM: 356215](https://www.linkedin.com/in/arnoldosilva/)
- <a href="https://linkedin.com/" target="_blank"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="LinkedIn" width="20" height="20"/></a> [Adriana Silva de Jesus RM: 355168](https://linkedin.com/)


<h3 align="left">Linguagens e Ferramentas:</h3>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a><a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>

<h1>DDD: Domain Driven Design</h1>
<p>O foco do DDD é entender profundamente esse domínio específico e modelá-lo de forma a refletir com precisão a linguagem e as regras de negócio do domínio no próprio código-fonte do software. Isso envolve colaboração próxima entre desenvolvedores e especialistas no domínio para capturar e representar com precisão o conhecimento do domínio no design do software. Ao fazer isso, o DDD busca criar software que seja altamente adaptado e alinhado com as necessidades do negócio, facilitando a manutenção e evolução do sistema ao longo do tempo.</p>
<a href="https://miro.com/app/board/uXjVKTlyQEk=/?share_link_id=112660018954" target="_blank"><img src="https://images.ctfassets.net/w6r2i5d8q73s/49Gy23NRmO7BRuWS9ewuIk/c786ff574fe59f91b0a054ec531769b3/miro.png" alt="LinkedIn" width="20" height="20"/></a> [Diagrama Event Storm](https://miro.com/app/board/uXjVKTlyQEk=/?share_link_id=112660018954)
<br>
<a href="https://www.notion.so/Tech-Challenge-DDD-linguagem-Ub-qua-d24b857c89544d2aafc33852843f40bc?pvs=4" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="LinkedIn" width="20" height="20"/></a> [Linguagem Ubíqua](https://www.notion.so/Tech-Challenge-DDD-linguagem-Ub-qua-d24b857c89544d2aafc33852843f40bc?pvs=4)


<h1>Arquitetura Hexagonal</h1>
<p>A arquitetura apresentada segue o estilo da Arquitetura Hexagonal (ou Arquitetura de Portos e Adaptadores), que visa separar a lógica de negócios (núcleo da aplicação) das interfaces externas, como bancos de dados, serviços externos, interfaces de usuário, etc. Vamos analisar cada camada e suas pastas:</p>

<div class="layer">
    <h2>application</h2>
    <ul>
        <li><strong>controllers</strong>: Contém os controladores que recebem as requisições e coordenam a interação entre as interfaces de entrada e a lógica de negócios.</li>
        <li><strong>errors</strong>: Define os tipos de erros específicos da aplicação que podem ser utilizados para tratamento de exceções.</li>
        <li><strong>helpers</strong>: Inclui funções auxiliares que podem ser reutilizadas em diferentes partes da aplicação.</li>
        <li>
            <h2>main</h2>
            <ul>
                <li><strong>adapters</strong>: Adaptadores que servem como intermediários entre a aplicação e os serviços externos ou interfaces. Eles traduzem dados e solicitações entre sistemas.</li>
                <li><strong>config</strong>: Configurações gerais da aplicação, como variáveis de ambiente, configurações de banco de dados, etc.</li>
                <li><strong>factories</strong>: Fábricas responsáveis por instanciar e configurar objetos, usados para injeção de dependência.</li>
                <li><strong>middlewares</strong>: Funções intermediárias que processam as requisições antes de chegarem aos controladores ou aos adaptadores.</li>
                <li><strong>routes</strong>: Define as rotas da aplicação, mapeando URLs para controladores específicos.</li>
                <li><strong>types</strong>: Tipos TypeScript usados na aplicação para garantir tipagem estática e evitar erros de tipagem.</li>
                <li><strong>index.ts</strong>: O ponto de entrada principal da aplicação, onde a inicialização ocorre.</li>
            </ul>
        </li>
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



# Executar o Projeto Tech Challenge com Docker Compose

Este guia fornece instruções passo a passo para configurar e executar o ambiente do projeto Node.js usando Docker Compose.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados na sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Passo a Passo

### 1. Clone o Repositório

Clone este repositório para sua máquina local:

```sh
git clone https://github.com/mauriciocarvalho01/FIAP-Software-Architecture-Pos-Tech-7SOAT.git
cd FIAP-Software-Architecture-Pos-Tech-7SOAT
```

### 2. Crie o arquivo .env
Na raiz do projeto renomeie o arquivo .env.sample para .env e coloque as variaveis fornecidas anteriormente na entrega do projeto.

### 3. Construa e Inicie o Contêiner
No terminal, navegue até o diretório raiz do projeto e execute o seguinte comando para construir e iniciar os contêineres definidos no docker-compose.yml:

```sh
docker-compose up --build
```

### 4. Teste a documentação Swagger
- [Docs](http://localhost:4080/api-docs/)


![Descrição da Imagem](https://1drv.ms/u/c/98c5468271565141/EQoA5gZynzFKuV0H1U-Mb58Bgew53Y24TFnIMJbibxNMgw?e=nQojtx)





