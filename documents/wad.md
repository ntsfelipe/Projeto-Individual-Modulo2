# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Event Listener

#### Felipe Neves Teixeira da Silva

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

&nbsp;&nbsp;&nbsp;&nbsp;Em um mundo cada vez mais digital, a organização de eventos também tem acompanhado essa transformação. Muitas instituições, empresas e grupos enfrentam dificuldades para gerenciar inscrições, controlar a participação do público e manter um registro claro dos dados dos inscritos. A partir disso, surgiu a ideia de desenvolver uma plataforma online que facilite esse processo, tornando-o mais prático, acessível e eficiente tanto para os organizadores quanto para os participantes.

&nbsp;&nbsp;&nbsp;&nbsp;O projeto propõe a criação de uma plataforma de eventos com foco na gestão de inscrições. Através dela, será possível cadastrar eventos, permitir que usuários se inscrevam, acompanhar listas de participantes e visualizar informações relevantes de maneira simples e organizada. A intenção é que a ferramenta ofereça uma experiência agradável e funcional para quem utiliza.

&nbsp;&nbsp;&nbsp;&nbsp;Para isso, serão utilizadas tecnologias amplamente conhecidas no desenvolvimento de sites e aplicações web. O visual da plataforma será criado com HTML, CSS e JavaScript, garantindo uma interface clara, interativa e fácil de usar. Já a parte responsável por processar dados e manter o funcionamento da aplicação será feita com Node.js e Express.js, enquanto o armazenamento das informações ficará por conta de um banco de dados relacional (SQL).

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

#### Modelo Relacional:

<div align="center">
<sub>Figura 1 - Diagrama do Model Relacional</sub>

