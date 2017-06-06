var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: -33.865427, lng: 151.196123},
        mapTypeId: 'terrain'
    });

    var script = document.createElement('script');


    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);

}

function eqfeed_callback(results) {
    var heatmapData = [];

    $.ajax({
        url: "/foot_print_data", // it should be mapped in routes.rb in rails
        type: "GET",
        dataType: "json",
        success: function(data){
            for (var i = 0; i < data.length; i++) {
                var latLng = new google.maps.LatLng(data[i].lat, data[i].lng);
                heatmapData.push(latLng);
            }
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                dissipating: false,
                map: map
            });
        }
    });


}