# Aplicação de gerenciamento de propriedades imobiliárias

Esta é uma aplicação que tem como objetivo gerenciar propriedades imobiliárias. Através desta aplicação, é possível cadastrar novas propriedades, atualizar as informações de propriedades existentes e visualizar informações sobre todas as propriedades registradas.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Postgresql

## Rotas

### /users

- `GET /users` - Retorna uma lista de todos os usuários cadastrados
- `POST /users` - Cadastra um novo usuário

### /login

- `POST /login` - Realiza o login do usuário

Requisição:

```json
{
  "email": "exemplo@dominio.com",
  "password": "senha123"
}
```

Resposta (em caso de sucesso):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Resposta (em caso de erro):

```json
{
  "message": "Invalid credentials"
}
```

### /

- `GET /` - Retorna uma lista com todas as propriedades imobiliárias cadastradas
- `POST /` - Cadastra uma nova propriedade
- `PUT /:id` - Atualiza os dados da propriedade com o identificador :id
- `DELETE /:id` - Deleta a propriedade com o identificador :id

## Como executar a aplicação

Para executar a aplicação, siga os seguintes passos:

1. Faça o download do repositório.
2. Instale as dependências do projeto com o comando `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute a aplicação com o comando `npm start`.

## Considerações finais

Esta aplicação foi desenvolvida utilizando as tecnologias Node.js, TypeScript, Express e MongoDB. Ela foi criada com o objetivo de gerenciar propriedades imobiliárias e permite o cadastro, atualização e deleção de informações sobre as propriedades. As rotas da aplicação estão detalhadas acima e a aplicação pode ser executada seguindo as instruções também acima.
