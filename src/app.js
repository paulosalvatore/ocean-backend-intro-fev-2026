import express from 'express'
import personagensRoutes from './routes/personagensRoutes.js'

const app = express()

// Informo ao Express que o Body da Requisição está em JSON
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/oi', (req, res) => {
  res.send('Olá, mundo!')
})

app.use('/personagens', personagensRoutes)

export default app
