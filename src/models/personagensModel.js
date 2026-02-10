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

const getAll = () => lista

const getById = (id) => lista[id - 1]

const create = (personagem) => {
  lista.push(personagem)
  return personagem
}

const update = (id, personagem) => {
  lista[id - 1] = personagem
  return personagem
}

const remove = (id) => {
  const removidos = lista.splice(id - 1, 1)
  return removidos[0]
}

const isValidId = (id) => Number.isInteger(id) && id >= 1 && id <= lista.length

export { getAll, getById, create, update, remove, isValidId }
