async function renderizarCardsDohUsuario(usuarios, partidas) {
    
    var IdUsuario = await ProcuraIdUsuario();

    var IdPartidasUsuario = usuarios[IdUsuario].partidas;
console.log(IdPartidasUsuario.length)
    for(let i = 0; i < IdPartidasUsuario.length; i++)
    {
    document.getElementById("linha-cards").innerHTML += `
    <div class="card-participar col-sm-6 col-md-4 col-lg-3">
    <div class="card">
      <img src="/codigo/assets/images/Quadracard.jpg" class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column">
        <p class="card-title">Criador: ${partidas[IdPartidasUsuario[i]].Criador}</p>
        <p class="card-text">Esporte: ${partidas[IdPartidasUsuario[i]].Esporte}</p>
        <p class="card-text">Data: ${partidas[IdPartidasUsuario[i]].Data}</p>
        <p class="card-text">Horário: ${partidas[IdPartidasUsuario[i]].Horario}</p>
        <p class="card-text">Jogadores: ${partidas[IdPartidasUsuario[i]].lotacao}/${partidas[IdPartidasUsuario[i]].Jogadores}</p>
        <p class="card-text">Obrigatório: ${partidas[IdPartidasUsuario[i]].Obrigatorio}</p>
        <p class="card-text">Local: ${partidas[IdPartidasUsuario[i]].localizacao}</p>
        <div class="mt-auto d-flex justify-content-end">
          <button type="button" class="openPopupButton btn btn-light ms-auto" id="${partidas[IdPartidasUsuario[i]].id}" data-bs-toggle="modal"
            data-bs-target="#exampleModal">Mais</button>
        </div>
      </div>
    </div>
  </div> 
  `;
  }
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
  function LeLocalStorage(){
    var objdado = "";
    let strdado = localStorage.getItem('db');
  
    if(strdado){
    objdado = JSON.parse(strdado);
    }
    else{
      //teste, retirar esse valor para objdado depois 
      console.log("Usuário não encontrado")   
    };
    
    return objdado;
  }
// "id": 0,
//     "Criador": "João Santos",
//     "Esporte": "Futsal",
//     "Data": "22/11/2024",
//     "Horario": "16h",
//     "Jogadores": 12,
//     "Categoria": "Masculina",
//     "Obrigatorio": "tênis",
//     "lotacao": 12

  async function carregarPaginaMinhasPartidas() {
    abrirCarregamento();
  
    const partidas = await api.get("partidas");
    const usuarios = await api.get("usuarios");
  
    renderizarCardsDohUsuario(usuarios, partidas);
  
    fecharCarregamento();
  
    //clique em participar 
  }
  carregarPaginaMinhasPartidas();



// carregarPagina();

// // vai Gerar os cards de acordo com o id do participante //
// const usuarios = urlPartidas
// const partidas = urlUsuarios

// // Função para obter as partidas do usuário
// function obterPartidasUsuario(userId) {
//     const usuario = usuarios.find(user => user.id === userId);


//     if (usuario) {
//         const partidasUsuario = [];
//         // percorrendo o veotr pra verificar se existe mais ids de usuarios //
//         for (let i = 0; i < usuario.partidas.length; i++) {
//             const partidaId = usuario.partidas[i];
//             const partida = partidas.find(partida => partida.id === partidaId);
//             if (partida) {
//                 partidasUsuario.push(partida);
//             }
//         }
//         return partidasUsuario;
//     } else {
//         return "Usuário não encontrado";
//     };
//  }

//     function criarCardsPartidasUsuario(userId) {
//     const partidasDoUsuario = obterPartidasUsuario(userId);
//     const cardContainer = document.getElementById('linha-cards');

//     // Verifica se o container de cards existe no HTML
//     if (!cardContainer) {
//         console.error('Container de cards não encontrado.');
//         return;
//     }


//     cardContainer.innerHTML = '';

//     // Cria um card para cada partida do usuário com o ID encontrado
//     partidasDoUsuario.forEach(partida => {
//         const cardDiv = document.createElement('div');
//         cardDiv.classList.add('card-participar', 'col-sm-6', 'col-md-4', 'col-lg-3');

//         const card = document.createElement('div');
//         card.classList.add('card');

//         const img = document.createElement('img');
//         img.src = '/codigo/assets/images/Quadracard.jpg';
//         img.classList.add('card-img-top');
//         img.alt = '...';

//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body', 'd-flex', 'flex-column');

//         const createdBy = document.createElement('p');
//         createdBy.classList.add('card-title');
//         createdBy.textContent = `Criado por: ${partida.Criador}`;

//         const players = document.createElement('p');
//         players.classList.add('card-text');
//         players.textContent = `Jogadores: ${partida.lotacao}/${partida.Jogadores}`;

//         const location = document.createElement('p');
//         location.classList.add('card-text');
//         location.textContent = `Local: ${partida.Localizacao}`;

//         const divFlexEnd = document.createElement('div');
//         divFlexEnd.classList.add('mt-auto', 'd-flex', 'justify-content-end');

//         const button = document.createElement('button');
//         button.type = 'button';
//         button.classList.add('openPopupButton', 'btn', 'btn-light', 'ms-auto');
//         button.textContent = 'Mais';
//         button.dataset.bsToggle = 'modal';
//         button.dataset.bsTarget = '#exampleModal';

//         divFlexEnd.appendChild(button);
//         cardBody.appendChild(createdBy);
//         cardBody.appendChild(players);
//         cardBody.appendChild(location);
//         cardBody.appendChild(divFlexEnd);

//         card.appendChild(img);
//         card.appendChild(cardBody);

//         cardDiv.appendChild(card);

//         cardContainer.appendChild(cardDiv);
//     });
// }


