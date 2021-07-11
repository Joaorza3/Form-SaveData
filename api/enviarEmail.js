const nodemailer = require('nodemailer')
const express = require('express')
const cors = require('cors')
const PORT = 3000

// Captura o email e senha, passados pela linha de comando
let meuEmail = process.argv[2]
let minhaSenha = process.argv[3]

const app = express()

app.use(cors())
app.use(express.json())

app.post('/', (req, res) => {
    // Nome e email do cliente
    let nome = req.body['nome']
    let email = req.body['email']

    enviarEmail(nome, email)
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ', PORT)
})

// Enviando email

function enviarEmail(nome, email) {

    // Cria o objeto transportador
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: meuEmail,
            pass: minhaSenha
        }
    })

    // Opções do email
    let mailOptions = {
        from: meuEmail,
        to: meuEmail,
        subject: 'Novo cliente cadastrado!',
        html: '<h1>Novo cliente cadastrado com sucesso!</h1><br/><hr><h3>Nome:' + nome + '</h3><br/><h3>Email: ' + email + '</h3><br/>'
    }

    // Enviando com os dados do cliente
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email enviado com sucesso para: ', meuEmail, '\n', info.response)
        }
    })
}