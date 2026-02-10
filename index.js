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

const isNonEmptyString = (valor) => typeof valor === 'string' && valor.trim()

const validarPersonagem = (req, res) => {
  const { nome, imagem } = req.body

  if (!isNonEmptyString(nome) || !isNonEmptyString(imagem)) {
    res.status(400).send('Informe nome e imagem válidos.')
    return false
  }

  return true
}

const obterId = (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id < 1 || id > lista.length) {
    res.status(404).send('Personagem não encontrado.')
    return null
  }

  return id
}

app.get('/personagens', (req, res) => {
  res.send(lista)
})

app.get('/personagens/:id', (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  const personagem = lista[id - 1]

  res.send(personagem)
})

// Informo ao Express que o Body da Requisição está em JSON
app.use(express.json())

app.post('/personagens', (req, res) => {
  if (!validarPersonagem(req, res)) {
    return
  }

  const novoPersonagem = {
    nome: req.body.nome,
    imagem: req.body.imagem
  }

  lista.push(novoPersonagem)

  res.send("Novo personagem adicionado com sucesso!")
})

app.put('/personagens/:id', (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  if (!validarPersonagem(req, res)) {
    return
  }

  const nomeAtualizado = req.body.nome
  const imagemAtualizada = req.body.imagem

  lista[id - 1] = {
    nome: nomeAtualizado,
    imagem: imagemAtualizada
  }

  res.send("Personagem atualizado com sucesso!")
})

app.delete('/personagens/:id', (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  lista.splice(id - 1, 1)

  res.send("Personagem removido com sucesso!")
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
