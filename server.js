const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Configurações do banco de dados
const dbConfig = {
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'bdbackend',
};

// Criação da conexão com o banco de dados
const pool = mysql.createPool(dbConfig);

// Função para autenticação do token JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'chave_secreta', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Falha na autenticação do token.' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }
};

// Criação da aplicação Express
const app = express();
app.use(express.json());

// Rota de cadastro de usuários (pública)
app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Insere o novo usuário no banco de dados
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
    conn.release();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o usuário.' });
  }
});

// Rotas de consulta, alteração e exclusão de usuários (autenticadas)
app.get('/usuarios', authenticateJWT, async (req, res) => {
  try {
    // Consulta todos os usuários no banco de dados
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM usuarios');
    conn.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao consultar os usuários.' });
  }
});

app.put('/usuarios/:codigo', authenticateJWT, async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const { nome, email, senha } = req.body;

    // Atualiza o usuário no banco de dados
    const conn = await pool.getConnection();
    await conn.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE codigo = ?', [nome, email, senha, codigo]);
    conn.release();

    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário.' });
  }
});

app.delete('/usuarios/:codigo', authenticateJWT, async (req, res) => {
  try {
    const codigo = req.params.codigo;

    // Exclui o usuário do banco de dados
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM usuarios WHERE codigo = ?', [codigo]);
    conn.release();

    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao excluir o usuário.' });
  }
});

// Rotas de consulta, inclusão, alteração e exclusão de produtos (autenticadas)
app.get('/produtos', authenticateJWT, async (req, res) => {
  try {
    // Consulta todos os produtos no banco de dados
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM produtos');
    conn.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao consultar os produtos.' });
  }
});

app.post('/produtos', authenticateJWT, async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade, data_cadastro } = req.body;

    // Insere o novo produto no banco de dados
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO produtos (nome, descricao, preco, quantidade, data_cadastro) VALUES (?, ?, ?, ?, ?)', [nome, descricao, preco, quantidade, data_cadastro]);
    conn.release();

    res.status(201).json({ message: 'Produto cadastrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o produto.' });
  }
});

app.put('/produtos/:id', authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, descricao, preco, quantidade, data_cadastro } = req.body;

    // Atualiza o produto no banco de dados
    const conn = await pool.getConnection();
    await conn.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, data_cadastro = ? WHERE id = ?', [nome, descricao, preco, quantidade, data_cadastro, id]);
    conn.release();

    res.json({ message: 'Produto atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o produto.' });
  }
});

app.delete('/produtos/:id', authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;

    // Exclui o produto do banco de dados
    const conn = await pool.getConnection();
    await conn.query('DELETE FROM produtos WHERE id = ?', [id]);
    conn.release();

    res.json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao excluir o produto.' });
  }
});

// Rota de login (autenticação JWT)
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica as credenciais do usuário (simulação simplificada)
    if (email === 'seu_email' && senha === 'sua_senha') {
      const user = { email: email };
      const token = jwt.sign(user, 'chave_secreta');
      res.json({ token: token });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao efetuar o login.' });
  }
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
