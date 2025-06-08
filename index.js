const express = require('express');
const app = express();
const rotas = require('../back-end/routes/routes.js');

app.use(express.json());
app.use('/', rotas);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
