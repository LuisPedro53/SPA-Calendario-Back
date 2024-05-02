# Projeto MyTasks

Bem-vindo!
Este é o backend do Projeto MyTasks, criado inteiramente por mim. Um CRUD onde é possível pesquisar, deletar, criar e atualizar tasks.

## Tecnologias Usadas

![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQL Server](https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)




## Um Pouco de Cada Tecnologia

Criar um projeto usando as seguintes tecnologias foi uma experiência incrivelmente enriquecedora:

- **GraphQL**: GraphQL é uma linguagem de consulta e manipulação de dados para APIs. Ele permite que os clientes definam a estrutura dos dados necessários, e a mesma estrutura dos dados é retornada do servidor. Isso leva a menos dados sendo transferidos pela rede e uma aplicação mais eficiente.

- **Express**: Express.js é um framework web rápido, não opinativo e minimalista para Node.js. Ele fornece um conjunto robusto de recursos para aplicações web e móveis, tornando-se uma escolha popular para a construção de aplicações web de página única, multi-página e híbridas.

- **SQL Server**: Microsoft SQL Server é um sistema de gerenciamento de banco de dados relacional (RDBMS) que suporta uma grande variedade de processamento de transações, inteligência de negócios e aplicações de análise em ambientes de TI corporativos. É uma das três tecnologias de banco de dados líderes de mercado, juntamente com o Oracle Database e o DB2 da IBM.

## Desenvolvedor

- Luiz Pedro Galdino Silva

## Recursos do Projeto

1. Registro
2. Atualização
3. Deletar
4. Pesquisar


## Como executar o projeto

Após clonar o repositório, certifique-se de que o Docker está instalado em seu sistema. Se não, você pode baixar e instalar a partir do site oficial do Docker.

Uma vez que o Docker está instalado, siga estes passos para executar o projeto:

1. Derrube quaisquer versões antigas do projeto que possam estar rodando com o seguinte comando:

```
docker-compose down
```
2. Construa o projeto Docker Compose com o seguinte comando:

```
docker-compose build
```
3. Construa o projeto Docker Compose com o seguinte comando:

```
docker-compose up
```
4. Após executar os comandos acima, ao final da instalação da imagem e subsequente execução, o terminal exibirá as seguintes mensagens:

```
Conectado ao banco de dados
```
```
Server is running on port 8080
```
5. Certifique-se de que o servidor (EducaData-Back) está rodando na porta 8080.

6. Para verificar se o servidor está rodando, digite no seu navegador:  

```
localhost:8080/graphql
```

7. Se a parte gráfica do graphql aparecer, então o servidor está rodando corretamente

## Conclusão

Em resumo, cada uma dessas tecnologias desempenhou um papel vital no projeto, contribuindo para o seu sucesso. A combinação dessas ferramentas resultou em um código limpo, eficiente e seguro. Foi uma jornada de aprendizado valiosa que certamente terá um impacto positivo em projetos futuros.
