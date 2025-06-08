const express = require('express');
const fs = require('fs');
const router = express.Router();

function lerArquivo(caminho) {
  return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
}

function escreverArquivo(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// Arquivos
const CAMINHOS = {
  artesao: './data/artesao.json',
  produto: './data/produto.json',
  evento: './data/evento.json',
  conteudo: './data/conteudo.json',
};

// POST - Cadastrar artesãos
router.post('/artesaos', (req, res) => {
  const artesoes = lerArquivo(CAMINHOS.artesao);
  const novo = req.body;

  const ultimoId = artesoes.length > 0 ? artesoes[artesoes.length - 1].id : 0;
  novo.id = ultimoId + 1;

  artesoes.push(novo);
  escreverArquivo(CAMINHOS.artesao, artesoes);

  res.status(201).json(novo); 
});


// GET - Consultar artesãos
router.get('/artesaos', (req, res) => {
  const artesoes = lerArquivo(CAMINHOS.artesao);
  res.json(artesoes);
});

// DELETE - Excluir artesão pelo id
router.delete('/artesaos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let artesoes = lerArquivo(CAMINHOS.artesao);
  artesoes = artesoes.filter(item => item.id !== id);
  escreverArquivo(CAMINHOS.artesao, artesoes);
  res.send(`Artesão com ID ${id} excluído.`);
});

// GET - Consultar produtos
router.get('/produtos', (req, res) => {
  const produtos = lerArquivo(CAMINHOS.produto);
  res.json(produtos);
});

// DELETE - Excluir produto pelo id
router.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let produtos = lerArquivo(CAMINHOS.produto);
  produtos = produtos.filter(item => item.id !== id);
  escreverArquivo(CAMINHOS.produto, produtos);
  res.send(`Produto com ID ${id} excluído.`);
});

// GET - Consultar eventos
router.get('/eventos', (req, res) => {
  const eventos = lerArquivo(CAMINHOS.evento);
  res.json(eventos);
});

//PUT - Atualizar evento pelo id
router.put('/eventos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let eventos = lerArquivo(CAMINHOS.evento);
  const index = eventos.findIndex(item => item.id === id);
  if (index !== -1) {
    eventos[index] = { ...eventos[index], ...req.body };
    escreverArquivo(CAMINHOS.evento, eventos);
    res.send(`Evento com ID ${id} atualizado.`);
  } else {
    res.status(404).send('Evento não encontrado.');
  }
});

// GET - Consultar conteúdos
router.get('/conteudos', (req, res) => {
  const conteudos = lerArquivo(CAMINHOS.conteudo);
  res.json(conteudos);
});

module.exports = router;
