const express = require('express')
const app = express()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send(`Hello, from ${NODE_ENV}:${PORT}`)
})

app.listen(PORT, () => console.log(`Server on ${NODE_ENV}:${PORT}`))
