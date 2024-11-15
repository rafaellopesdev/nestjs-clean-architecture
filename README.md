## Descrição
Está aplicação foi desenvolvida seguindo os principios do SOLID, Clean Architecture, Clean Code e MonoRepo, com o objetivo de criar um Todo List, onde é possível criar, listar, excluir e marcar como concluído as tarefas.

## Requisitos
Para executar este projeto, você precisará ter instalado em sua máquina as seguintes ferramentas:
```bash
Docker
Node.js
```
## Configuração
Configurando as variaveis de ambiente, renomeie o arquivo .env.example para .env
```bash
$ cp .env.example .env
```

## Opcionais
Uma das tecnologias utilizadas foi o MailTrap, para receber os e-mails do Job. Para configurar o MailTrap, você precisará criar uma conta e obter as credenciais. Mas caso não queira utilizar o MailTrap, basta deixar os campos em branco no .env.

A não configuração do MailTrap, não irá afetar o funcionamento da aplicação e também não ira afetar
a visualização do e-mail pois o e-mail é printado no console.

Criar Conta: <a href="https://mailtrap.io/" target="_blank">Mailtrap</a>

```bash
$ MAILTRAP_USER=
$ MAILTRAP_PASS=
```

## Rodando a aplicação
Para rodar a aplicação, execute o comando abaixo:
```bash
$ sudo docker-compose up --build

```

## Testes
Este projeto possui testes unitários. Para rodar os testes, execute o comando abaixo:

```bash
$ npm install
```

```bash
$ npm run test
```

## Consumindo APIs
O consumo das APIs é bem simplificado pois seguimos os padrões REST/OpenAPI. Para consumir as APIs, basta seguir a url abaixo:
```bash
$ http://localhost:3000/api/v1/documentation
```
