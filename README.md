# Projeto Individual Modulo 2

## Projeto Individual - Aplicação Web - Plataforma de eventos com gerenciamento de inscrições 🎭

O Projeto escolhido para ser desenvolvido foi o de uma plataforma de eventos com função de gerenciar inscrições. Para realizar esse desenvolvimento, será utilizado HTML, CSS, JavaScript, Node.js, express.js e banco de dados relacional (SQL)

### Estrutura de pastas (MVC)

```
meu-projeto/
│
├── config/               
│   └── database.js
├── migrations/
│   └── migrate.js
│   └── add_updated_at_to_events.js
├── documents/               
│   └── wad.md
├── controllers/           
│   └── HomeController.js
│   └── EventsController.js
│   └── UserController.js
│   └── InscricoesController.js
├── node_modules/ 
├── models/                
│   └── User.js
│   └── Events.js
│   └── Home.js
│   └── Inscricoes.js
├── routes/                
│   └── index.js
├── public/
|  └── css/
│    └── style.css
│  └── js/
│    └── script.js
├── services/              
│   └── userService.js
├── assets/  
├── views/  
|  └── pages/    
│     └── home.ejs        
│     └── inscricoes.ejs
│     └── events.ejs
│     └── user.ejs
├── scripts/              
├── styles/               
├── tests/                
│   └── example.test.js
├── .gitignore             
├── .env.example          
├── jest.config.js         
├── package-lock.json      
├── package.json          
├── readme.md              
├── server.js
├── app.js       
├── server.js       
└── rest.http              

```

## Como executar o projeto localmente:

#### 1 - Utilize uma IDE (ex: Visual Studio Code)

#### 2 - Clone o repositório:
```
https://github.com/ntsfelipe/Projeto-Individual-Modulo2/
```
#### 3 - Abra o terminal, e instale as dependências:
```
npm init -y
npm install cors
npm install express
npm install express-session
npm install dotenv
npm install pg
```
#### 4 - Após isso, inicie o projeto com o comando:
```
npm start ou node server.js
```
#### 5 - Último passo, abra o servidor local no seguinte link:
```
localhost:3000
```
#### 6 - Pronto! Agora o site está rodando :)
