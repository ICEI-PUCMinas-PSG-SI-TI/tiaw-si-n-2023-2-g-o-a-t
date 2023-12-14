carregarPagina();

// vai Gerar os cards de acordo com o id do participante //
const usuarios = urlPartidas
const partidas = urlUsuarios

// Função para obter as partidas do usuário
function obterPartidasUsuario(userId) {
    const usuario = usuarios.find(user => user.id === userId);


    if (usuario) {
        const partidasUsuario = [];
        // percorrendo o veotr pra verificar se existe mais ids de usuarios //
        for (let i = 0; i < usuario.partidas.length; i++) {
            const partidaId = usuario.partidas[i];
            const partida = partidas.find(partida => partida.id === partidaId);
            if (partida) {
                partidasUsuario.push(partida);
            }
        }
        return partidasUsuario;
    } else {
        return "Usuário não encontrado";
    };
 }

    function criarCardsPartidasUsuario(userId) {
    const partidasDoUsuario = obterPartidasUsuario(userId);
    const cardContainer = document.getElementById('linha-cards');

    // Verifica se o container de cards existe no HTML
    if (!cardContainer) {
        console.error('Container de cards não encontrado.');
        return;
    }


    cardContainer.innerHTML = '';

    // Cria um card para cada partida do usuário com o ID encontrado
    partidasDoUsuario.forEach(partida => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-participar', 'col-sm-6', 'col-md-4', 'col-lg-3');

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = '/codigo/assets/images/Quadracard.jpg';
        img.classList.add('card-img-top');
        img.alt = '...';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        const createdBy = document.createElement('p');
        createdBy.classList.add('card-title');
        createdBy.textContent = `Criado por: ${partida.Criador}`;

        const players = document.createElement('p');
        players.classList.add('card-text');
        players.textContent = `Jogadores: ${partida.lotacao}/${partida.Jogadores}`;

        const location = document.createElement('p');
        location.classList.add('card-text');
        location.textContent = `Local: ${partida.Localizacao}`;

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
        cardBody.appendChild(location);
        cardBody.appendChild(divFlexEnd);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardDiv.appendChild(card);

        cardContainer.appendChild(cardDiv);
    });
}


