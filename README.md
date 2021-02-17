# Teste prático de programação - SMARKIO

- [Objetivo](#objetivo)
- [Requisitos para rodar o projeto]()
- [Como executar projeto]()
> - [Iniciando o back-end]()
> - [Iniciando o front-end]()

## Objetivo
Desenvolver uma aplicação web em **Node.js** com banco de dados **MySQL**. A aplicação
consistirá somente de uma página com dois painéis: no painel posicionado a esquerda, o
usuário poderá cadastrar novos comentários. No painel da direita todos os comentários
cadastrados devem ser listados, com um botão ao lado de cada um que ao ser clicado
executará um áudio de leitura do comentário.

Para realizar a conversão do comentário de texto para áudio, o será utilizada a
API [Text to Speech do IBM Watson](https://www.ibm.com/cloud/watson-text-to-speech).

As operações de cadastro e atualização da lista de comentários devem ser realizadas via
**AJAX**.

## Requisitos para rodar o projeto
Os seguinte programas precisam estar instalados em sua máquina para poder rodar o projeto:

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/products/docker-desktop)

***OBS**: Para rodar o banco de dados **MySQL** utilizei um container **Docker**, mas também é possivel utilizar
um banco que roda diretamente de sua máquina, para isso basta alterar o arquivo **`ormconfig.json`**, presente na raiz do back-end.

    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "SEU_USER_NAME",
      "password": "SUA_SENHA",
      "database": "SEU_DATABASE",
      "entities": [
        "./src/models/*.ts"
      ],
      "migrations": [
        "./src/database/migrations/*.ts"
      ],
      "cli": {
        "migrationsDir":"./src/database/migrations"
      }
    }


## Como executar projeto

1. Acesse seu terminal e crie o container docker que vai conter o banco MySQL, execute:

```bash 
  docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -e MYSQL_DATABASE=mydatabase -e MYSQL_USER=docker -e MYSQL_PASSWORD=docker -p 3306:3306 -d mysql
```

2. Ainda no terminal, em um diretório a sua escolha, clone esse repositório:

```bash 
  git clone https://github.com/DanielSLucas/testeSmarkio.git
```

3. Entre na pasta do projeto:

```bash 
  cd testeSmarkio
```

### Iniciando o back-end
Para iniciar o back-end:

1.  Entre na pasta do back-end pelo terminal:

```bash 
  cd backend
```

2. Instale as dependências do projeto:

```bash 
  npm install
```
  Ou então:
```bash 
  yarn
```

3. Execute o projeto a partir do script `dev:server`:

```bash 
  npm run dev:server
```
  Ou então:
```bash 
  yarn dev:server
```

Se tudo estiver certo, você verá a seguinte mensagem:
```bash 
  Servidor rodando na porta 3333
```
***OBS**: É possivel alterar a porta na qual o servidor estará rodando através das váriaveis ambiente, bem como
algumas configurações da API Text to Speech do IBM Watson, basta criar um arquivo **`.env`** no seguinte formato:


    SERVER_PORT=

    IBM_WATSON_APIKEY=
    IBM_WATSON_URL=
    IBM_WATSON_MEDIA_TYPE=
    IBM_WATSON_VOICE=

### Iniciando o front-end

1.  Entre na pasta do front-end pelo terminal:

```bash 
  cd frontend
```

2. Instale as dependências do projeto:

```bash 
  npm install
```
  Ou então:
```bash 
  yarn
```

3. Execute o projeto a partir do script `start`:

```bash 
  npm run start
```
  Ou então:
```bash 
  yarn start
```

Se tudo estiver certo, seu navegador será aberto no endereço `http://localhost:3000/`, já rodando o projeto.