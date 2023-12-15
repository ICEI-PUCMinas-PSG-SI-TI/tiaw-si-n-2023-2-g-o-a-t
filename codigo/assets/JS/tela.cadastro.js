var ultimoId = parseInt(localStorage.getItem('ultimoID')) || 0;

function salvarDados() {
  // Captura os valores do formulário
  ultimoId++;
}

function CR7( ) {
  var nomeUsuario = document.getElementById('nomeUser').value;
  var dataNasc = document.getElementById('dataNasc').value;
  var genero = document.getElementById('selGenero').value;
  var telefone = document.getElementById('tel').value;
  var user = document.getElementById('user').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
  var confirmaSenha = document.getElementById('confirmaSenha').value;

  // Verificar se algum campo obrigatório está vazio
  if (
    nomeUsuario === '' ||
    dataNasc === '' ||
    genero === '' ||
    telefone === '' ||
    user === '' ||
    email === '' ||
    senha === '' ||
    confirmaSenha === ''
  ) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return 0;
  } else {
    var dadosUsuario = {
      id: ultimoId,
      nomeUsuario: nomeUsuario,
      dataNasc: dataNasc,
      genero: genero,
      telefone: telefone,
      user: user,
      email: email,
      senha: senha,
      confirmaSenha: confirmaSenha
    };
    var dadosJSON11 = JSON.stringify({email: dadosUsuario.email})

    var dadosJSON = JSON.stringify({
      id: dadosUsuario.id,
      user: dadosUsuario.user,
      senha: dadosUsuario.senha,
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      partidas: []
    });

    localStorage.setItem('dadosUsuario', dadosJSON11);
    localStorage.setItem('ultimoID', ultimoId);

    alert('Dados da partida foram salvos no banco de dados com SUCESSO!');

    fetch('https://jsonserver-partidas-1.nayarissonnatan.repl.co/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: dadosJSON
    })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta do servidor:', data);
        window.location.href = 'http://127.0.0.1:5500/codigo/pages/home_pos_login.html';
      })
      .catch(error => {
        console.error('Erro ao fazer POST:', error);
      });
  }
}
