#### Método de Autenticação por API Key (Autorização através de Chave de API) utilizando o Header User:

A api utiliza uma API Key para autenticação através do cabeçalho User, é esperado que a chave de API seja incluída no cabeçalho Authorization da requisição HTTP. Aqui está um exemplo:

Exemplo de solicitação com chave de API no cabeçalho User:
```http
GET /api/user HTTP/1.1
Host: api.example.com
Authorization: <chave_de_api>
```

##### Principais características do método de autenticação por API Key:

##### Simplicidade: Fácil implementação e utilização.

##### Segurança: A segurança depende da confidencialidade da chave. Deve ser transmitida de maneira segura e mantida em segredo.

##### Controle de Acesso: Permite rastrear e controlar o acesso de aplicativos ou usuários individuais à API.


#### Obter informações do cliente por ID

Endpoint: `http://localhost:4080/api/user/`

#### Requisição

- Método: `GET`

#### Parâmetros da Query String:

- **id** (obrigatório): ID do cliente.

Exemplo de solicitação:

```http
GET /api/user/?userId=uuidv4 HTTP/1.1
Host: api.example.com
Authorization: <chave_de_api>
```

#### Respostas
   
* Descrição: Sucesso.
    - 200 OK:
    - Tipo: application/json

    - Exemplo:
    ```json
    {
    "id": 10016,
    "name": "Cliente Exemplo"
    }
    ```

* Descrição: Requisição inválida.
    - 400 Bad Request:
    - Tipo: application/json

    - Exemplo:
    ```json
    {
	"error": "Any request response bad request"
    }
    ```

* Descrição: Acesso negado
    - 403 Forbidden:
    - Tipo: application/json

    - Exemplo:
    ```json
    {
	"error": "Access denied"
    }
    ```

* Descrição: Cliente não encontrado.
    - 404 Not Found:
    - Tipo: application/json

    - Exemplo:
    ```json
    {
	"error": "Any request response not found"
    }
    ```
    
* Descrição: Erro interno do servidor.
    - 500 Internal Server Error:
    - Tipo: application/json

    - Exemplo:
    ```json
    {
	"error": "Any request response server error"
    }
    ```
