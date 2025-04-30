const express = require('express')// importar modulo express do npm
const app = express()// inicializar o servidor express e salvar variavel app
const PORT = 8000 // separa uma porta para rodar o servidor
app.use(express.json())//fala para o servidor que vai receber dados em JSON
const router_aulas = require('./roteamento/aulas_roteamento')//importa o arquivo de rotas


app.use('', router_aulas)
//criar as minhas rotas

app.listen(PORT, () => {console.log('servidor online')})
