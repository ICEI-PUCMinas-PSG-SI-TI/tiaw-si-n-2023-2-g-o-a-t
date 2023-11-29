/************************* Recuperando os dados das partidas *************************/
const urlPartidas =
  "https://jsonserver-partidas.nayarissonnatan.repl.co/partidas";
var partidas = [];

function LeDadosJSONServer() {
  fetch(urlPartidas)
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      partidas = data;
      console.log("dados carregados!" + partidas[1].Criador);
    });
}

//.then (function(dados) {
//
//
//})

/************************* Programando a abertura do pop-up para cada partida *************************/

var openPopupButtons = document.getElementsByClassName("openPopupButton");
var elementId;

// ouvinte de eventos a cada botão "mais"
Array.from(openPopupButtons).forEach(function (button) {
  button.addEventListener("click", function () {
    // Obtém o id do elemento clicado
    elementId = button.id;

    ValidaInfo();
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

/* var dados = [
  {
    id: 0,
    Criador: "Alex Justos",
    Esporte: "Futsal",
    Data: "18/11/2024",
    Horário: "18h",
    Jogadores: "/12",
    Categoria: "Masculina",
    Obrigatório: "chuteira",
    Jogado:[{
      id1: true},
      {id2: true},
      {id3: true}]
  },
  {
    id: 1,
    Criador: "Maria Silva",
    Esporte: "Futebol",
    Data: "20/11/2024",
    Horário: "19h",
    Jogadores: "/10",
    Categoria: "Feminina",
    Obrigatório: "caneleira",
  },
  {
    id: 2,
    Criador: "João Santos",
    Esporte: "Futsal",
    Data: "22/11/2024",
    Horário: "20h",
    Jogadores: "/8",
    Categoria: "Masculina",
    Obrigatório: "tênis",
  },
  {
    id: 3,
    Criador: "Ana Oliveira",
    Esporte: "Futebol",
    Data: "24/11/2024",
    Horário: "17h",
    Jogadores: "/14",
    Categoria: "Feminina",
    Obrigatório: "chuteira",
  },
  {
    id: 4,
    Criador: "Pedro Lima",
    Esporte: "Futsal",
    Data: "26/11/2024",
    Horário: "21h",
    Jogadores: "/16",
    Categoria: "Masculina",
    Obrigatório: "chuteira",
  },
  {
    id: 5,
    Criador: "Mariana Costa",
    Esporte: "Futebol",
    Data: "28/11/2024",
    Horário: "16h",
    Jogadores: "/6",
    Categoria: "Feminina",
    Obrigatório: "tênis",
  },
  {
    id: 6,
    Criador: "Carlos Mendes",
    Esporte: "Futsal",
    Data: "30/11/2024",
    Horário: "19h",
    Jogadores: "/4",
    Categoria: "Masculina",
    Obrigatório: "caneleira",
  },
  {
    id: 7,
    Criador: "Isabela Oliveira",
    Esporte: "Futebol",
    Data: "02/12/2024",
    Horário: "22h",
    Jogadores: "/9",
    Categoria: "Feminina",
    Obrigatório: "tênis",
  },
];

*/

//função que busca nos dados estruturados a respectiva partida que o usuário deseja
function ValidaInfo() {
  let procura = partidas.length;
  for (let i = 0; i < procura; i++) {
    if (partidas[i].id == elementId) {
      pCriador.textContent = "Criador: " + partidas[i].Criador;
      pEsporte.textContent = "Esporte: " + partidas[i].Esporte;
      pData.textContent = "Data: " + partidas[i].Data;
      pHorario.textContent = "Horário: " + partidas[i].Horário;
      pJogadores.textContent = "Jogadores: " + partidas[i].Jogadores;
      pCategoria.textContent = "Categoria: " + partidas[i].Categoria;
      pObrigatorio.textContent = "Obrigatório: " + partidas[i].Obrigatório;
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
};

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
  appendAlert(mensagemExito, "success");
});
//}
//função para fazer a mensagem desaparecer
console.log(dados[0].Jogado[0]);
/* 
setTimeout(function () {
  notificacao.className = 'alert alert-success alert-dismissible closed.bs.alert';
}, 1000);

*/
