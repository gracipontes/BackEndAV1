# BackEndAV1
Atividade avaliativa acerca do primeiro bimestre da matéria de  Web Back End
1. Banco de dados: Usando os conhecimentos adquiridos até agora, crie um banco de dados
contendo duastabelas, uma de usuários e outra a sua escolha. A tabela de usuários deve conter
o código, nome, e-mail e senha. A segunda tabela deve conter pelo menos 5 colunas definidas
conforme sua necessidade. Especifique os tipo de dados apropriados para cada uma delas e
também se permitem valores nulos ou não. Lembre-se também de definir as chaves primárias
e estrangeiras de cada tabela. A escolha da tecnologia de banco de dados é livre (MySQL, SQL
Server, PostgreSQL).
2. API: crie uma API que seja capaz de fazer um CRUD nas tabelas do banco de dados acima,
seguindo os critérios abaixo:
a. O cadastro de um novo usuário (INSERT) é de acesso público;
b. As operações de consulta, alteração e exclusão (SELECT, UPDATE e DELETE) de
usuários cadastros devem ser autenticados, disponíveis apenas para usuários
“logados” no sistema;
c. As operações de consulta, inclusão, alteração e exclusão (SELECT, INSERT, UPDATE e
DELETE) na segunda tabela devem ser autenticados, disponíveis apenas para usuários
“logados” no sistema;
d. Crie um método de login, usando JWT.
A tecnologia para criar a API é livre (sugerida NodeJS com Express).
3. Postman: crie uma coleção no Postman (ou insomnia) demonstrando como fazer as chamadas
para os métodos da sua API.
# O script do banco de dados foi inserido no formato JSON, mas segue abaixo o que foi utilizado na implementação:
```
CREATE DATABASE bdbackend;
USE bdbackend;

CREATE TABLE usuarios (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(8,2) NOT NULL,
    quantidade INT NOT NULL,
    data_cadastro DATE
);
````

