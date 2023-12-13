/************************* Métodos os dados das partidas *************************/
var  urlPartidas;
urlPartidas ="https://jsonserver-partidas-1.nayarissonnatan.repl.co/partidas";

var partidas = [];

async function LeDadosPartidas() {

  const req = await fetch("https://jsonserver-partidas-1.nayarissonnatan.repl.co/partidas")
  const partidasJson = await req.json()

  partidas = partidasJson;

}
LeDadosPartidas()

//Obtendo os usuários cadastrados no site pelo JSONServer
var urlUsuarios;
urlUsuarios =  "https://jsonserver-partidas-1.nayarissonnatan.repl.co/usuarios";
var usuarios = [];

async function LeDadosUsuarios() {

  const res = await fetch(urlUsuarios)
  const usuariosJson = await res.json()

  usuarios = usuariosJson;

}
LeDadosUsuarios()


/************************* Atualizando a lotacao das partidas *************************/

async function AtualizaLotacao(id) {
  await LeDadosPartidas()
  
  let somaLotacao = partidas[id].lotacao;
  console.log(partidas[id].Horario)

  var altera = {
    id: id,
    Criador: partidas[id].Criador,
    Esporte: partidas[id].Esporte,
    Data: partidas[id].Data,
    Horario: partidas[id].Horario,
    Jogadores: partidas[id].Jogadores,
    Categoria: partidas[id].Categoria,
    Obrigatorio: partidas[id].Obrigatorio,
    lotacao: somaLotacao += 1
  };
  fetch(`${urlPartidas}/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(altera)
  })
      .then(response => {
        if(!response.ok){
          console.log("err"); 
          return;
        }
        response.json();
      })
      
          .then(data => {
          console.log("Lotação alterada com sucesso");
      })
      .catch(error => {
          console.log('Erro ao atualizar contato via API JSONServer');
      });
      console.log(somaLotacao)
}

//atualiza as partidas que o usuário está participando
var atualizapartidas = [];
var ComEspaco = false;

async function AtualizaPartidasUsuario(IdUsuario, IdPartida) {
  await LeDadosUsuarios();

  let indice = IdUsuario - 1;
  let tamvetor = usuarios[indice].partidas.length;
  let jaParticipa = false;

if(partidas[IdPartida].lotacao < partidas[IdPartida].Jogadores)
{
  ComEspaco = true;
  for(let i = 0; i <= tamvetor; i++){
      if(i < tamvetor){
    atualizapartidas[i] = usuarios[indice].partidas[i];
          
        if(usuarios[indice].partidas[i] == parseInt(IdPartida, 10))
        {
          jaParticipa = true;
        }
      }
      
      else if(i === tamvetor && !jaParticipa){
      atualizapartidas[i] = parseInt(IdPartida, 10);
    }
   
}

console.log(atualizapartidas)
  
var alteraPartidas = {
    id: IdUsuario,
    login: usuarios[indice].login,
    senha: usuarios[indice].senha,
    nome: usuarios[indice].nome,
    email: usuarios[indice].email,
    partidas: atualizapartidas
  };
  fetch(`${urlUsuarios}/${IdUsuario}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(alteraPartidas)
  })
      .then(response => {
        if(!response.ok){
          console.log("err"); 
          return;
        }
        return response.json();
      })
          .then(data => {
          console.log("Usuário participando com sucesso");
      })
      .catch(error => {
          console.log('Erro ao atualizar contato via API JSONServer');
      });
    }
    else{
      ComEspaco = false;
    }
}

/************************* Programando a abertura do pop-up para cada partida *************************/

var openPopupButtons = document.getElementsByClassName("openPopupButton");
var elementId;

// ouvinte de eventos a cada botão "mais"
Array.from(openPopupButtons).forEach(function (button) {
  button.addEventListener("click", function () {
    // Obtém o id do elemento clicado
    elementId = button.id;

    ValidaInfoID();
  });
});

// Obtendo referências para os parágrafos
var pCriador = document.getElementById("p-criador");
var pEsporte = document.getElementById("p-esporte");
var pData = document.getElementById("p-data");
var pHorario = document.getElementById("p-horario");
var pJogadores = document.getElementById("p-jogadores");
var pCategoria = document.getElementById("p-categoria");
var pObrigatorio = document.getElementById("p-obrigatorio");


