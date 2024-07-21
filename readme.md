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


[ARQUITETURA INFRA](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=k8sdois.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22P%C3%A1gina-1%22%20id%3D%229Qy2GV0Yn8fTzICAZpW6%22%3E7V1dc5s6Gv41ubQGCZDEZeIk7c5ud7qT2emeqwwB2WaCjQs4cfrrVwJkgyQnPilg7JJ%2BxLwIDI8evZ8SXNnT5fZL6q8X35KQxVfICrdX9u0VQp6H%2Bf9C8FYKXJeUgnkahaUI7gUP0S9WCa1KuolCljUa5kkS59G6KQyS1YoFeUPmp2ny2mw2S%2BLmt679OdMED4Ef69IfUZgvSilFZC%2F%2FyqL5Qn4zxF65Z%2BnLxtWdZAs%2FTF5rIvvuyp6mSZKXn5bbKYsFdhKX8rj7A3t3F5ayVX7MAbP%2F%2FNw%2Bf53k%2F02mv36wl8fJ7SOaoPIsL368qW64utj8TSKQJptVyMRJrCv75nUR5exh7Qdi7yvvci5b5MuYb0H%2BUb%2Bo6jpfWJqzbU1UXeQXlixZnr7xJtVeiVdFGOhU2697%2BJErGy3q2LuSNH7V6fPdyfe48A8VNH8DJmd4MHkKTMQAk2OEyXG7ggl%2BDFP2zPJgUaG0TqJVXlyEe8P%2F8sualv9c3nQqJAC5BqFJRnQh1JvxX9D0DarQJCO6EOrNxJa86qbQJCOufsXq0dBwNFSO5n%2Ftm2STx9GKTXeqUGA8S1b5NImTtMDf5n%2FuRY%2FezKI4rsnvbgm0RPssT5NnVtszK374ntDPFjuCC6JGXE3%2By39i8fcki%2FIoWfF9T0meJ8tag%2Bs4mosdeSLGgF9tBZz4LG0OCnGllQGASG5XzBFf6Wfr8rZm0VZcxw3XqGuxc7mdC9sD%2FNfMASnLkk0asH8E4npu%2BGb5qdmKPWePQZxswnYGI1SUFqL6aPQMY9HraiR62ki8%2FvHABXf%2FfNCGJL%2FHvNkTWi%2BpnbmMwlAcbtRzTU1Y61XkdKL6kK2DDV0D2nZnem%2BIZtRRDITn6QZi16hhIGwPdgWUbQAKx3nFkwZi%2BOcmkTsmWcGga94AOettgZDczz%2FNxe%2BC2tY03mSCs9VZ%2BVWWJy7bnI77kLTUrdgGlH7Mf9gr%2F62P%2BW80Tl2bFIOFsAFbplz3lzTR7OC9S11b6Cl%2BQBixve1cJSvWUhdSRX95ev8RUhh3tQep21EPIjo8DWYfoeeRhY0arDuqHwGUZF20LILLOixmCn%2FI%2FFjsuPGD53nRCSbvrPiya%2BkiGf2l6npuF3kuoudrgQS6D8KVDSLuI80i3r0pCPg3ovvQz33%2BS8gz%2Frv0CsUA5htQsOXe8h6Lvdz6UbBezVvocQcT4Db63Ia61erVkZLdW%2BvvWeSvJyF7YXGyXvKbnSz9YMGRyU7oWaFuhpyDXH3I9epaoWNiynG8tTXeXMsBzolHnO4jHhxxE50MZz%2FmMDSYOZOV627M6dHjv5OQM9H6wtFYn1LPtRRBOrZKfOQioOs6iA1OWGe4O0four6dMOwqThg2BBuEmJwwRDpzwsjHQOnZonrmsQZSIwYpAM2agH4yLlECC0SJe4feTbCp6VBgWUWCD2BbSUVWeUJF6hmlpmSp5x04MSmOBp53RD5UWKVG2yIJqYZcz5snlq4YR7UwegKBvaiAtOqHdVol6laFrvlt5hKLAqp4k4YIgiIg9V2dvcTriLv2Ebmikbt%2FOHc92NS6rjzFKYlryt2NxB2J%2Bx5xB6Fxj6jejsT9w4lr8BYGoXRdjbu5DZYsjDbLE4ZhVjvBBYGcnE3QsWVQGLDHIMzGBm3xN0tU1oESVa3rhlaeaqs0C%2BFugAymR%2FVoUXREFKTJBQwhXW85yDbk8PqF3FQlaXEQlX13sWNITcKfvD%2BdDuv2IrWYDa4z28o0YrXYa5gZ1Gty19E9Cg3lvpOM0LIVlAwlcWgbS72ou0mfA6yJQ6IGWK6hWmCq10DaGU66x3TL1nHyJko1pywWtGRiIbFVzB1TraDXKTeuqVbQkkZe%2BUsZ1Yp2ovo2OP3c1nwqaLk8KHW83U9zbpVtKsZZEMgKRD99rScwUpbl%2Fib1OaYTP1iyE4%2ByA%2FXykM38TZx3pPoc6hr8on5nfrq6NV2%2BZT%2FjC9B6lEAgixUScUJNiPer%2BMba3zln83Z5u7BwEVrRCw4G0geRatuDwPVqPxppqYGzBAPaFWuP8CVH1v5JrKUUq%2BpVYy05NW3xETW%2Fk4dA1DGsbOg3BMK6h%2FY9CS8i9oE2kP6nxNvV8e7XB8BH5DBGbTpYbfpBRW%2BdhB25BVQoWI27hACLGtSq0xV7TRWmkb0je5vuga53h8FePf4qIt7J2wVYO%2Brs0axQ97BrSvb1mmXAevSgJoAm2wuAX%2FXsPE7uU2d45PM8Bu0CQ8tQMOnZB5azvWtAPbD0JQpOujCqQz8YQsPMhn4dYXLEioHRlRisK7FzGrKXoBWSuh7AyNr9QIWvhsmYBAG52r%2FhPnTGWDQydmTs3uHybOBYWqJ2UIzVc2Ca87VD48xtnKN6vxBBg%2FMr01392Dg9t1YGHJcBOiWYj%2BWDI8CIv7XPbPTTBQOcM4QsOrg0MNEzO1OxznvOZd%2F8ky6cbYmuyFJWK1NsSkrs9HY%2F9BxLwhfhUwTLNhgKbaROQfcsPYuACSAGN0KWFton6VgBHkm6IynCHrCxQlLLoEl7p6me7tK83Rc%2FvQhTpqfYPWJKN%2FbsbVE9kVY6vEHlS5w98sjxgOLoGpHv28%2BVayqG5OdquV7X9CDHfv1cqidxvn6%2FPn9ialhjGQ6fLMNLx1X3F%2BE2LNZ%2BGwSl6nJZW2jSAU10pB%2FPVZ%2FssDhvXaHkHwg6fbGSHhEJ927AbOVJxNQ1pQz6NmF6OPaQJ6k%2Fv4hq5W6p3PtZmn4t2RGF9NGSDd%2BSrV9aYSihWvBlyNKIYg8yGLCuSOrpsddI0rMkaSvlSRdhILPLQ2KpHqeWGQI5Ns%2FceEENdGq0X33nB2QnG3C%2FhFKkq06%2FGwjqekhxvckX%2FEY5doXGFG9fuef%2Fc3GSRr8q4dn3B8SlHq11iWNaj9yrG%2BeNay8uwkJmreQjOEeBfPuNpCg2xcHEAjKV1ahjdJWH8PRSvDhxFGST7BKyD5ZnA9zMBbmOcaY6dAHpVV2P1fiLUBDBY5rEbTxaESIbAtTkqoNNTxLgQtNbb%2BSCqfapqieBpJJImR%2BK10idvaJAkAK76USYFYXnALmwsx89MeaDLkNPpE9t8NRWXjRwQENggA2P3sFdrXbbLfE4qCImT9EqjFYXUJaHNtznMd73KVwbeH36FNA6ogwqSTuL2fZavPqZw8JWYfXxNoj9LIuCZpc0QeXYpW%2F%2FExv8pqvNv6qWxcbttt7y9k1ubaO8dhjf%2Bqu2Z3%2BQ2JDHHOyw8vWl74AhZynkfjpn%2BTsN5QPsWNh4x7VOgFrXmspVUpaymIfWL6xxuaa%2Brr7hu1CFNX55VnOIY6Twpbz16rA9ZQxnUpSFq6baSmy0MxXk29347%2FDxiGeKd8dH61N8hKfmo8xlDIWPVGERtT7LR6qFYn3z8YisTAt8rHgF61puxzEzr%2FYcbjB4T%2BgDHP48HyXNPuSjjDUGwkfxzOMGizz8ST4iiyhnUh%2BS2jkfj3jGxZ%2BiH4%2Fmo1xqPhA%2BalqNyBL%2Bb%2BvH3SOE%2BuLjMW8obpOPfek6OeHn7GwvtpuM8Bwet36WXgR%2BfLJPM4xvpol4Pu6%2BuYiJvyWhePjL3f8B%3C%2Fdiagram%3E%3C%2Fmxfile%3E)





