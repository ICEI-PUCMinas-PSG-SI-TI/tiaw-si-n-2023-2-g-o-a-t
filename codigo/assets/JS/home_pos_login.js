/************************* Métodos os dados das partidas *************************/
const urlPartidas =
  "https://jsonserver-partidas-1.nayarissonnatan.repl.co/partidas";
var partidas = [];

async function LeDadosJSONServer() {

  const req = await fetch(urlPartidas)
  const partidasJson = await req.json()

  partidas = partidasJson;
  // fetch(urlPartidas)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     partidas = data;
  //     console.log("dados carregados!" + partidas[1].Criador);
  //   });

}
LeDadosJSONServer()


/************************* Atualizando a lotacao das partidas *************************/

async function AtualizaLotacao(id) {
  await LeDadosJSONServer()
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
          console.log("Contato alterado com sucesso");
      })
      .catch(error => {
          console.log('Erro ao atualizar contato via API JSONServer');
      });
      console.log(somaLotacao)
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

/*********************************** Programando o botão de participar ***********************************/
//exemplo teste: buscar o id do usuário para cadastrar ele na partida
//Obs.: o id deve ser guardado no localstorage a partir da tela de login

//fim do teste

//puxa o id do usuário

/*********************************** Programando a Notificação ***********************************/

//código para abrir as notificações de êxito

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mb-1" role="alert" id="notificacao">`,
    `   <div><i class="fa-sharp fa-solid fa-circle-check fa-lg me-2"></i>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}

/*   implementar após a junção do código do trablho

const VerificaLotacao = () => {
  let mensagemExito = "Legal, agora você está participando da partida!";
  let mensagemFalha = "Ops, parece que a partida já está cheia!";
  if(VerificaLotacao){
    return mensagemExito;
  }
  else{
    return mensagemFalha
  }
}
*/

//função para inserir a mensagem e o tipo de alerta que será exibido
const alertTrigger = document.getElementById("participar");
const notificacao = document.getElementById("notificacao");
// if (alertTrigger) {
let mensagemExito =
  "<strong>Legal, agora você está participando da partida!</strong>";
// let mensagemFalha = "Ops, parece que a partida já está cheia!";

alertTrigger.addEventListener("click", () => {
  AtualizaLotacao(elementId)
  appendAlert(mensagemExito, "success");
});
//}