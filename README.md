
# Backend CroSoften

API REST de um TodoList.

## Pontos de melhoria e comentarios sobre o desafio.

Eu tive um pouco de dificuldade em lidar com a funação de subtask nas subtasks, me confundiu um pouco,e o codigo que eu esta tentando criar continua no projeto, pois eu acho que falhas também fazem parte.

No mais a estrutura principal está funcionando bem, POST, PUT , DELETE e os GET que estão sendo usado pra filtros também. 

Criação de usuarios e autenticação via JWT foi relativamente simples de fazer, pensei que eu iria ter mais dificuldade nisso mas foi tranquilo.

Att, Jonathan Ponciano


## Stack utilizada


**Back-end:** Nodejs, Prisma, Swagger, Nodemon.

**Banco de Dados Suportados:**
Mysql

**Detalhes Sobre a Infraestrutura:**
O Mysql está rodando atualmente em Docker.

Senhas e o que precisar alterar eu usei o .env, que mantive no projeto propositalmente.
Nele possui tanto Database_URL como o ACCESS_TOKEN_SECRET do JWT.


## Instalação PostgreSQL in Docker

Instale e configure o PostgreSQL

```bash
  cd docker
  sudo bash start_mysql_docker.sh
```
O diretorio Docker, já possui um **DockerFile** para configuração da imagem e um **init.sql** para fazer a configuração das tabelas. 
O start_mysql_docker.sh apenas automatiza essa função.


## Instalação Principal

Instalando Dependencias
```bash
npm npm install
```
Inciar migrações do prisma e monitoramento do servidor com o Nodemon.
``` bash
npm run dev
```

## Pronto seu servidor esta ON!

Ele ficara disponivel em
``` bash
http://localhost:3000
```
Para acessar a documentação da API, basta acessa
``` bash
http://localhost:3000/docs/
```

