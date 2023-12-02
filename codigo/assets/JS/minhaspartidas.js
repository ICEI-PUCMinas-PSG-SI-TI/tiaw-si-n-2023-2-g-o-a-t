// Quando a página é carregada, atribuímos o modal a uma variável.
const modal = document.getElementById("myModal");


// Quando o botão "Cancelar participação" é clicado, mostramos o modal.
document.querySelectorAll('.btn-primary').forEach(function(cancelButton) {
  cancelButton.addEventListener("click", function() {
    modal.style.display = "block";
     // Armazene o ID da partida no armazenamento local quando o botão é clicado.
     const partidaId = cancelButton.getAttribute("data-partida-id");
     localStorage.setItem("partidaCancelada", partidaId);
   });
 });

// Quando o botão "X" no modal é clicado, fechamos o modal.
const closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Quando o botão "Sim" no modal é clicado, você pode adicionar sua lógica para cancelar a participação.
const confirmCancel = document.getElementById("confirmCancel");
confirmCancel.addEventListener("click", function() {
  
  // Recupere o ID da partida que foi armazenado no armazenamento local.
  const partidaCancelada = localStorage.getItem("partidaCancelada");
  if (partidaCancelada) {
  console.log("Cancelar participação da partida com ID " + partidaCancelada);
  // Adicione a classe "partida-cancelada" ao card da partida para ocultá-lo.
  const cardPartidaCancelada = document.querySelector(`[data-partida-id="${partidaCancelada}"]`);
  if (cardPartidaCancelada) {
    cardPartidaCancelada.classList.add("partida-cancelada");
    cardPartidaCancelada.remove();
  }
  // Armazene a informação de cancelamento no armazenamento local.
  const partidasCanceladas = JSON.parse(localStorage.getItem("partidasCanceladas")) || [];
  partidasCanceladas.push(partidaCancelada);
  localStorage.setItem("partidasCanceladas", JSON.stringify(partidasCanceladas));

  localStorage.removeItem("partidaCancelada");
  modal.style.display = "none";
}
});

// Quando o botão "Cancelar" no modal é clicado, fechamos o modal.
const cancelCancel = document.getElementById("cancelCancel");
cancelCancel.addEventListener("click", function() {
  localStorage.removeItem("partidaCancelada");
  modal.style.display = "none";
});

// Quando a página é carregada, carregue a lista de partidas canceladas e processe o cancelamento.
window.addEventListener("load", function() {
  const partidaCancelada = localStorage.getItem("partidaCancelada");
  if (partidaCancelada) {
    console.log("Cancelar participação da partida com ID " + partidaCancelada);
  }
});

// Quando o botão "Cancelar participação" é clicado
document.querySelectorAll('.cancel-button').forEach(function(cancelButton) {
  cancelButton.addEventListener("click", function() {
    // Recupere o data-partida-id da partida
    const partidaId = cancelButton.getAttribute("data-partida-id");
    
    // Adicione sua lógica para cancelar a participação com base no partidaId
    // Por exemplo, você pode fazer uma solicitação ao servidor para processar o cancelamento.
    console.log("Cancelar participação da partida com ID " + partidaId);
  });
});

// Nova funcionalidade: Alterar Status
document.querySelectorAll('.alterar-status').forEach(function (alterarStatusButton) {
    alterarStatusButton.addEventListener("click", async function () {
      const partidaId = alterarStatusButton.getAttribute("data-partida-id");
      const statusElement = document.querySelector(`[data-partida-id="${partidaId}"] .status-partida`);
  
      // Recupere as informações do usuário autenticado
      const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado"));
  
      // Simule uma solicitação ao JSON Server para obter as informações da partida
      const response = await fetch(`https://jsonserver-partidas.nayarissonnatan.repl.co/partidas/${partidaId}`);
      const partida = await response.json();
  
      // Verifique se o usuário autenticado é o criador da partida antes de permitir a alteração de status
      if (usuarioAutenticado.id === partida.criadorId) {
        // Simule a alteração de status pelo criador
        const novoStatus = statusElement.textContent === "Confirmada" ? "Cancelada" : "Confirmada";
  
        // Atualize o status da partida no JSON Server
        await fetch(`https://jsonserver-partidas.nayarissonnatan.repl.co/partidas/${partidaId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: novoStatus })
        });
  
        // Simule uma notificação aos participantes sobre a alteração de status
        alert(`Status da Partida com ID ${partidaId} alterado para: ${novoStatus}`);
      } else {
        alert("Você não tem permissão para alterar o status desta partida.");
      }
    });
  });
  
  // ...
  
  // Quando o botão "Cancelar Partida" é clicado
  document.querySelectorAll('.cancel-button').forEach(function(cancelButton) {
    cancelButton.addEventListener("click", async function() {
      const partidaId = cancelButton.getAttribute("data-partida-id");
  
      // Recupere as informações do usuário autenticado
      const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado"));
  
      // Simule uma solicitação ao JSON Server para obter as informações da partida
      const response = await fetch(`https://jsonserver-partidas.nayarissonnatan.repl.co/partidas/${partidaId}`);
      const partida = await response.json();
  
      // Verifique se o usuário autenticado é o criador da partida antes de cancelar
      if (usuarioAutenticado.id === partida.criadorId) {
        // Simule o cancelamento da própria partida pelo criador
        const novoStatus = "Cancelada";
  
        // Atualize o status da partida no JSON Server
        await fetch(`https://jsonserver-partidas.nayarissonnatan.repl.co/partidas/${partidaId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: novoStatus })
        });
  
        // Simule uma notificação aos participantes sobre o cancelamento da partida
        alert(`Partida com ID ${partidaId} cancelada pelo criador`);
      } else {
        // Simule uma solicitação ao JSON Server para cancelar a participação do usuário
        await fetch(`https://jsonserver-partidas.nayarissonnatan.repl.co/participacoes?partidaId=${partidaId}&usuarioId=${usuarioAutenticado.id}`, {
          method: 'DELETE'
        });
  
        // Simule uma notificação ao usuário sobre o cancelamento da participação
        alert(`Sua participação na Partida com ID ${partidaId} foi cancelada.`);
      }
  
      // Remova o card da partida do DOM
      const cardPartida = document.querySelector(`[data-partida-id="${partidaId}"]`);
      if (cardPartida) {
        cardPartida.remove();
      }
    });
  });
  




// JSON.

const jsonFileURL = "https://jsonserver-partidas.nayarissonnatan.repl.co/";
function loadJSON() {
  fetch(jsonFileURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const cardContainer = document.querySelector('.row');
      data.forEach(partida => {
        const card = createCard(partida);
        cardContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao carregar dados JSON:", error);
    });
}

function createCard(partida) {
  // Criação de cartão conforme necessário
}

// Chame a função para carregar o JSON quando a página for carregada
window.addEventListener("load", loadJSON);