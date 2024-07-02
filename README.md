# Projeto de Blog com Express e MongoDB
## Este é um projeto de blog desenvolvido utilizando Node.js, Express, MongoDB e EJS. O objetivo do projeto é criar uma plataforma de blog onde os usuários podem visualizar posts, buscar por posts específicos e onde administradores podem gerenciar os posts.

![home 1](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/0ddc3492-1416-4995-8f19-828d67b4df78)
![home 2](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/0a8cebb7-c91d-4910-af80-00a2cdd3cb70)
![noticia](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/3779006a-e9dc-4b62-bf47-ac07588a106a)
![busca](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/672ee454-0949-4a03-81ac-59c4281badbb)
![login](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/41988969-5fd7-4921-8022-94d542b284e9)
![painel](https://github.com/felips2ribeiro/portal-noticias/assets/139786186/84edc703-fc33-4c87-81e6-c675e7925dd6)


## Funcionalidades
* Visualização de posts com título, conteúdo, imagem e categoria.
* Busca por posts com base no título.
*Visualização de posts populares com base no número de visualizações.
* Autenticação de administradores para acessar o painel de administração.
* Criação, edição e exclusão de posts no painel de administração.

## Tecnologias Utilizadas
* Node.js
* Express
* MongoDB
* Mongoose
* EJS
* Body-Parser
* Express-Session
* Express-FileUpload

## Instalação
Para executar este projeto localmente, siga os passos abaixo:

## Clone o repositório:
```git clone https://github.com/felips2ribeiro/portal-noticias.git```

## Instale as dependências:
```npm install```

## Configure a conexão com o MongoDB:
Atualize a string de conexão com o MongoDB em mongoose.connect() no arquivo index.js com as suas credenciais.

## Execute o servidor:

## nodemon index.js

## Acesse a aplicação:
Abra seu navegador e acesse http://localhost:5000

## Estrutura de Diretórios
├── public
│   └── images
├── temp
├── views
│   ├── pages
│   │   ├── admin-login.ejs
│   │   ├── admin-panel.ejs
│   │   ├── busca.ejs
│   │   ├── home.ejs
│   │   └── single.ejs
├── posts.js
├── index.js

## Rotas
* GET /: Página inicial, exibe todos os posts e posts populares.
* GET /: Página de visualização de um post específico.
* GET /admin/login: Página de login do administrador.
* POST /admin/login: Autenticação do administrador.
* POST /admin/cadastro: Cadastro de novos posts.
* GET /admin/deletar/: Deleta um post específico.

