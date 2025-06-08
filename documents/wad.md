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

## <a name="c1"></a>1. Introdução (Semana 01)

Em um mundo cada vez mais digital, a organização de eventos também tem acompanhado essa transformação. Muitas instituições, empresas e grupos enfrentam dificuldades para gerenciar inscrições, controlar a participação do público e manter um registro claro dos dados dos inscritos. A partir disso, surgiu a ideia de desenvolver uma plataforma online que facilite esse processo, tornando-o mais prático, acessível e eficiente tanto para os organizadores quanto para os participantes.

O projeto propõe a criação de uma plataforma de eventos com foco na gestão de inscrições. Através dela, será possível cadastrar eventos, permitir que usuários se inscrevam, acompanhar listas de participantes e visualizar informações relevantes de maneira simples e organizada. A intenção é que a ferramenta ofereça uma experiência agradável e funcional para quem utiliza.

Para isso, serão utilizadas tecnologias amplamente conhecidas no desenvolvimento de sites e aplicações web. O visual da plataforma será criado com HTML, CSS e JavaScript, garantindo uma interface clara, interativa e fácil de usar. Já a parte responsável por processar dados e manter o funcionamento da aplicação será feita com Node.js e Express.js, enquanto o armazenamento das informações ficará por conta de um banco de dados relacional (SQL).

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

#### Modelo Relacional:

![image](https://github.com/user-attachments/assets/eb1c273d-d7fd-4ae0-982f-d2301de019e1)

Como a aplicação tem o objetivo de gerenciar eventos e suas respectivas inscrições, foram criadas três tabelas principais:

- users: armazena os dados dos usuários da plataforma, como nome, e-mail, senha e tipo de usuário (ex: participante ou organizador);

- events: registra os eventos criados, incluindo título, descrição, data, local e organizador responsável;

- inscricao: relaciona usuários a eventos, registrando cada inscrição com data e status.

As tabelas estão interligadas por chaves estrangeiras para garantir a integridade dos dados e refletir corretamente os relacionamentos entre usuários, eventos e inscrições.

#### Modelo Físico: 

```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  titulo VARCHAR(100),
  descricao TEXT,
  data_inicio DATETIME,
  data_fim DATETIME,
  local VARCHAR,
  vagas_totais INTEGER,
  id_organizador INTEGER
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(100),
  tipo_usuario ENUM,
  data_criacao TIMESTAMP
);

CREATE TABLE inscricao (
  id INTEGER PRIMARY KEY,
  id_usuario INTEGER,
  id_evento INTEGER,
  data_inscricao DATETIME,
  status ENUM
);

ALTER TABLE events
ADD FOREIGN KEY (id_organizador) REFERENCES users(id);

ALTER TABLE inscricao
ADD FOREIGN KEY (id_usuario) REFERENCES users(id);

ALTER TABLE inscricao
ADD FOREIGN KEY (id_evento) REFERENCES events(id);
```

### 3.1.1 BD e Models 

Nesta etapa do projeto, foram implementados os **Models** responsáveis pela interação com o banco de dados PostgreSQL. Eles encapsulam a lógica de acesso e manipulação dos dados, facilitando a organização do sistema e garantindo a separação de responsabilidades entre as camadas da aplicação.

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

<sub> Figura 1 - Diagrama de Arquitetura MVC</sub>
![Projeto Individual - Diagrama de arquitetura MVC drawio](https://github.com/user-attachments/assets/605992be-0b4f-4931-a180-47e29d46654b)
<sup>Fonte: Material produzido pelo autor (2025)</sup>

**Fluxo de Dados e Explicações:**

O diagrama apresentado ilustra a arquitetura MVC (Model-View-Controller) da aplicação, detalhando a interação entre o Cliente, o Servidor da Aplicação e o Servidor de Banco de Dados.

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

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints

---

### 🌐 Sobre a Web API

Esta aplicação segue o padrão MVC (Model–View–Controller), onde a Web API está concentrada na camada de **Controller**. A Web API expõe endpoints RESTful responsáveis por intermediar a comunicação entre o front-end e o banco de dados, permitindo operações como criação, leitura, atualização e exclusão de dados (CRUD). Toda a troca de informações ocorre via requisições HTTP, utilizando JSON como formato principal.

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


### 3.7 Interface e Navegação (Semana 07)

Durante essa etapa de desenvolvimento da aplicação web, foi feita a estilização dos layouts e funcionalidades do sistema com foco na usabilidade. A seguir estão algumas prints das páginas da aplicação:

<sub>Figura 2 - Página de início Event Listener</sub>
![Página de início Event Listener](https://github.com/user-attachments/assets/3f50ba5b-7cc6-48fe-aa5e-1ff52e5fe342)
<sup>Fonte: Material produzido pelo autor (2025)</sup>

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
