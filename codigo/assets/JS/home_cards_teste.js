function renderizarCards(partidas) {
  const html = partidas.reduce((acc, partidas) => {
    acc += `
      <div class="card-participar col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="/codigo/assets/images/Quadracard.jpg" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column">
          <p class="card-title">Criado por: ${partidas.Criador}</p>
          <p class="card-text">Jogadores: ${partidas.lotacao}/${partidas.Jogadores}</p>
          <p class="card-text">Local: ${partidas.localizacao}</p>
          <div class="mt-auto d-flex justify-content-end">
            <button type="button" class="openPopupButton btn btn-light ms-auto" id="${partidas.id}" data-bs-toggle="modal"
              data-bs-target="#exampleModal">Mais</button>
          </div>
        </div>
      </div>
    </div> 
    `;

    return acc;
  }, "");

  document.getElementById("linha-cards").innerHTML = html;
}



function AbrirPopup() {
  Array.from(openPopupButtons).forEach(function (button) {
    button.addEventListener("click", function () {
      // Obtém o id do elemento clicado
      elementId = button.id;
      console.log(elementId);
      ValidaInfoID();
    });
  });
}



function ValidaInfoID() {
  let procura = partidas.length;
  
  // Obtendo referências para os parágrafos
var pCriador = document.getElementById("p-criador");
var pEsporte = document.getElementById("p-esporte");
var pData = document.getElementById("p-data");
var pHorario = document.getElementById("p-horario");
var pJogadores = document.getElementById("p-jogadores");
var pCategoria = document.getElementById("p-categoria");
var pObrigatorio = document.getElementById("p-obrigatorio");
  
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


function LeLocalStorage(){
  var objdado = "";
  let strdado = localStorage.getItem('db');

  if(strdado){
  objdado = JSON.parse(strdado);
  }
  else{
    //teste, retirar esse valor para objdado depois 
    objdado =  { usuarioAtual: [ 
                  {email: "admin@abc.com"} 
  ]};
  console.log("o dado padrão para teste foi carregado " + objdado.usuarioAtual[0].email)
  }
  return objdado;
}


async function ProcuraIdUsuario() {
  var NovoParticipante; 

  let objdado = await LeLocalStorage();

  console.log(objdado)

  LeDadosUsuarios();
  
  let procura = usuarios.length;
  let usuarioEncontrado = false;
  for (let i = 0; i < procura; i++) {

    if (usuarios[i].email == objdado.email) {
      console.log("usuário encontrado, id: " + usuarios[i].id);
      usuarioEncontrado = true;
      NovoParticipante = usuarios[i].id;
    }
  }

  if(!usuarioEncontrado) {
    console.log("Usuário não encontrado");
  }

  return NovoParticipante;
}

function ClicarParticipar(){ 
  
  alertTrigger.addEventListener("click", async () => {
    
  let NovoParticipante = await ProcuraIdUsuario();
  
  abrirCarregamento();
  await AtualizaPartidasUsuario(NovoParticipante, elementId);
  fecharCarregamento();
  var mensagemExito =  "<strong>Legal, agora você está participando da partida!</strong>";
  var mensagemFalha = "<strong>Ops, parece que a partida já está cheia!</strong>";

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
}

async function carregarPagina() {
  abrirCarregamento();

  const partidas = await api.get("partidas");
  const usuarios = await api.get("usuarios");

  renderizarCards(partidas);
  AbrirPopup();

  fecharCarregamento();

  //clique em participar 
  
ClicarParticipar();
}

carregarPagina();