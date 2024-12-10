const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database('meu_banco_de_dados.db');

// Criar as tabelas se não existirem
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  )
`);

// Tabela de posts
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    conteudo TEXT,
    usuario_id INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )
`);

// Tabela de comentários
db.run(`
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conteudo TEXT,
    post_id INTEGER,
    usuario_id INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )
`);

// Tabela de respostas (subcomentários)
db.run(`
  CREATE TABLE IF NOT EXISTS respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conteudo TEXT,
    comentario_id INTEGER,
    usuario_id INTEGER,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comentario_id) REFERENCES comentarios(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )
`);



// Função de inserção no banco com tratamento assíncrono
function insert(nome, email, senha) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    stmt.run(nome, email, senha, function (err) {
      stmt.finalize(); // Finaliza a instrução
      if (err) {
        reject(err); // Retorna o erro em caso de falha
      } else {
        resolve(this.lastID); // Retorna o ID do novo usuário em caso de sucesso
      }
    });
  });
}

// Função para buscar o primeiro registro que corresponda aos critérios
function fetchFirst(db1, sql, params) {
  return new Promise((resolve, reject) => {
    db1.get(sql, params, (err, row) => {
      if (err) {
        return reject(err); // Rejeita a promessa em caso de erro
      }
      resolve(row); // Resolve com o resultado da consulta
    });
  });
}

// Função para encontrar um usuário por nome e senha
async function find(nome, senha) {
  const sql = "SELECT * FROM usuarios WHERE nome = ? AND senha = ?";
  try {
    const user = await fetchFirst(db, sql, [nome, senha]);
    return user; // Retorna o usuário encontrado
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    throw err; // Propaga o erro
  }
}

// Exporta todas as funções e objetos em um único objeto
module.exports = { insert, find, db };
