import { pointsCollection } from "./points.js"

function turfFunctions(map) {
    //console.log('This text is from a module')
    //alert('Hello from my module!')

    // create point and add it to map
    // define point coordinates
    const pointCoords = [26.71552, 58.37393]
    // define a point
    const myPoint = turf.point(pointCoords)
    // convert the point to geoJSON object
    const geoJSON_point = L.geoJSON(myPoint)
    // add the geoJSON object to the map
    geoJSON_point.addTo(map)

    // create line and add it to map
    const lineCoords = [
        [26.71379, 58.37476],
        [26.71554, 58.37349],
        [26.71553, 58.37434],
        [26.71630, 58.37378],
        [26.71473, 58.37407]
    ]
    const myLine = turf.lineString(lineCoords)
    const geoJSON_line = L.geoJSON(myLine)
    geoJSON_line.addTo(map)

    // create polygon and add it to map
    const polygonCoords = [[
        [26.71355, 58.37468],
        [26.71404, 58.37430],
        [26.71433, 58.37429],
        [26.71550, 58.37345],
        [26.71660, 58.37388],
        [26.71615, 58.37420],
        [26.71589, 58.37431],
        [26.71552, 58.37461],
        [26.71521, 58.37496],
        [26.71480, 58.37481],
        [26.71449, 58.37502],
        [26.71355, 58.37468]
        ]]
    const myPolygon = turf.polygon(polygonCoords)
    const geoJSON_polygon = L.geoJSON(myPolygon)
    geoJSON_polygon.addTo(map)

    // create point2 and add it to map
    const pointCoords2 = [26.71489, 58.37439]
    const myPoint2 = turf.point(pointCoords2)
    const geoJSON_point2 = L.geoJSON(myPoint2)
    geoJSON_point2.addTo(map)

    // measuring distance
    const options = { units: 'meters' }
    const distance = turf.distance(myPoint, myPoint2, options)
    console.log(`distance is ${distance} meters`)
    // round the distance to nearest integer
    const distanceRounded = Math.round(distance)
    // distance is first multiplied by 100, then rounded and divided by 100 to keep two digits after the decimal point
    const roundedToTwoDecimals = Math.round(distance*100)/100
    // compare the results
    console.log(`rounded to nearest integer: ${distanceRounded}`)
    console.log(`rounded to two decimal points: ${roundedToTwoDecimals}`)

    // measuring area
    const areaMeasurement = turf.area(myPolygon)
    const areaRounded = Math.round(areaMeasurement)
    console.log(`Area without rounding: ${areaMeasurement}`)
    console.log(`Rounded area is ${areaRounded} square meters`)

    // buffer
    const statueBuffer = turf.buffer(myPoint, 20, {units: 'meters'})
    L.geoJSON(statueBuffer).addTo(map)
    const lineBuffer = turf.buffer(myLine, 20, {units: 'meters'})
    L.geoJSON(lineBuffer).addTo(map)
    const polygonBuffer = turf.buffer(myPolygon, 20, {units: 'meters'})
    L.geoJSON(polygonBuffer).addTo(map)
    const polygonBufferNegative = turf.buffer(myPolygon, -10, {units: 'meters'})
    L.geoJSON(polygonBufferNegative).addTo(map)

    // envelope
    // create new point
    const myPoint3 = turf.point([26.71216, 58.37428])
    const geoJSON_point3 = L.geoJSON(myPoint3)
    geoJSON_point3.addTo(map)
    // create a feature collection
    const features = turf.featureCollection([myPoint, myPoint3, myLine, myPolygon])
    // create the envelope
    const enveloped = turf.envelope(features)
    // add to map
    L.geoJSON(enveloped).addTo(map)

    // points within polygon
    const points = turf.points(pointsCollection)
    //L.geoJSON(points).addTo(map)
    const pointsWithinBorders = turf.pointsWithinPolygon(points, myPolygon)
    console.log(pointsWithinBorders)
    L.geoJSON(pointsWithinBorders).addTo(map)

    // Creating your own geometries
    /*
    map.on('click', function(event) {
        console.log(`[${event.latlng.lng}, ${event.latlng.lat}]`)
        // define coordinates of the point
        let pointCoords = [event.latlng.lng, event.latlng.lat]
        // create a turf point
        let turfPoint = turf.point(pointCoords)
        // convert the point to GeoJSON format and add it to the map
        L.geoJSON(turfPoint).addTo(map)
    })
    */

    // explore the turf library
    const myPolygon2 = turf.polygon(([[
        [26.713613569900193, 58.37329132917565],
        [26.713761091396012, 58.373325064856296],
        [26.713854968711534, 58.373242131250194],
        [26.713905930682817, 58.37324634821791],
        [26.71409904973189, 58.37310297103254],
        [26.713932752772966, 58.3730720464652],
        [26.713943481609025, 58.37305377284448],
        [26.713254153892198, 58.372928535046505],
        [26.713187098666825, 58.37301990337975],
        [26.713356971686157, 58.37306202397238],
        [26.713270246982578, 58.37318676725827],
        [26.713498234912553, 58.37322653550701],
        [26.713570654555955, 58.37312954506734],
        [26.7137047650067, 58.3731478186488],
        [26.713613569900193, 58.37329132917565]
        ]]))
    L.geoJSON(myPolygon2).addTo(map)
    const exploded = turf.explode(myPolygon2)
    L.geoJSON(exploded).addTo(map)
}

export { turfFunctions }