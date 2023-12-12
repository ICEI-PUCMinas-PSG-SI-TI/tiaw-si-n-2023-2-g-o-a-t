User
function salvarDados() {
  // Captura os valores do formulário
  
}

//document.querySelector('.btn-success').addEventListener('click', salvarDados);

function Lewan() {
  var nomePelada = document.querySelector('input[placeholder="Nome da pelada"]').value;
  var tipoQuadra = document.getElementById('inputGroupSelect02').value;
  var valorPelada = document.querySelector('input[placeholder="Digite um valor"]').value;
  var numeroJogadores = document.querySelector('input[placeholder="Quantos jogadores?"]').value;
  var genero = document.getElementById('inputGroupSelect02').value;
  var equipamento = document.querySelector('input[placeholder="Digite um item"]').value;
  var dataHora = document.querySelector('input[placeholder="Data & Hora"]')?.value;
  var cep = document.querySelector('input[placeholder="Digite seu CEP..."]').value;
  var rua = document.querySelector('input[placeholder="Digite sua Rua..."]').value;
  var numero = document.querySelector('input[placeholder="Digite seu numero..."]').value;
  var bairro = document.querySelector('input[placeholder="Digite seu Bairro..."]').value;
  var cidade = document.querySelector('input[placeholder="Digite sua Cidade..."]').value;
  var pais = document.querySelector('input[placeholder="Digite seu País..."]').value;
  var Nome = document.querySelector('input[placeholder="Seu Nome..."]').value;
  var nomeQuadra = document.querySelector('input[placeholder="nome da quadra..."]').value;

  // Verificar se algum campo obrigatório está vazio
  if (
    nomePelada === '' ||
    tipoQuadra === '' ||
    valorPelada === '' ||
    numeroJogadores === '' ||
    genero === '' ||
    equipamento === '' ||
    dataHora === '' ||
    cep === '' ||
    rua === '' ||
    numero === '' ||
    bairro === '' ||
    cidade === '' ||
    pais === '' ||
    Nome === '' ||
    nomeQuadra === ''
    
  ) { 
    alert('Por favor, preencha todos os campos obrigatórios!');
    return 0
    
  } else {
    var dadosPartida = {
      nomePelada: nomePelada,
      tipoQuadra: tipoQuadra,
      valorPelada: valorPelada,
      numeroJogadores: numeroJogadores,
      genero: genero,
      equipamento: equipamento,
      dataHora: dataHora,
      localizacao: {
        cep: cep,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cidade: cidade,
        pais: pais,
        Nome: Nome,
        nomeQuadra: nomeQuadra
      }
    };

    var dadosJSON = JSON.stringify({
      Criador: dadosPartida.nomePelada,
      Esporte: dadosPartida.tipoQuadra,
      Data: dadosPartida.dataHora,
      Horario: "",
      Jogadores: dadosPartida.numeroJogadores,
      Categoria: dadosPartida.genero,
      Obrigatorio: dadosPartida.equipamento,
      lotacao: " "
    });

    localStorage.setItem('dadosPartida', dadosJSON);

    alert('Dados da partida foram salvos no banco de dados com SUCESSO!');
  }



  fetch('https://jsonserver-partidas-1.nayarissonnatan.repl.co/partidas', {
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
  // const newLocal = fetch('https://jsonserver-partidas-1.nayarissonnatan.repl.co/')
  //   .then(response => response.json())
  //   .then(data => {
  //     const cardsDiv = document.getElementById('cards'); // Substituir 'cards' pelo ID do elemento onde deseja carregar os cards, acho que vai ter que ser no body, vou ter que colocar uma div nele//


  //     // Limpa o conteúdo anterior, se houver.
  //     cardsDiv.innerHTML = '';

  //     // Itera sobre os objetos do JSON e cria os cards.
  //     data.forEach((objeto, index) => {
  //       const cardDiv = document.createElement('div');
  //       cardDiv.className = 'card';
  //       cardDiv.style = 'width: 18rem;';

  //       const cardBody = document.createElement('div');
  //       cardBody.className = 'card-body d-flex flex-column';

  //       const titulo = document.createElement('h5');
  //       titulo.className = 'card-title';
  //       titulo.textContent = `Item ${index + 1}`;

  //       // Suponhamos que o JSON tenha uma propriedade 'criadoPor'.
  //       const descricao = document.createElement('p');
  //       descricao.className = 'card-text';
  //       descricao.textContent = `Criado por: ${objeto.criadoPor}`;

  //       // Adicione mais elementos conforme necessário para outras propriedades do seu objeto JSON.
  //       const participarBtn = document.createElement('a');
  //       participarBtn.href = '#';
  //       participarBtn.className = 'btn btn-light ms-auto';
  //       participarBtn.textContent = 'Participar';

  //       cardBody.appendChild(titulo);
  //       cardBody.appendChild(descricao);
  //       cardBody.appendChild(participarBtn);

  //       cardDiv.appendChild(cardBody);
  //       cardsDiv.appendChild(cardDiv);
  //     });
  //   })
  //   .catch(error => console.error('Erro ao carregar dados do JSON:', error));

  // Redirecionamento após o carregamento da página (pode ser removido para redirecionamento imediato)
  
  }