//função que busca nos dados estruturados a respectiva partida que o usuário deseja
function ValidaInfoID() {
  let procura = partidas.length;
  for (let i = 0; i < procura; i++) {
    if (partidas[i].id == elementId) {
      pCriador.textContent = "Criador: " + partidas[i].Criador;
      pEsporte.textContent = "Esporte: " + partidas[i].Esporte;
      pData.textContent = "Data: " + partidas[i].Data;
      pHorario.textContent = "Horário: " + partidas[i].Horario;
      pJogadores.textContent = "Jogadores: " + partidas[i].Jogadores;
      pCategoria.textContent = "Categoria: " + partidas[i].Categoria;
      pObrigatorio.textContent = "Obrigatório: " + partidas[i].Obrigatorio;
      procura = i;
    }
  }
}

//descobrindo quem está acessando o site para guardar as partidas que ele está participando no JSONServer
var objdado = "";
function LeLocalStorage(){
  let strdado = localStorage.getItem('db');

  if(strdado){
  objdado = strdado;
  }
  else{
    //teste, retirar esse valor para objdado depois 
    objdado = "admin@abc.com";
    //console.log("o dado padrão para teste foi carregado " + objdado.usuario[0].email)
  }
  return objdado;
}
LeLocalStorage();

//descobrindo o id de usuário pelo seu email
var NovoParticipando; 
async function ProcuraIdUsuario() {
  await LeDadosUsuarios();
  let procura = usuarios.length;
  let usuarioEncontrado = false;
  for (let i = 0; i < procura; i++) {

    if (usuarios[i].email == objdado) {
      console.log("usuário encontrado, id: " + usuarios[i].id);
      usuarioEncontrado = true;
      NovoParticipando = usuarios[i].id;
    }
  }

  if(!usuarioEncontrado) {
    console.log("Usuário não encontrado");
  }

  return NovoParticipando;
}
/*********************************** Programando o botão de participar ***********************************/


/*********************************** Programando a Notificação ***********************************/

//código para abrir as notificações de êxito

var alertPlaceholder;
alertPlaceholder = document.getElementById("liveAlertPlaceholder");
var appendAlert;
appendAlert =  (message, type, icon) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mb-1" role="alert" id="notificacao">`,
    `   <div><i class="${icon} fa-lg me-2"></i>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}

//função para inserir a mensagem e o tipo de alerta que será exibido
var alertTrigger; 
alertTrigger = document.getElementById("participar");
var notificacao;
notificacao = document.getElementById("notificacao");

var mensagemExito =
  "<strong>Legal, agora você está participando da partida!</strong>";

var mensagemFalha = "<strong>Ops, parece que a partida já está cheia!</strong>";;

alertTrigger.addEventListener("click", async () => {
  await ProcuraIdUsuario();
  await AtualizaPartidasUsuario(NovoParticipando, elementId);
  
  if(ComEspaco)
  {
    AtualizaLotacao(elementId);
    appendAlert(mensagemExito, "success", "fa-sharp fa-solid fa-circle-check");
  }
  else
  {
    appendAlert(mensagemFalha, "primary", "fa-solid fa-circle-info");
  }
});


/************************* Criando os cards na home *************************/
/*
function LeDadosJSONServer() {
  fetch(urlPartidas)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      partidas = data;
      console.log("dados carregados!" + partidas[1].Criador);
      for (let partida = 0; partida < partidas.length; partida++) {
        const element = partidas[partida];
        const newCard = createCard({criador: element.Criador, jogadores: element.Jogadores})
        const cardContainer = document.getElementById('linha-cards');
        cardContainer.appendChild(newCard);
      }
    });
}
LeDadosJSONServer()

function createCard(info) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card-participar', 'col-sm-6', 'col-md-4', 'col-lg-3');
  const card = document.createElement('div');
  card.classList.add('card');
  const img = document.createElement('img');
  img.src = '/codigo/assets/images/Quadracard.jpg';
  img.classList.add('card-img-top');
  img.alt = '...';
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'h-100');
  const createdBy = document.createElement('p');
  createdBy.classList.add('card-title', 'mb-0');
  createdBy.textContent = 'Criado por: ' + info.criador;
  const players = document.createElement('p');
  players.classList.add('card-text', 'mb-0');
  players.textContent = info.jogadores + ' jogadores.';
  const divFlexEnd = document.createElement('div');
  divFlexEnd.classList.add('mt-auto', 'd-flex', 'justify-content-end');
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('openPopupButton', 'btn', 'btn-light', 'ms-auto');
  button.textContent = 'Mais';
  button.dataset.bsToggle = 'modal';
  button.dataset.bsTarget = '#exampleModal';
  divFlexEnd.appendChild(button);
  cardBody.appendChild(createdBy);
  cardBody.appendChild(players);
  cardBody.appendChild(divFlexEnd);
  card.appendChild(img);
  card.appendChild(cardBody);
  cardDiv.appendChild(card);
  return cardDiv;
}
*/

