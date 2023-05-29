const express = require('express');
const app = express();

// Rota de teste
app.get('/', (req, res) => {
  res.send('API em execução');
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  // Lógica para criar um novo usuário no banco de dados
  // ...
  res.send('Novo usuário criado');
});
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Usuário 1' },
    { id: 2, name: 'Usuário 2' },
    { id: 3, name: 'Usuário 3' }
  ];
  res.json(users);
});
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Usuário com ID ${userId} atualizado`);
});
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Usuário com ID ${userId} excluído`);
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
