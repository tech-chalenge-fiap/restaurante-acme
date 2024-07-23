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
</a><a href="https://kubernetes.io/pt-br" target="_blank" rel="noreferrer"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZRaprpBOQN_FpQY_8ImbRvEtOY9UgLO6cg&s" alt="docker" width="40" height="40"/> </a>

<h1>Clean Architecture (Arquitetura Limpa)</h1>
<p>A Clean Architecture é um padrão de arquitetura de software que visa a criar sistemas que são independentes de frameworks, testáveis, independentes de UI, independentes de banco de dados e independentes de qualquer agência externa. A estrutura lógica que foi desenvolvida no projeto pode ser explicada da seguinte forma:</p>

<div class="layer">
    <h2>Application Layer</h2>
    <ul>
        <li><strong>controllers</strong>: Contém os controladores que recebem as requisições dos usuários, interagem com os casos de uso e retornam as respostas apropriadas. Eles servem como intermediários entre a interface do usuário e a lógica de negócio.</li>
        <li><strong>helpers</strong>: Inclui funções auxiliares ou utilitárias usadas pelos controladores. Podem ser funções de formatação, manipulação de dados, etc.</li>
        <li><strong>middlewares</strong>: Contém middlewares que processam requisições antes de chegarem aos controladores ou depois que saem dos controladores, como autenticação, autorização, logging, etc.</li>
        <li><strong>validation</strong>: Abriga lógica de validação de dados. Pode conter validadores para entradas de usuário, esquemas de validação, etc.</li>
    </ul>
</div>
<div class="layer">
    <h2>Domain Layer</h2>
    <ul>
        <li><strong>contracts</strong>: Define interfaces e contratos que a camada de aplicação deve seguir. Inclui interfaces para repositórios, gateways, serviços, etc. Isso permite que a implementação concreta seja trocada sem afetar a lógica de negócio.</li>
        <li><strong>use-cases</strong>: Contém a lógica de negócio principal e os casos de uso do sistema. Cada caso de uso representa uma ação ou um conjunto de ações que o sistema deve realizar.</li>
    </ul>
</div>
<div class="layer">
    <h2>Infra Layer</h2>
    <ul>
        <li><strong>docs</strong>: Documentação da aplicação, que pode incluir especificações de API, manuais de usuário, etc.</li>
        <li><strong>gateways</strong>: Implementa os contratos definidos na camada de domínio para interagir com sistemas externos, como APIs, serviços de terceiros, etc.</li>
        <li><strong>helpers</strong>: Funções auxiliares específicas para a camada de infraestrutura.</li>
        <li><strong>repos/mysql</strong>: Contém implementações específicas de repositórios para o banco de dados MySQL. Implementa as interfaces definidas na camada de domínio.</li>
    </ul>
</div>
<div class="layer">
    <h2>Main Layer</h2>
    <ul>
        <li><strong>adapters</strong>: Inclui adaptadores que convertem dados de uma forma para outra, facilitando a comunicação entre diferentes partes do sistema ou entre o sistema e sistemas externos.</li>
        <li><strong>config</strong>: Contém configurações gerais da aplicação, como variáveis de ambiente, configurações de framework, etc.</li>
        <li><strong>docs</strong>: Documentação geral da aplicação, incluindo documentação de API, documentação de arquitetura, etc.</li>
        <li><strong>factories</strong>: Contém fábricas que instanciam objetos e dependências. Usado para implementar o padrão de injeção de dependência.</li>
        <li><strong>middlewares</strong>: Middlewares gerais da aplicação, que podem ser usados em diferentes pontos do sistema.</li>
        <li><strong>routes</strong>: Define as rotas de aplicação, mapeando endpoints para controladores e ações específicas..</li>
    </ul>
</div>
<p>Essa estrutura permite uma clara separação de responsabilidades e facilita a manutenção, testes e evolução do sistema. Cada camada tem um propósito específico e deve ser desenvolvida e testada de forma independente das outras.</p>

# Executar o Projeto Tech Challenge Minikube

