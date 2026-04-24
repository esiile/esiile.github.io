let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap contributors',
})
osm.addTo(map)

// default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
}

// add popup to each feature
function popUPinfo(feature, layer) {
    layer.bindPopup(feature.properties.NIMI)
}

// a list of colors for districts
const districtColors = [
    '#009933', '#ff0066', '#4363d8', '#f58231', '#911eb4', 
    '#ffbf00', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', 
    '#008080', '#e6beff', '#9a6324', '#0000ff', '#800000', 
    '#aaffc3', '#ffe119', '#3cb44b', '#808000'
];

// get color from feature property
function getColor(property) {
  return districtColors[property % districtColors.length];
}

// polygon style
function polygonStyle(feature) {
    return {
        fillColor: getColor(feature.properties.OBJECTID),
        fillOpacity: 0.5,
        weight: 1.5,
        opacity: 1,
        color: 'white',
    };
}

// add geoJSON polygons layer
async function addDistrictsGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const polygons = L.geoJson(data, {
        onEachFeature: popUPinfo,
        style: polygonStyle,
    })
    polygons.addTo(map)
}

// add geoJSON points layer
async function addCelltowersGeoJson(url) {
    const response = await fetch(url)
    const data = await response.json()
    const markers = L.geoJson(data)
    const clusters = L.markerClusterGroup()
    clusters.addLayer(markers)
    clusters.addTo(map)
}

addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')