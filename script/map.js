mapboxgl.accessToken = 'pk.eyJ1IjoicmFkaW9lZGl0IiwiYSI6ImNqaHpocmdoejB4aDczcXBkY2EwOHdmNXIifQ.-el4GP_S7J2IG3hX9MCU9g';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/radioedit/cjhzgv9l62o402so8nu1v8gqa',
    center: [0, 20], // lon/lat
    zoom: 1 // See most of the map
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    // the rest of the code will go in here
    var layers = ['0 - 100', '100 - 10,000', '10,000 - 1,000,000', '1,000,000 - 10,000,000', '10,000,000 - 100,000,000', '100,000,000+', 'No data'];
    var colors = ['#ffffe0', '#ffcb8f', '#fe906c', '#e75555', '#bf2239', '#8a0000', '#000000'];

    for (let i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }
});

map.on('mousemove', function (e) {
    var countries = map.queryRenderedFeatures(e.point, {
        layers: ['ntds']
    });

    if (countries.length > 0) {
        document.getElementById('inter').innerHTML = '<h3><strong>' + countries[0].properties.NAME_LONG + '</strong></h3><p><strong><em>' + countries[0].properties.ntds_total + '</strong> interventions since 2007</em></p>';
    } else {
        document.getElementById('inter').innerHTML = '<p>Hover over or touch a country!</p>';
    }
});

map.on('touchstart', function (e) {
    var countries = map.queryRenderedFeatures(e.point, {
        layers: ['ntds']
    });

    if (countries.length > 0) {
        document.getElementById('inter').innerHTML = '<h3><strong>' + countries[0].properties.NAME_LONG + '</strong></h3><p><strong><em>' + countries[0].properties.ntds_total + '</strong> interventions since 2007</em></p>';
    } else {
        document.getElementById('inter').innerHTML = '<p>Hover over or touch a country!</p>';
    }
});

map.on('touchend', function(e) {
    document.getElementById('inter').innerHTML = '<p>Hover over or touch a country!</p>';
});

map.getCanvas().style.cursor = 'default';
