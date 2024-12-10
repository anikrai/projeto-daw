const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt'); // Para hash de senhas
const sqlite3 = require('sqlite3').verbose(); // Banco de dados SQLite

const methodOverride = require('method-override');


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Arquivos estáticos (CSS, imagens, etc.)
app.use(methodOverride('_method'));
// Conectar ao banco de dados
const db = new sqlite3.Database('meu_banco_de_dados.db');

// Criar a tabela de usuários, se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT
    )
  `);
});

// Função para inserir um novo usuário
function insert(nome, email, senha) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    stmt.run(nome, email, senha, function (err) {
      stmt.finalize();
      if (err) return reject(err); // Tratamento de erro
      resolve(this.lastID); // Retorna o ID do novo usuário
    });
  });
}

// Função para buscar um usuário pelo nome
function findByUsername(username) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM usuarios WHERE nome = ?";
    db.get(sql, [username], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

// Rota GET: Tela de configuração
app.get('/config', (req, res) => res.render('config.ejs'));

// Rota GET: Página inicial
app.get('/', (req, res) => res.render('home.ejs'));

// Rota GET: Tela de cadastro
app.get('/cadastro', (req, res) => {
  const { error } = req.query; // Captura mensagem de erro, se houver
  res.render('cadastro.ejs', { error }); // Passa erro para a view
});

// Rota POST: Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, senha2 } = req.body;

  // Verifica se as senhas coincidem
  if (senha !== senha2) {
    return res.redirect('/cadastro?error=Senhas diferentes');
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10); // Cria hash da senha
    await insert(nome, email, hashedPassword); // Insere no banco
    res.redirect('/login'); // Redireciona para login após sucesso
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      // Trata erro de email duplicado
      return res.redirect('/cadastro?error=Email já cadastrado');
    }
    console.error('Erro ao inserir no banco:', err);
    res.status(500).json({ error: 'Erro ao inserir no banco de dados' });
  }
});
app.get('/forum', (req, res) => {
  const sql = `
    SELECT p.id, p.titulo, p.conteudo, u.nome AS autor, p.data_criacao
    FROM posts p
    JOIN usuarios u ON p.usuario_id = u.id
    ORDER BY p.data_criacao DESC
  `;
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  db.all(sql, [], (err, posts) => {
    if (err) {
      console.error('Erro ao carregar posts:', err);
      return res.status(500).json({ error: 'Erro ao carregar posts' });
    }
    res.render('forum.ejs', { posts });
  });
});
app.get('/postagem', (req, res) => {
  res.render("postagem");
});
// Rota POST: Cria um novo post
app.post('/postagem', (req, res) => {
  const { titulo, conteudo } = req.body;
  const usuario_id = 15
  const sql = "INSERT INTO posts (titulo, conteudo, usuario_id) VALUES (?, ?, ?)";
  console.log("ABobra");
  db.run(sql, [titulo, conteudo, usuario_id], function (err) {
    if (err) {
      console.error('Erro ao criar post:', err);
      return res.status(500).json({ error: 'Erro ao criar post' });
    }
    res.redirect('/postagems');
  });
});

app.get('/postagems', (req, res) => {
  const sql = "SELECT * FROM posts";

  // Usando db.all() para recuperar os dados
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar posts:', err);
      return res.status(500).json({ error: 'Erro ao buscar posts' });
    }

    // Enviando os dados para a renderização
    res.render('postagems', { posts: rows });
  });
});

app.delete('/postagems/:id', (req,res)=>{
  const {id} = req.params

  const sql = "DELETE FROM posts WHERE id = ? "

  console.log(id)
  db.all(sql, [id], (err) => {
    if (err) {
      console.error('Erro ao buscar posts:', err);
      return res.status(500).json({ error: 'Erro ao buscar posts' });
    }
    console.log(id)
    // Enviando os dados para a renderização
    res.redirect('/postagems' )
  });
})

app.post('/EditarPostagems/:id', (req,res)=>{
  const {id} = req.params

  res.render('EditarPostagem', {id})
})





app.patch('/EditarPostagems/:id', (req, res) => {
  const { id } = req.params; // Get the id from the URL
  const {titulo, conteudo} = req.body

  const sql = "UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?";

  db.run(sql, [titulo, conteudo, id], function (err) {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ error: 'Error deleting post' });
    }

    res.redirect('/postagems' )
  });
});



// // Rota POST: Cria um novo post
// app.post('/forum', (req, res) => {
//   const { titulo, conteudo, usuario_id } = req.body;
//   const sql = "INSERT INTO posts (titulo, conteudo, usuario_id) VALUES (?, ?, ?)";
//   console.log("ABobra");
//   db.run(sql, [titulo, conteudo, usuario_id], function (err) {
//     if (err) {
//       console.error('Erro ao criar post:', err);
//       return res.status(500).json({ error: 'Erro ao criar post' });
//     }
//     res.redirect('/forum');
//   });
// });

// Rota GET: Tela de login
app.get('/login', (req, res) => res.render('login.ejs'));
app.get('/posts', (req, res) => res.render('posts.ejs'));
app.get('/posthist', (req, res) => res.render('postdehistoria.ejs'));
app.get('/detail', (req, res) => res.render('detail.ejs'));
app.get('/hist', (req, res) => res.render('historias.ejs'));

// Rota POST: Autenticação de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsername(username); // Busca usuário no banco
    if (!user || !(await bcrypt.compare(password, user.senha))) {
      return res.redirect('/erroDeLogin'); // Redireciona se falhar
    }
    res.render('forum.ejs', { user }); // Renderiza fórum com usuário logado
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Rota GET: Página de erro de login
app.get('/erroDeLogin', (req, res) => {
  res.send('<h1>ERRO: Usuário ou senha incorretos</h1>');
});

// Inicializa o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
