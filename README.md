## Instalação

```bash
$ npm install
```

Configure as variáveis de ambiente: renomeie o arquivo .env.example para .env
Para receber os e-mails do Job via MailTrap, preencha as credenciais correspondentes. Caso contrário, deixe os campos em branco e os e-mails serão exibidos no console.

## Rodando a aplicação

Instale o Docker e rode o comando abaixo para subir os containers
```bash
$ sudo docker-compose up --build

```

## Testes

Este projeto possui testes unitários. Para rodar os testes, execute o comando abaixo:
```bash
$ npm run test
```

## Consumindo APIs

O consumo das APIs é bem simplificado pois seguimos os padrões REST/OpenAPI. Para consumir as APIs, basta seguir a url abaixo:
```bash
$ http://localhost:3000/api/documentation
```