Este guia fornece instruções passo a passo para configurar e executar o ambiente do projeto utilizando Kubermetes com Minikube.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados na sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download)
- [Kubectl](https://kubernetes.io/pt-br/docs/reference/kubectl/)

## Passo a Passo

### 1. Clone o Repositório

Clone este repositório para sua máquina local:

```sh
git clone https://github.com/mauriciocarvalho01/FIAP-Software-Architecture-Pos-Tech-7SOAT.git
cd FIAP-Software-Architecture-Pos-Tech-7SOAT
```

### 2. Instale o Minikube e Kubectl

Certifique-se de ter o Minikube e o Kubectl instalados em sua máquina. Siga as instruções de instalação no site oficial do Minikube.


### 3. Inicie o Minikube

Inicie o Minikube com o seguinte comando:

```sh
minikube start
minikube tunnel
```

### 4. Crie e Aplique os Arquivos Kubernetes

Crie e aplique os arquivos Kubernetes necessários (ConfigMap, Deployment, Service, HPA, etc.):

```sh
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/config-map.yaml
kubectl apply -f k8s/mysql-config.yaml
kubectl apply -f k8s/mysql-service.yaml
kubectl apply -f k8s/mysql-volume.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/metrics.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

### 5. Documentos

- [Arquitetura K8S](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=k8sdois.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22P%C3%A1gina-1%22%20id%3D%229Qy2GV0Yn8fTzICAZpW6%22%3E7V1dc5s6Gv41ubQGCZDEZeIk7c5ud7qT2emeqwwB2WaCjQs4cfrrVwJkgyQnPilg7JJ%2BxLwIDI8evZ8SXNnT5fZL6q8X35KQxVfICrdX9u0VQp6H%2Bf9C8FYKXJeUgnkahaUI7gUP0S9WCa1KuolCljUa5kkS59G6KQyS1YoFeUPmp2ny2mw2S%2BLmt679OdMED4Ef69IfUZgvSilFZC%2F%2FyqL5Qn4zxF65Z%2BnLxtWdZAs%2FTF5rIvvuyp6mSZKXn5bbKYsFdhKX8rj7A3t3F5ayVX7MAbP%2F%2FNw%2Bf53k%2F02mv36wl8fJ7SOaoPIsL368qW64utj8TSKQJptVyMRJrCv75nUR5exh7Qdi7yvvci5b5MuYb0H%2BUb%2Bo6jpfWJqzbU1UXeQXlixZnr7xJtVeiVdFGOhU2697%2BJErGy3q2LuSNH7V6fPdyfe48A8VNH8DJmd4MHkKTMQAk2OEyXG7ggl%2BDFP2zPJgUaG0TqJVXlyEe8P%2F8sualv9c3nQqJAC5BqFJRnQh1JvxX9D0DarQJCO6EOrNxJa86qbQJCOufsXq0dBwNFSO5n%2Ftm2STx9GKTXeqUGA8S1b5NImTtMDf5n%2FuRY%2FezKI4rsnvbgm0RPssT5NnVtszK374ntDPFjuCC6JGXE3%2By39i8fcki%2FIoWfF9T0meJ8tag%2Bs4mosdeSLGgF9tBZz4LG0OCnGllQGASG5XzBFf6Wfr8rZm0VZcxw3XqGuxc7mdC9sD%2FNfMASnLkk0asH8E4npu%2BGb5qdmKPWePQZxswnYGI1SUFqL6aPQMY9HraiR62ki8%2FvHABXf%2FfNCGJL%2FHvNkTWi%2BpnbmMwlAcbtRzTU1Y61XkdKL6kK2DDV0D2nZnem%2BIZtRRDITn6QZi16hhIGwPdgWUbQAKx3nFkwZi%2BOcmkTsmWcGga94AOettgZDczz%2FNxe%2BC2tY03mSCs9VZ%2BVWWJy7bnI77kLTUrdgGlH7Mf9gr%2F62P%2BW80Tl2bFIOFsAFbplz3lzTR7OC9S11b6Cl%2BQBixve1cJSvWUhdSRX95ev8RUhh3tQep21EPIjo8DWYfoeeRhY0arDuqHwGUZF20LILLOixmCn%2FI%2FFjsuPGD53nRCSbvrPiya%2BkiGf2l6npuF3kuoudrgQS6D8KVDSLuI80i3r0pCPg3ovvQz33%2BS8gz%2Frv0CsUA5htQsOXe8h6Lvdz6UbBezVvocQcT4Db63Ia61erVkZLdW%2BvvWeSvJyF7YXGyXvKbnSz9YMGRyU7oWaFuhpyDXH3I9epaoWNiynG8tTXeXMsBzolHnO4jHhxxE50MZz%2FmMDSYOZOV627M6dHjv5OQM9H6wtFYn1LPtRRBOrZKfOQioOs6iA1OWGe4O0four6dMOwqThg2BBuEmJwwRDpzwsjHQOnZonrmsQZSIwYpAM2agH4yLlECC0SJe4feTbCp6VBgWUWCD2BbSUVWeUJF6hmlpmSp5x04MSmOBp53RD5UWKVG2yIJqYZcz5snlq4YR7UwegKBvaiAtOqHdVol6laFrvlt5hKLAqp4k4YIgiIg9V2dvcTriLv2Ebmikbt%2FOHc92NS6rjzFKYlryt2NxB2J%2Bx5xB6Fxj6jejsT9w4lr8BYGoXRdjbu5DZYsjDbLE4ZhVjvBBYGcnE3QsWVQGLDHIMzGBm3xN0tU1oESVa3rhlaeaqs0C%2BFugAymR%2FVoUXREFKTJBQwhXW85yDbk8PqF3FQlaXEQlX13sWNITcKfvD%2BdDuv2IrWYDa4z28o0YrXYa5gZ1Gty19E9Cg3lvpOM0LIVlAwlcWgbS72ou0mfA6yJQ6IGWK6hWmCq10DaGU66x3TL1nHyJko1pywWtGRiIbFVzB1TraDXKTeuqVbQkkZe%2BUsZ1Yp2ovo2OP3c1nwqaLk8KHW83U9zbpVtKsZZEMgKRD99rScwUpbl%2Fib1OaYTP1iyE4%2ByA%2FXykM38TZx3pPoc6hr8on5nfrq6NV2%2BZT%2FjC9B6lEAgixUScUJNiPer%2BMba3zln83Z5u7BwEVrRCw4G0geRatuDwPVqPxppqYGzBAPaFWuP8CVH1v5JrKUUq%2BpVYy05NW3xETW%2Fk4dA1DGsbOg3BMK6h%2FY9CS8i9oE2kP6nxNvV8e7XB8BH5DBGbTpYbfpBRW%2BdhB25BVQoWI27hACLGtSq0xV7TRWmkb0je5vuga53h8FePf4qIt7J2wVYO%2Brs0axQ97BrSvb1mmXAevSgJoAm2wuAX%2FXsPE7uU2d45PM8Bu0CQ8tQMOnZB5azvWtAPbD0JQpOujCqQz8YQsPMhn4dYXLEioHRlRisK7FzGrKXoBWSuh7AyNr9QIWvhsmYBAG52r%2FhPnTGWDQydmTs3uHybOBYWqJ2UIzVc2Ca87VD48xtnKN6vxBBg%2FMr01392Dg9t1YGHJcBOiWYj%2BWDI8CIv7XPbPTTBQOcM4QsOrg0MNEzO1OxznvOZd%2F8ky6cbYmuyFJWK1NsSkrs9HY%2F9BxLwhfhUwTLNhgKbaROQfcsPYuACSAGN0KWFton6VgBHkm6IynCHrCxQlLLoEl7p6me7tK83Rc%2FvQhTpqfYPWJKN%2FbsbVE9kVY6vEHlS5w98sjxgOLoGpHv28%2BVayqG5OdquV7X9CDHfv1cqidxvn6%2FPn9ialhjGQ6fLMNLx1X3F%2BE2LNZ%2BGwSl6nJZW2jSAU10pB%2FPVZ%2FssDhvXaHkHwg6fbGSHhEJ927AbOVJxNQ1pQz6NmF6OPaQJ6k%2Fv4hq5W6p3PtZmn4t2RGF9NGSDd%2BSrV9aYSihWvBlyNKIYg8yGLCuSOrpsddI0rMkaSvlSRdhILPLQ2KpHqeWGQI5Ns%2FceEENdGq0X33nB2QnG3C%2FhFKkq06%2FGwjqekhxvckX%2FEY5doXGFG9fuef%2Fc3GSRr8q4dn3B8SlHq11iWNaj9yrG%2BeNay8uwkJmreQjOEeBfPuNpCg2xcHEAjKV1ahjdJWH8PRSvDhxFGST7BKyD5ZnA9zMBbmOcaY6dAHpVV2P1fiLUBDBY5rEbTxaESIbAtTkqoNNTxLgQtNbb%2BSCqfapqieBpJJImR%2BK10idvaJAkAK76USYFYXnALmwsx89MeaDLkNPpE9t8NRWXjRwQENggA2P3sFdrXbbLfE4qCImT9EqjFYXUJaHNtznMd73KVwbeH36FNA6ogwqSTuL2fZavPqZw8JWYfXxNoj9LIuCZpc0QeXYpW%2F%2FExv8pqvNv6qWxcbttt7y9k1ubaO8dhjf%2Bqu2Z3%2BQ2JDHHOyw8vWl74AhZynkfjpn%2BTsN5QPsWNh4x7VOgFrXmspVUpaymIfWL6xxuaa%2Brr7hu1CFNX55VnOIY6Twpbz16rA9ZQxnUpSFq6baSmy0MxXk29347%2FDxiGeKd8dH61N8hKfmo8xlDIWPVGERtT7LR6qFYn3z8YisTAt8rHgF61puxzEzr%2FYcbjB4T%2BgDHP48HyXNPuSjjDUGwkfxzOMGizz8ST4iiyhnUh%2BS2jkfj3jGxZ%2BiH4%2Fmo1xqPhA%2BalqNyBL%2Bb%2BvH3SOE%2BuLjMW8obpOPfek6OeHn7GwvtpuM8Bwet36WXgR%2BfLJPM4xvpol4Pu6%2BuYiJvyWhePjL3f8B%3C%2Fdiagram%3E%3C%2Fmxfile%3E)


- [Docs Swagger](http://localhost/api-docs/)

- [Video Explicação da Arquitetura](https://youtube.com/watch?v=KJASKADHNAKDHAKD)

