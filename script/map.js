mapboxgl.accessToken = 'pk.eyJ1IjoicmFkaW9lZGl0IiwiYSI6ImNqaHpocmdoejB4aDczcXBkY2EwOHdmNXIifQ.-el4GP_S7J2IG3hX9MCU9g';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/radioedit/cjhzgv9l62o402so8nu1v8gqa',
    center: [0, 20], // lon/lat
    zoom: 1 // See most of the map
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

map.on('mousemove', function (e) {
    var countries = map.queryRenderedFeatures(e.point, {
        layers: ['ntds']
    });

    if (countries.length > 0) {
        document.getElementById('inter').innerHTML = '<p style="text-align: center"><strong>' + countries[0].properties.NAME_LONG + '</strong> - <em>' + d3.format(",")(countries[0].properties.ntds_total) + ' interventions since 2007</em></p>';
    } else {
        document.getElementById('inter').innerHTML = '<p style="text-align: center">Hover over or touch a country</p>';
    }
});

map.on('touchstart', function (e) {
    var countries = map.queryRenderedFeatures(e.point, {
        layers: ['ntds']
    });

    if (countries.length > 0) {
        document.getElementById('inter').innerHTML = '<p style="text-align: center"><strong>' + countries[0].properties.NAME_LONG + '</strong> - <em>' + d3.format(",")(countries[0].properties.ntds_total) + ' interventions since 2007</em></p>';
    } else {
        document.getElementById('inter').innerHTML = '<p style="text-align: center">Hover over or touch a country</p>';
    }
});

map.on('touchend', function(e) {
    document.getElementById('inter').innerHTML = '<p style="text-align: center">Hover over or touch a country</p>';
});

map.getCanvas().style.cursor = 'default';
