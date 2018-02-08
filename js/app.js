var map, marker;

function setLocation() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
			var m = new Date();
            for (i = 0; i < data.length; i++) {
				if (data[i].primary_type == "ROBBERY" || data[i].primary_type == "ASSAULT" ||
					data[i].primary_type == "WEAPONS VIOLATION") {
						console.log(data[i].latitude)
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
    			map: map,
    			icon: '../precrime/media/marker.png'
  			});		
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    });
}

function initMap() {
    $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
        var pos = {
            lat: parseFloat(data[0].latitude).toFixed(3),
            lng: parseFloat(data[0].longitude).toFixed(3)
        };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: pos,
            mapTypeId: 'terrain'
        });
		
        for (i = 0; i < data.length; i++) {
            var crime = data[i].primary_type
            pos = {
                lat : parseFloat(data[i].latitude).toFixed(3),
            	lng : parseFloat(data[i].longitude).toFixed(3)
            }
            var m = new Date();
            if (data[i].primary_type == "ROBBERY" || data[i].primary_type == "ASSAULT" || 
					data[i].primary_type == "WEAPONS VIOLATION") {
					var bounds = {
      						east:Number(parseFloat(pos.lng).toFixed(3))+0.001,
							north: Number(parseFloat(pos.lat).toFixed(3))+0.001,
							south: Number(parseFloat(pos.lat).toFixed(3))-0.001,
      						west: Number(parseFloat(pos.lng).toFixed(3))-0.001
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
		setLocation();
    });
}
