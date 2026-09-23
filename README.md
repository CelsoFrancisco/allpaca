# 🦙 ALLpaca

> Uma loja virtual com uma pitada de pixel art, desenvolvida para colocar em prática conhecimentos de **Java, Spring Boot, Angular e PostgreSQL**.

**Acesse o projeto:** https://allpaca.pages.dev

**Repositório:** https://github.com/CelsoFrancisco/allpaca

---

##  Sobre o projeto

A **ALLpaca** é uma aplicação de e-commerce desenvolvida do zero com o objetivo de praticar e consolidar conhecimentos em desenvolvimento **Full Stack**.

O projeto possui frontend desenvolvido em **Angular** e backend desenvolvido em **Java com Spring Boot**, com comunicação através de uma API REST e persistência dos dados em **PostgreSQL**.

Além das funcionalidades de uma loja virtual, o projeto também foi utilizado para estudar conceitos importantes de desenvolvimento web, como autenticação, autorização, JWT, integração entre aplicações, banco de dados e deploy em produção.

A identidade visual da aplicação foi criada especialmente para o projeto, utilizando uma estética inspirada em **pixel art**, tendo a alpaca como mascote. 

---

## Funcionalidades

### Produtos

* Listagem de produtos
* Visualização dos detalhes dos produtos
* Busca de produtos
* Controle de estoque
* Imagens personalizadas para os produtos

### Carrinho

* Adição de produtos ao carrinho
* Alteração de quantidade
* Remoção de produtos
* Cálculo do valor total
* Simulação de parcelamento
* Validação de login antes da finalização da compra

### Usuários

* Cadastro
* Login
* Autenticação utilizando JWT
* Perfil do usuário
* Alteração de dados pessoais
* Alteração de e-mail
* Alteração de senha

### Pedidos

* Finalização da compra
* Histórico de pedidos
* Visualização dos produtos comprados
* Atualização do estoque após a compra
* Página de compra concluída

### Segurança

* Spring Security
* Autenticação baseada em JWT
* Controle de acesso por perfil
* Roles `USER` e `ADMIN`
* Proteção dos endpoints administrativos
* Tratamento personalizado para respostas `401` e `403`
* Senha armazenada de forma segura
* Variáveis de ambiente para informações sensíveis

---

## Tecnologias utilizadas

### Frontend

* Angular 14
* TypeScript
* HTML5
* CSS3
* Font Awesome
* Google Fonts
* Press Start 2P

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* Maven
* Lombok

### Banco de dados

* PostgreSQL
* Supabase

### Deploy

* Cloudflare Pages — Frontend
* Render — Backend
* Supabase — Banco de dados

---



---

## Autenticação

A autenticação é realizada através de **JWT (JSON Web Token)**.


Os endpoints administrativos relacionados aos produtos possuem acesso restrito ao perfil `ADMIN`.

---

## Identidade visual

Um dos objetivos do projeto também foi criar uma identidade visual própria.

A ALLpaca utiliza:

* Pixel art
* Mascote próprio
* Ícones personalizados
* Diferentes expressões da alpaca
* Fonte **Press Start 2P**
* Elementos visuais inspirados em jogos clássicos

A intenção foi criar uma loja com uma identidade diferente de um e-commerce tradicional.

---


## Deploy

O projeto está dividido em três serviços:

| Serviço        | Plataforma       |
| -------------- | ---------------- |
| Frontend       | Cloudflare Pages |
| Backend        | Render           |
| Banco de dados | Supabase         |

### Frontend

 https://allpaca.pages.dev

### Backend

 https://allpaca-api.onrender.com

---

## Objetivo do projeto

Este projeto foi desenvolvido principalmente como uma forma de **aprender através da prática**.

Durante o desenvolvimento foram estudados e aplicados conceitos como:

* Programação orientada a objetos
* Java
* Spring Boot
* APIs REST
* Banco de dados relacionais
* JPA e Hibernate
* Autenticação
* Autorização
* JWT
* Angular
* TypeScript
* Comunicação entre frontend e backend
* Git e GitHub
* Deploy
* Variáveis de ambiente
* Integração com serviços externos

Mais do que apenas criar uma loja virtual, o objetivo foi entender como diferentes tecnologias se conectam para formar uma aplicação completa.

---

## Próximos passos

O projeto ainda vai receber diversas melhorias, como:

* Painel administrativo
* Gerenciamento de produtos
* Gerenciamento de estoque
* Melhorias no sistema de pedidos
* Pagamento real
* Melhorias de responsividade
* Testes automatizados
* Melhorias de performance
* Novas funcionalidades para usuários

---

## Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.
