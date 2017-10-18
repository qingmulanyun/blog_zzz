var markers = [];
var public_transport_tracking_map;

function initPuclicTransportMap() {
    public_transport_tracking_map = new google.maps.Map(document.getElementById('map_public_transport'), {
        zoom: 12,
        center: {lat: -33.8937641, lng: 151.1803148},
        mapTypeId: 'terrain'
    });

    $.ajax({
        url: "/public_transport_tracking",
        type: "GET",
        dataType: "json",
        success: function(data){
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].location)
                addMarker(data[i].location)
            }
        }
    });


}


function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: public_transport_tracking_map
    });
    markers.push(marker);
}