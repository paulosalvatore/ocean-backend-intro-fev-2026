import {
  getAll,
  getById,
  create,
  update,
  remove,
  isValidId
} from '../models/personagensModel.js'

const isNonEmptyString = (valor) => typeof valor === 'string' && valor.trim()

const validarPersonagem = (req, res) => {
  const { nome, imagem } = req.body

  if (!isNonEmptyString(nome) || !isNonEmptyString(imagem)) {
    res.status(400).send('Informe nome e imagem validos.')
    return false
  }

  return true
}

const obterId = (req, res) => {
  const id = Number(req.params.id)

  if (!isValidId(id)) {
    res.status(404).send('Personagem nao encontrado.')
    return null
  }

  return id
}

const listar = (req, res) => {
  res.send(getAll())
}

const buscarPorId = (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  res.send(getById(id))
}

const criar = (req, res) => {
  if (!validarPersonagem(req, res)) {
    return
  }

  create({
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  res.send('Novo personagem adicionado com sucesso!')
}

const atualizar = (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  if (!validarPersonagem(req, res)) {
    return
  }

  update(id, {
    nome: req.body.nome,
    imagem: req.body.imagem
  })

  res.send('Personagem atualizado com sucesso!')
}

const remover = (req, res) => {
  const id = obterId(req, res)

  if (!id) {
    return
  }

  remove(id)

  res.send('Personagem removido com sucesso!')
}

export { listar, buscarPorId, criar, atualizar, remover }
