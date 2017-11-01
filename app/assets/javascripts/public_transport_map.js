var markers = [];
var public_transport_tracking_map;

function initPuclicTransportMap() {
    public_transport_tracking_map = new google.maps.Map(document.getElementById('map_public_transport'), {
        zoom: 12,
        center: {lat: -33.8937641, lng: 151.1803148},
        mapTypeId: 'terrain'
    });

    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(public_transport_tracking_map);

    initial();
    var refresh = setInterval(refresh, 5000);

    function initial(){
        $.ajax({
            url: "/public_transport_tracking",
            type: "GET",
            dataType: "json",
            success: function(data){
                for (var i = 0; i < data.length; i++) {
                    addMarker(data[i].location, data[i].vehicle)
                }
            }
        });
    }

    function refresh(){
        $.ajax({
            url: "/public_transport_tracking",
            type: "GET",
            dataType: "json",
            success: function(data){
                for (var i = 0; i < data.length; i++) {
                    refreshMarker(data[i], markers)
                }
            }
        });
    }


    function addMarker(location, vehicle) {
        var marker = new google.maps.Marker({
            id: vehicle.id,
            position: location,
            map: public_transport_tracking_map
        });
        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
            content: vehicle.label
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    function refreshMarker(updated_data, markers) {
       if (markers.length == 0){
           initial()
       } else {
           markers.map(function(marker) {
               if(marker.id == updated_data.vehicle.id){
                   if(marker.position !== updated_data.location){
                       marker.setPosition(updated_data.location)
                   }
               }
           });

       }
    }

}



