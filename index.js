import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/oi', (req, res) => {
  res.send('Olá, mundo!')
})

const lista = [
  {
    nome: 'Rick Sanchez',
    imagem: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  },
  {
    nome: 'Morty Smith',
    imagem: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  },
  {
    nome: 'Summer Smith',
    imagem: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
  }
]

app.get('/personagens', (req, res) => {
  res.send(lista)
})

app.get('/personagens/:id', (req, res) => {
  const id = req.params.id

  const personagem = lista[id - 1]

  res.send(personagem)
})

// Informo ao Express que o Body da Requisição está em JSON
app.use(express.json())

app.post('/personagens', (req, res) => {
  const novoPersonagem = {
    nome: req.body.nome,
    imagem: req.body.imagem
  }

  lista.push(novoPersonagem)

  res.send("Novo personagem adicionado com sucesso!")
})

app.put('/personagens/:id', (req, res) => {
  const id = req.params.id
  const nomeAtualizado = req.body.nome
  const imagemAtualizada = req.body.imagem

  lista[id - 1] = {
    nome: nomeAtualizado,
    imagem: imagemAtualizada
  }

  res.send("Personagem atualizado com sucesso!")
})

app.delete('/personagens/:id', (req, res) => {
  const id = req.params.id

  lista.splice(id - 1, 1)

  res.send("Personagem removido com sucesso!")
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
