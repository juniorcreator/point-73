
var InforObj = [];
function map() {

  var citymap = {
    kremenchug: {
      center: {lat: 49.081737, lng: 33.430917},
    },
    ekatern: {
      center: {lat: 56.840427, lng: 60.605654},
    },
    minsk: {
      center: {lat: 53.898507, lng: 27.560516},
    },
  };


  var markersOnMap = [{
    placeName: "minsk (Uluru)",
    street: 'улица Ленина 20, Минск 220030',
    email: 'timofei.web@gmail.com ',
    phone: '+38 (096) 908-48-55',
    LatLng: [{
      lat: 53.898507, lng: 27.560516
    }]
  },
    {
      placeName: "ekatern (Melbourne)",
      street: 'улица Ленина 20, Минск 220030 1',
      email: 'timofei.web@gmail.com 1',
      phone: '+38 (096) 908-48-55 1',
      LatLng: [{
        lat: 56.840427, lng: 60.605654
      }]
    },
    {
      placeName: "kremenchug (Canberra)",
      street: 'улица Ленина 20, Минск 220030 2',
      email: 'timofei.web@gmail.com 2',
      phone: '+38 (096) 908-48-55 2',
      LatLng: [{
        lat: 49.081737, lng: 33.430917
      }]
    },
  ];

  function addMarkerInfo() {
    for (var i = 0; i < markersOnMap.length; i++) {

      let contentString = `
        <div id="content" class="infowindow">
        <div class="infowindow__wrap">
                  <p class="infowindow__street">
            <img src="../../resources/img/map/loc.png" alt="loc">
            ${markersOnMap[i].street} 
            </p>
            <a href="mailto:${markersOnMap[i].email}" class="infowindow__email">
             <img src="../../resources/img/map/mail.png" alt="mail">
${markersOnMap[i].email}
           </a>
          <a href="tel:+380969084855" class="infowindow__phone">
          <img src="../../resources/img/map/phone.png" alt="phone">
${markersOnMap[i].phone}
          </a>
          <div class="infowindow__social">
            <a href="#" target="_blank"><img src="../../resources/img/map/1.png" alt=""></a>
            <a href="#" target="_blank"><img src="../../resources/img/map/2.png" alt=""></a>
            <a href="#" target="_blank"><img src="../../resources/img/map/3.png" alt=""></a>
            <a href="#" target="_blank"><img src="../../resources/img/map/4.png" alt=""></a>
            <a href="#" target="_blank"><img src="../../resources/img/map/5.png" alt=""></a>
            </div>
        </div>

         </div>`;

      const marker = new google.maps.Marker({
        position: markersOnMap[i].LatLng[0],
        map: map,
      });

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400,
        pixelOffset: new google.maps.Size(0, 278)
      });

      marker.addListener('click', function () {
        closeOtherInfo();
        infowindow.open(marker.get('map'), marker);
        InforObj[0] = infowindow;
      });
      //close if click outside of popup
      map.addListener("click", function() {
        closeOtherInfo();
      });

      //open first popup by default
      if(i < 1) {
        new google.maps.event.trigger( marker, 'click' );
      }
    }
  }

  function closeOtherInfo() {
    if (InforObj.length > 0) {
      /* detach the info-window from the marker ... undocumented in the API docs */
      InforObj[0].set("marker", null);
      /* and close it */
      InforObj[0].close();
      /* blank the array */
      InforObj.length = 0;
    }
  }
  var map;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.610398, lng: 39.597524},
    zoom: 5,
    zoomControl: false,
    gestureHandling: 'cooperative',
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#444444"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#dbdbdb"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ]

  });
  addMarkerInfo();

  //red marks on map
    for (var city in citymap) {
      var cityCircle = new google.maps.Circle({
        strokeColor: '#ED9CA4',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#E03E4E',
        fillOpacity: 1,
        map: map,
        center: citymap[city].center,
        radius: 15000
      });
    }



  // var marker = new google.maps.Marker({
  //
  //   position: {lat: 53.898507, lng: 27.560516},
  //   map: map,
  //   icon: '../../resources/img/home-page/map.png'
  // });

}
$(document).ready(function () {
  map();
});






