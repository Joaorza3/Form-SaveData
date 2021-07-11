const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const PORT = 3000

// Instancio o express
const app = express()

// Trata dados enviados via json
app.use(express.json())
    // Permite outros usuários acessarem a api
app.use(cors())

// Requisição do tipo post e como tratá-la
app.post('/', (req, res) => {
    //Pega no corpo da requisição, o elemento com chame 'nome'
    nome = req.body['nome']
    email = req.body['email']

    // Chama a função que guarda os dados no banco
    gravarDados(nome, email)

})

// Servidor ouvindo a porta 3000
app.listen(PORT, () => {
    console.log('Servidor na porta: ', PORT)
})

// Função para guardar os dados nome e email
async function gravarDados(nome, email) {
    // Conecta com o banco de dados local
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'clientes' })

    // Query para inserir dado no banco
    let sql = `INSERT INTO cadastro VALUES (null,? , ?);`
        // Execução da query
    connection.execute(sql, [nome, email])
}