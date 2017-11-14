$(document).ready(function() {
    $("#nightmodeCheck").on("change", function() {
        if (document.getElementById("nightmodeCheck").checked === true) {
            document.getElementById("theme").href = "./css/base-night.css";
            function initMap() {
                infoWindow = new google.maps.InfoWindow;
                setLocation();
            
                $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
                    var la = data[0].latitude;
                    var lo = data[0].longitude;
                    console.log(la, lo);
                    la = parseFloat(la).toFixed(3);
                    lo = parseFloat(lo).toFixed(3);
            
                    var uluru = {
                        lat: parseFloat(la),
                        lng: parseFloat(lo)
                    };
            
                    map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: uluru,
                        mapTypeId: 'terrain',
                        styles: [
                            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                            {
                              featureType: 'administrative.locality',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#d59563'}]
                            },
                            {
                              featureType: 'poi',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#d59563'}]
                            },
                            {
                              featureType: 'poi.park',
                              elementType: 'geometry',
                              stylers: [{color: '#263c3f'}]
                            },
                            {
                              featureType: 'poi.park',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#6b9a76'}]
                            },
                            {
                              featureType: 'road',
                              elementType: 'geometry',
                              stylers: [{color: '#38414e'}]
                            },
                            {
                              featureType: 'road',
                              elementType: 'geometry.stroke',
                              stylers: [{color: '#212a37'}]
                            },
                            {
                              featureType: 'road',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#9ca5b3'}]
                            },
                            {
                              featureType: 'road.highway',
                              elementType: 'geometry',
                              stylers: [{color: '#746855'}]
                            },
                            {
                              featureType: 'road.highway',
                              elementType: 'geometry.stroke',
                              stylers: [{color: '#1f2835'}]
                            },
                            {
                              featureType: 'road.highway',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#f3d19c'}]
                            },
                            {
                              featureType: 'transit',
                              elementType: 'geometry',
                              stylers: [{color: '#2f3948'}]
                            },
                            {
                              featureType: 'transit.station',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#d59563'}]
                            },
                            {
                              featureType: 'water',
                              elementType: 'geometry',
                              stylers: [{color: '#17263c'}]
                            },
                            {
                              featureType: 'water',
                              elementType: 'labels.text.fill',
                              stylers: [{color: '#515c6d'}]
                            },
                            {
                              featureType: 'water',
                              elementType: 'labels.text.stroke',
                              stylers: [{color: '#17263c'}]
                            }
                          ]
                
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
                                var bounds = {
                                          east:Number(parseFloat(lo).toFixed(3))+0.001,
                                        north: Number(parseFloat(la).toFixed(3))+0.001,
                                        south: Number(parseFloat(la).toFixed(3))-0.001,
                                          west: Number(parseFloat(lo).toFixed(3))-0.001
                                    }
                                console.log(bounds)
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
            initMap();
        } else {
            document.getElementById("theme").href = "./css/base-day.css";
            function initMap() {
                infoWindow = new google.maps.InfoWindow;
                setLocation();
            
                $.getJSON('https://data.cityofchicago.org/resource/d62x-nvdr.json', function (data) {
                    var la = data[0].latitude;
                    var lo = data[0].longitude;
                    console.log(la, lo);
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
                                var bounds = {
                                          east:Number(parseFloat(lo).toFixed(3))+0.001,
                                        north: Number(parseFloat(la).toFixed(3))+0.001,
                                        south: Number(parseFloat(la).toFixed(3))-0.001,
                                          west: Number(parseFloat(lo).toFixed(3))-0.001
                                    }
                                console.log(bounds)
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
            initMap();
        }
    })
    
})