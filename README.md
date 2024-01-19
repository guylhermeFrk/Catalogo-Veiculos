# Projeto Catálogo de Veículos

## Índice
- Funcionalidade do Projeto
- Tecnologias utilizadas
- Como rodar o Projeto

## Funcionalidades do Projeto
- Cadastro de usuário
- Login
- Listagem de veículos
- Cadastro de novo veículo
- Detalhes do veículo
- Edição do veículo
- Exclusão do veículo

## Tecnologias Utilizadas
- React
- React Route
- Python
- Flask
- Flask SQLAlchemy

## Como rodar o projeto

```bash
## Foi utilizado o banco de dados PostgresSQL, basta criar o banco veiculos (utilizo o pgAdmin, criei o banco por ele) e para a criação das tabelas, utilizado o flask migrate.. rodar os comandos:

- flask db migrate
- flask db upgrade

- Python
# Acesse a pasta do projeto no terminal
$ cd catalogo-veiculos

# Instale as dependências
$ pip install -r requirements.txt

# Execute a aplicação
$ python app.py

- React
# Acesse a pasta do projeto no terminal
$ cd catalogo-veiculos/veiculos-react/

# Instale as dependências
$ npm install
$ npm install react-bootstrap bootstrap
$ npm install react-router-dom

# Execute a aplicação
$ npm start

# A aplicação será iniciada na porta 3000, acesse pelo navegador:
# http://localhost:3000/
```
