
// import packages
import './App.css';
import { useState, useEffect } from 'react';


import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form'; 
import Map from './Components/Map/Map'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';
import tt from '@tomtom-international/web-sdk-maps';
import ttserv from "@tomtom-international/web-sdk-services";


function App() {
  /////////////////////// MAP STATES
  const [mapZoom, setMapZoom] = useState(null);
  // map  holds a reference to the TomTom map object we will create.
  const [map, setMap] = useState({});

  /////////////////////// MAP STATES
  const [firstAdd, setFirstAdd] = useState('')
  const [secAdd, setSecAdd] = useState('')
  const [firstAddCoords, setFirstAddCoords] = useState({
    lat: '',
    lon: ''
  })
  const [secondAddCoords, setSecondAddCoords] = useState({
    lat: '',
    lon: ''
  })
  const [query, setQuery] = useState('')
  const [result, setResult] = useState({});

  /////////////////////// MAP FUNCTIONS

  //  const updateMap = async () => {
  //      map.setCenter([parseFloat(firstAddCoords.lon), parseFloat(firstAddCoords.lat)]);
  //      map.setZoom(15);
  //  };
  const firstCoordsArr = [firstAddCoords.lon, firstAddCoords.lat];
  const secondCoordsArr = [secondAddCoords.lon, secondAddCoords.lat];

  const addMarkers = () => {
    const marker1 = new tt.Marker().setLngLat(firstCoordsArr).addTo(map);
    const marker2 = new tt.Marker().setLngLat(secondCoordsArr).addTo(map);
  }

  const getRoute = () => {
    console.log(`${firstAddCoords.lon},${firstAddCoords.lat}:${secondAddCoords.lon},${secondAddCoords.lat}`)
    ttserv.services
      .calculateRoute({
        key: "KXYIOAheM7cRQpB5GosJco3nGKGWSYg3",
        locations: `${firstAddCoords.lon},${firstAddCoords.lat}:${secondAddCoords.lon},${secondAddCoords.lat}`
      })
      .then(function (routeData) {
        map.setCenter([parseFloat(firstAddCoords.lat), parseFloat(firstAddCoords.lon)]);
        console.log(routeData.toGeoJson());
        const data = routeData.toGeoJson();
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
        // notify();
      });
  }

  const paintRoute = () => {
    console.log(result);
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
          'type': 'geojson',
          'data': {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  properties: {},
                  coordinates: result.features[0].geometry
                  .coordinates
                }
              }
            ]
          }
        },
      'paint': {
          'line-color': '#00d7ff',
          'line-width': 8
      }
  });
  }



  return (
    <div className="App">
      <Header />
      <Form 
        firstAdd={firstAdd}
        setFirstAdd={setFirstAdd}
        secAdd={secAdd}
        setSecAdd={setSecAdd}
        firstAddCoords={firstAddCoords}
        setFirstAddCoords={setFirstAddCoords}
        secondAddCoords={secondAddCoords}
        setSecondAddCoords={setSecondAddCoords}
        query={query}
        setQuery={setQuery}
        // updateMap={updateMap}
        addMarkers={addMarkers}
        getRoute={getRoute}
        paintRoute={paintRoute}
      />
      <Map
        mapZoom={mapZoom}
        map={map}
        setMap={setMap}
        firstAddCoords={firstAddCoords}
        secondAddCoords={secondAddCoords}
      />
      <ResultsPage />
      <AddressPage/>
      <Footer />
    </div>
  );
}
export default App;

