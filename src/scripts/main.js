function enviarDados() {

    const url = 'http://localhost:3000/'

    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value

    fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ nome: nome, email: email })
        })
        .then(res => console.log(res))
        .catch(err => {
            if (err) {
                console.log('Erro: ', err)
            }
        })

}