![image](https://github.com/user-attachments/assets/eb1c273d-d7fd-4ae0-982f-d2301de019e1)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;Como a aplicação tem o objetivo de gerenciar eventos e suas respectivas inscrições, foram criadas três tabelas principais:

- users: armazena os dados dos usuários da plataforma, como nome, e-mail, senha e tipo de usuário (ex: participante ou organizador);

- events: registra os eventos criados, incluindo título, descrição, data, local e organizador responsável;

- inscricao: relaciona usuários a eventos, registrando cada inscrição com data e status.

As tabelas estão interligadas por chaves estrangeiras para garantir a integridade dos dados e refletir corretamente os relacionamentos entre usuários, eventos e inscrições.

#### Modelo Físico: 

```sql
  CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        senha VARCHAR(100),
        tipo_usuario text default 'Selecione uma opção' CHECK (tipo_usuario IN ('Selecione uma opção','organizador', 'usuário')),
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100),
        descricao TEXT,
        data_inicio TIMESTAMP,
        data_fim TIMESTAMP,
        local VARCHAR(255),
        vagas_totais INTEGER,
        id_organizador INTEGER,
        FOREIGN KEY (id_organizador) REFERENCES users(id)
      );

  CREATE TABLE IF NOT EXISTS inscricao (
        id SERIAL PRIMARY KEY,
        id_usuario INTEGER,
        id_evento INTEGER,
        data_inscricao TIMESTAMP,
        status VARCHAR(50),
        FOREIGN KEY (id_usuario) REFERENCES users(id),
        FOREIGN KEY (id_evento) REFERENCES events(id) ON DELETE CASCADE
      );



```

### 3.1.1 BD e Models 

&nbsp;&nbsp;&nbsp;&nbsp;Nesta etapa do projeto, foram implementados os **Models** responsáveis pela interação com o banco de dados PostgreSQL. Eles encapsulam a lógica de acesso e manipulação dos dados, facilitando a organização do sistema e garantindo a separação de responsabilidades entre as camadas da aplicação.

#### Models implementados:

**Events Model (`models/Event.js`):**

- Responsável por manipular a tabela `events` do banco de dados.
- Implementa as operações CRUD:
  - **criarEvents:** Insere um novo evento com os dados fornecidos.
  - **listarEvents:** Retorna todos os eventos cadastrados.
  - **editarEvents:** Atualiza os dados de um evento específico, identificado pelo `id`.
  - **deletarEvent:** Remove um evento pelo seu `id`.

---

### 3.2. Arquitetura

<div align="center">
<sub> Figura 2 - Diagrama de Arquitetura MVC</sub>

![Projeto Individual - Diagrama de arquitetura MVC drawio](https://github.com/user-attachments/assets/605992be-0b4f-4931-a180-47e29d46654b)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

**Fluxo de Dados e Explicações:**

&nbsp;&nbsp;&nbsp;&nbsp;O diagrama apresentado ilustra a arquitetura MVC (Model-View-Controller) da aplicação, detalhando a interação entre o Cliente, o Servidor da Aplicação e o Servidor de Banco de Dados.

1.  **Cliente:**
    * O cliente (usuário) interage com a aplicação através de uma interface de usuário (front-end), que envia requisições ao servidor da aplicação.

2.  **Servidor da Aplicação:**
    * **Controllers:** Esta camada é o ponto de entrada para as requisições do cliente.
        * Recebe as requisições, as interpreta e delega as ações apropriadas.
        * No diagrama, temos um `Controllers` para `Events` que pode `Criar`, `Deletar`, `Listar` e `Editar` eventos.
        * Os Controllers interagem com os Models para obter ou manipular dados e, em seguida, decidem qual View apresentar ao usuário.
        * **Fluxo de Dados:** Uma requisição do Cliente chega a um Controller.

    * **Models:** Esta camada encapsula a lógica de negócios e a interação com o banco de dados.
        * Representa os dados e as regras de negócio da aplicação.
        * No diagrama, temos Models para `Users` (com atributos como Id, nome, email, senha, tipo_usuario, data_criacao) e `Events` (com atributos como Id, titulo, descricao, data_inicio, data_fim, local, vagas_totais, id_organizador). Há também um Model `Inscricao` que relaciona `Id`, `id_usuario`, `id_evento`, `data_inscricao` e `status`.
        * Os Models são responsáveis por persistir e recuperar dados do Servidor de Banco de Dados.
        * **Fluxo de Dados:** Os Controllers acessam os Models para realizar operações de dados (leitura, escrita, atualização, exclusão). Os Models, por sua vez, se comunicam diretamente com o Servidor de Banco de Dados. Os dados são retornados do Banco de Dados para os Models e, em seguida, para os Controllers.

    * **Views:** Esta camada é responsável por exibir a interface de usuário.
        * Recebe dados dos Controllers e os formata para apresentação ao cliente.
        * **Fluxo de Dados:** Após o Controller processar a requisição e interagir com o Model, ele seleciona a View apropriada e a preenche com os dados fornecidos pelo Model. A View é então renderizada e enviada de volta ao Cliente.

3.  **Servidor Banco de Dados:**
    * Armazena e gerencia os dados da aplicação.
    * Os Models são a única camada que interage diretamente com o Servidor de Banco de Dados para operações de persistência e recuperação de dados.
    * **Fluxo de Dados:** Os Models enviam consultas e recebem resultados do Servidor de Banco de Dados.

---

### 3.6. WebAPI e endpoints

### 🌐 Sobre a Web API

&nbsp;&nbsp;&nbsp;&nbsp;Esta aplicação segue o padrão MVC (Model–View–Controller), onde a Web API está concentrada na camada de **Controller**. A Web API expõe endpoints RESTful responsáveis por intermediar a comunicação entre o front-end e o banco de dados, permitindo operações como criação, leitura, atualização e exclusão de dados (CRUD). Toda a troca de informações ocorre via requisições HTTP, utilizando JSON como formato principal.

---

## 📂 Endpoints

### 🏠 Home (`/home`)

| Método | Rota      | Descrição                                              |
|--------|-----------|---------------------------------------------------------|
| GET    | `/home`   | Retorna informações públicas da página inicial (ex: Página inicial). |

---

### 📅 Eventos (`/events`)

| Método | Rota              | Descrição                              |
|--------|-------------------|-----------------------------------------|
| GET    | `/events`         | Lista todos os eventos.                 | 
| POST   | `/events`         | Cria um novo evento.                    |
| PUT    | `/events/:id`     | Atualiza os dados de um evento.         |
| DELETE | `/events/:id`     | Remove um evento do sistema.            |

---

### 👤 Usuários (`/users`)

| Método | Rota            | Descrição                          |
|--------|------------------|-------------------------------------|
| GET    | `/users/`        | Retorna a página de usuário.        |

<br>

---


### 3.7 Interface e Navegação

&nbsp;&nbsp;&nbsp;&nbsp;Durante essa etapa de desenvolvimento da aplicação web, foi feita a estilização dos layouts e funcionalidades do sistema com foco na usabilidade. A seguir estão algumas prints das páginas da aplicação:

<div align="center">
<sub>Figura 3 - Página de início Event Listener</sub>

![Página de início Event Listener](https://github.com/user-attachments/assets/3f50ba5b-7cc6-48fe-aa5e-1ff52e5fe342)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

<div align="center">
<sub>Figura 4 - Página de eventos Event Listener</sub>

![Página de eventos Event Listener](https://github.com/user-attachments/assets/b90f0485-6784-4066-b95c-147bddd45946)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

<div align="center">
<sub>Figura 5 - Página de área do usuário Event Listener</sub>

![Página de usuários Event Listener](https://github.com/user-attachments/assets/0ea2e5aa-5aaa-4790-833c-5aba7d5fe1bd)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

&nbsp;&nbsp;&nbsp;&nbsp;Na área de usuários, será possível cadastrar novos usuários (admins ou usuários comuns), e escolher com qual você quer acessar a plataforma. Se você for um usuário comum, terá acesso à área de eventos e inscrições para poder se inscrever nos eventos. Caso seja admin, será possível editar, adicionar e excluir eventos. 

<div align="center">
<sub>Figura 6 - Página de gerenciamento de eventos na visão do usuário</sub>

![Página gerenciamento de eventos Event Listener](https://github.com/user-attachments/assets/51dec84b-4e5c-43ac-aaab-ca35233e5e9d)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

<div align="center">
<sub>Figura 7 - Página de inscrições na visão do usuário</sub>

![Página de inscrições usuário Event Listener](https://github.com/user-attachments/assets/90ca684b-8a9a-4d68-9283-09a518b178d3)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

<div align="center">
<sub>Figura 7 - Página de gerenciamento de eventos na visão do admin</sub>

![Página de eventos admin Event Listener](https://github.com/user-attachments/assets/e99e371f-587f-404b-b3ba-a5eaa2822b5b)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

&nbsp;&nbsp;&nbsp;&nbsp;Essa estilização das páginas foi feita com CSS. É possível observar isso através das prints do código abaixo:

<div align="center">
<sub>Figura 8 - Pasta de arquivos CSS</sub>

![image](https://github.com/user-attachments/assets/9e556d72-11ba-476a-bf62-0c509cb4aeba)

<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>


<div align="center"> 
<sub>Figura 9 - Print de parte do código css de estilização da aplicação</sub>

![image](https://github.com/user-attachments/assets/dc0074c7-36cc-4f8c-9d54-a69787447a5a)
<sup>Fonte: Material produzido pelo autor (2025)</sup>
</div>

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web 

### 4.1 Demonstração do Sistema Web 

#### <a href="https://youtu.be/PHm7XUMGOG4">Clique aqui para assistir ao vídeo de demonstração da aplicação WEB</a>

&nbsp;&nbsp;&nbsp;&nbsp;A aplicação Event Listener foi desenvolvida com o objetivo de facilitar o gerenciamento de eventos e inscrições. Durante o desenvolvimento, foram implementadas diversas funcionalidades essenciais para atender tanto os organizadores quanto os participantes de eventos.

#### Funcionalidades desenvolvidas:

#### 👤 Cadastro e Login de Usuários
&nbsp;&nbsp;&nbsp;&nbsp;Implementação de diferentes perfis: usuário comum e admin.

&nbsp;&nbsp;&nbsp;&nbsp;Armazenamento seguro de informações como nome, e-mail, senha e tipo de usuário.

---

#### 📅 Gestão de Eventos
&nbsp;&nbsp;&nbsp;&nbsp;Admins podem:

&nbsp;&nbsp;&nbsp;&nbsp;Criar novos eventos com título, descrição, data, local e número de vagas.

&nbsp;&nbsp;&nbsp;&nbsp;Editar ou deletar eventos existentes.

&nbsp;&nbsp;&nbsp;&nbsp;Os dados são persistidos no banco de dados PostgreSQL via API RESTful com Node.js e Express.

---

#### ✅ Inscrição em Eventos
&nbsp;&nbsp;&nbsp;&nbsp;Usuários comuns podem se inscrever em eventos disponíveis com apenas um clique.

&nbsp;&nbsp;&nbsp;&nbsp;A inscrição é registrada com data e status, facilitando o controle posterior.

---

#### 🔎 Visualização de Eventos
&nbsp;&nbsp;&nbsp;&nbsp;Página com listagem de todos os eventos disponíveis.

&nbsp;&nbsp;&nbsp;&nbsp;Exibição de detalhes do evento como local, data e vagas restantes.

---
### 4.2 Conclusões e Trabalhos Futuros

#### ✅ Pontos Fortes:
&nbsp;&nbsp;&nbsp;&nbsp;Arquitetura organizada (MVC): facilitou a manutenção e evolução do código.

&nbsp;&nbsp;&nbsp;&nbsp;Funcionalidades completas para um sistema básico de eventos: cadastro, autenticação, inscrição, CRUD de eventos.

&nbsp;&nbsp;&nbsp;&nbsp;Integração com banco de dados PostgreSQL e uso eficiente de chaves estrangeiras para manter integridade relacional.

&nbsp;&nbsp;&nbsp;&nbsp;Interface intuitiva, com diferenciação clara entre as funcionalidades disponíveis para usuários comuns e administradores.

&nbsp;&nbsp;&nbsp;&nbsp;Aplicação construída com tecnologias amplamente utilizadas no mercado, como Node.js, Express e SQL.

--- 

#### ⚠️ Pontos a Melhorar:
&nbsp;&nbsp;&nbsp;&nbsp;Validação de formulários mais robusta no front e back-end.

&nbsp;&nbsp;&nbsp;&nbsp;Melhorar a responsividade da interface para telas menores (celulares).

&nbsp;&nbsp;&nbsp;&nbsp;Implementar mensagens de feedback ao usuário mais detalhadas (ex: após uma inscrição ou exclusão de evento).

&nbsp;&nbsp;&nbsp;&nbsp;Criar sistema de autenticação com token JWT e proteção de rotas (atualmente sem login real).

---

#### 💡 Trabalhos Futuros e Melhorias Possíveis:
&nbsp;&nbsp;&nbsp;&nbsp;Implementar autenticação completa com login, logout e recuperação de senha.

&nbsp;&nbsp;&nbsp;&nbsp;Adicionar painel de estatísticas para organizadores (quantidade de inscritos por evento, taxa de ocupação, etc.).

&nbsp;&nbsp;&nbsp;&nbsp;Permitir upload de imagens para os eventos.

&nbsp;&nbsp;&nbsp;&nbsp;Criar sistema de notificações por e-mail para usuários inscritos.

&nbsp;&nbsp;&nbsp;&nbsp;Incluir filtros e buscas por evento, data ou local.

&nbsp;&nbsp;&nbsp;&nbsp;Tornar o sistema responsivo para uso em dispositivos móveis.


## <a name="c5"></a>5. Referências

<a href="https://blog.geekhunter.com.br/criar-crud-node-js/">CRUD completo com NodeJS - Geek Hunter</a>

<a href="https://nodejs.org/en/docs">Documentação oficial do Node.js</a>

<a href="https://expressjs.com/pt-br/">Documentação oficial do Express.js</a>

<a href="https://www.postgresql.org/docs/">Documentação oficial do PostgreSQL</a>

<a href="https://www.npmjs.com/package/express-session">Documentação oficial do express-session</a>

<a href="https://www.npmjs.com/package/cors">Documentação oficial do cors</a>

---
---
