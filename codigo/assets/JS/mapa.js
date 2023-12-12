function initMap() {
    // Coordenadas para o centro do mapa (por exemplo, São Paulo)
    var center = { lat: -23.5505, lng: -46.6333 };

    // Opções do mapa
    var mapOptions = {
      center: center,
      zoom: 12 // Zoom inicial
    };

    // Elemento onde o mapa será renderizado
    var mapElement = document.getElementById('map');

    // Criar o mapa
    var map = new google.maps.Map(mapElement, mapOptions);
    
    // Adicionar um marcador
    var marker = new google.maps.Marker({
      position: center,
      map: map,
      title: 'Localização'
    });
  }