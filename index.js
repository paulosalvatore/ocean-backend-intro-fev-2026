import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/oi', (req, res) => {
  res.send('Olá, mundo!')
})

const lista = ['Rick Sanchez', 'Morty Smith', 'Beth Smith']

app.get('/personagens', (req, res) => {
  res.send(lista)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
