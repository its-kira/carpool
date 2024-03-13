document.addEventListener('DOMContentLoaded', function () {
  var map;
  var userLatLng; // Stocker la position de l'utilisateur
  var routingControl; // Variable pour stocker le contrôle de routage actuel

  function initMap() {
    if (typeof map !== 'undefined') {
      map.off();
      map.remove();
    }

    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    map.zoomControl.remove();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

        var markerContainer = L.divIcon({
          className: 'custom-marker-container',
          html: '<div class="pulse-ring"></div><div class="custom-marker">🙍‍♂️</div>',
          iconSize: [100, 100],
        });

        L.marker(userLatLng, { icon: markerContainer }).addTo(map);

        map.setView(userLatLng, 15);

        // Ajouter l'écouteur d'événements pour le clic sur la carte
        map.on('click', function(e) {
          if (routingControl != undefined) {
            map.removeControl(routingControl);
          }
          routingControl = L.Routing.control({
            waypoints: [
              userLatLng,
              e.latlng
            ],
            routeWhileDragging: true,
            lineOptions: {
              styles: [{color: 'orange', opacity: 1, weight: 5}]
            },
            show: true, // Ne pas afficher le panneau de l'itinéraire
          }).addTo(map);
        });
      }, function () {
        console.error('Error getting the user location.');
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  initMap();
});
