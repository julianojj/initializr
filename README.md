# initializr

## BACKEND

Foi desenvovido utilizando TypeScript + Node.js

Boas práticas:

Foi utilizado a clean architecture + events + tdd

Tests de unidade e de integração

## FRONTEND

Foi desenvolvido utilizando o Next.js + Styled-Components

## Registred images

![registred_images](https://github.com/julianojj/initializr/blob/main/registred_images.png)

![rabbitmq_image_example](https://github.com/julianojj/initializr/blob/main/rabbitmq_image_example.png)

## PROXY

Foi utilizado o nginx como proxy reverso, onde, através do server_name, conseguimos redirecionar para a aplicação solicitada

## Como rodar o projeto?

Devemos alterar as envs dentro de /app/next.config.js:

```
BASE_URL_APP=http://app.server.local -> my_ip or host (https://host.example.com)
BASE_URL_API=http://app.server.local/initializr -> my_ip or host (https://host.example.com/initializr)
```

Logo após, devemos rodar o seguinte comando:

`docker compose up -d`
