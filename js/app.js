var map, infoWindow;

function getCurrentLocation() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    });
}

function setLocation() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        navigator.geolocation.watchPosition(function (position) {

            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
			var m = new Date();
			 
            for (i = 0; i < data.length; i++) {
				if ((parseFloat(data[i].date.substring(5, 7)) == (m.getMonth() + 1)) &&
                (data[i].primary_type == "ROBBERY" || data[i].primary_type == "ASSAULT")) {
                	if (Math.abs(Math.abs(parseFloat(data[i].latitude).toFixed(3)) -
                        Math.abs(parseFloat(pos.lat).toFixed(3))) < 0.001 &&
                    	Math.abs(Math.abs(parseFloat(data[i].longitude).toFixed(3)) -
                        Math.abs(parseFloat(pos.lng).toFixed(3))) < 0.001) {
                    		document.getElementById("status").innerHTML = "DANGEROUS";
                    		document.getElementById("status").style.color = "red";
                    		break;
                	}			
				}
            }
			var marker = new google.maps.Marker({
    			position: pos,
				map: map
			});
            infoWindow.setPosition(pos);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    });
}

function initMap() {
    infoWindow = new google.maps.InfoWindow;
    setLocation();

    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        var la = data[0].latitude;
        var lo = data[0].longitude;	
        la = parseFloat(la).toFixed(3);
        lo = parseFloat(lo).toFixed(3);

        var uluru = {
            lat: parseFloat(la),
            lng: parseFloat(lo)
        };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: uluru,
            mapTypeId: 'terrain'
        });


        for (i = 0; i < data.length; i++) {
            var crime = data[i].primary_type
            var la = data[i].latitude
            var lo = data[i].longitude
            la = parseFloat(la).toFixed(3);
            lo = parseFloat(lo).toFixed(3);
            var uluru = {
                lat: parseFloat(la),
                lng: parseFloat(lo)
            }
            var m = new Date();
            if ((parseFloat(data[i].date.substring(5, 7)) == (m.getMonth() + 1)) &&
                (data[i].primary_type == "ROBBERY" || data[i].primary_type == "ASSAULT")) {
		    	console.log(parseFloat(data[i].date.substring(5, 7)), m.getMonth() + 1)
					var bounds = {
      						east:Number(parseFloat(lo).toFixed(3))+0.001,
							north: Number(parseFloat(la).toFixed(3))+0.001,
							south: Number(parseFloat(la).toFixed(3))-0.001,
      						west: Number(parseFloat(lo).toFixed(3))-0.001
						}
                 	var rectangle = new google.maps.Rectangle({
    					strokeColor: '#FF0000',
    					strokeOpacity: 0.8,
    					strokeWeight: 2,
    					fillColor: '#FF0000',
    					fillOpacity: 0.35,
    					map: map,
    					bounds: bounds
  				});
				rectangle.setMap(map);
            }
        }
    });

}
