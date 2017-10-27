var markers = [];
var public_transport_tracking_map;

function initPuclicTransportMap() {
    public_transport_tracking_map = new google.maps.Map(document.getElementById('map_public_transport'), {
        zoom: 12,
        center: {lat: -33.8937641, lng: 151.1803148},
        mapTypeId: 'terrain'
    });

    initial();
    var refresh = setInterval(refresh, 5000);

    function initial(){
        $.ajax({
            url: "/public_transport_tracking",
            type: "GET",
            dataType: "json",
            success: function(data){
                for (var i = 0; i < data.length; i++) {
                    addMarker(data[i].location, data[i].vehicle_id)
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


    function addMarker(location, vehicle_id) {
        var marker = new google.maps.Marker({
            id: vehicle_id,
            position: location,
            map: public_transport_tracking_map
        });
        markers.push(marker);
    }

    function refreshMarker(updated_data, markers) {
       if (markers.length == 0){
           initial()
       } else {
           markers.map(function(marker) {
               if(marker.id == updated_data.vehicle_id){
                   if(marker.position !== updated_data.location){
                       marker.setPosition(updated_data.location)
                   }
               }
           });

       }
    }

}



