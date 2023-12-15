/************************* Métodos os dados das partidas *************************/
var  urlPartidas;
urlPartidas ="https://jsonserver-partidas-1.nayarissonnatan.repl.co/partidas";

var partidas = [];

async function LeDadosPartidas(){

  const req = await fetch(urlPartidas)
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




//função que busca nos dados estruturados a respectiva partida que o usuário deseja


//descobrindo quem está acessando o site para guardar as partidas que ele está participando no JSONServer



//descobrindo o id de usuário pelo seu email



/*********************************** Programando o botão de participar ***********************************/


/*********************************** Programando a Notificação ***********************************/

//código para abrir as notificações de êxito

var alertPlaceholder = document.getElementById("liveAlertPlaceholder");
var appendAlert =  (message, type, icon) => {
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
var alertTrigger = document.getElementById("participar");
var notificacao = document.getElementById("notificacao");






