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

async function carregarPagina() {
    //abrirCarregamento();
    
    const partidas = await api.get("partidas");
    renderizarCards(partidas);
  
    //fecharCarregamento();
  }
  
  carregarPagina();

  