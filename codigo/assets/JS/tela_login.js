
var submeterLogin = document.getElementById("submit")

submeterLogin.addEventListener("click", () => 
{
    let email = document.getElementById("email").value;
    if(email !== "")
    {
    var usuarioAtual = {
        email: email
    }
    }
    salvaDados(usuarioAtual)

});

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Validação do campo "Email" e "Senha"
    if (email === "" || senha === "") {
        alert("Preencha todos os campos.");
        return;
    }

    var usuario = {
        email: email,
        senha: senha
    };

    var jsonUsuario = JSON.stringify(usuario);
    console.log(jsonUsuario);
}