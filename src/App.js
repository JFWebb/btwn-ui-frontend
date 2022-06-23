
// import packages
import './App.css';
import { useState, useEffect, useRef, Component } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import ttserv from "@tomtom-international/web-sdk-services";
import {auth} from './services/firebase';



import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form'; 
import Map from './Components/Map/Map'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';
import CardsContainer from './Components/CardsContainer/CardsContainer';


function App() {

  const [user, setUser] = useState(null);
  const [resultData, setResultData] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user)) //look at googledocs notes for explanation on this!
    let map = tt.map({
      key: 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3',
      container: mapElement.current,
    //    center: [props.mapLongitude, props.mapLatitude],
    //    zoom: props.mapZoom
    })

    setMap(map);
    return() => {
      unsubscribe();
      map.remove();
    }
}, []);


  /////////////////////// MAP STATES
  const mapElement = useRef();
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

  // need to fix this update function still 
  
  /////////////////////// MAP FUNCTIONS

  //functions that update our state variables and update the map
   const increaseZoom = () => {
       if (mapZoom < 17) {
           setMapZoom(mapZoom + 1);
       }
   };
      
   const decreaseZoom = () => {
       if (mapZoom > 1) {
           setMapZoom(mapZoom - 1);
       }
   };

  
  // original updateMap from tutorial, leave for now
  //  const updateMap = async () => {
  //      map.setCenter([parseFloat(firstAddCoords.lon), parseFloat(firstAddCoords.lat)]);
  //      map.setZoom(15);
  //  };


  /////////////////////// ADDING MARKERS TO MAP
  const firstCoordsArr = [firstAddCoords.lon, firstAddCoords.lat];
  const secondCoordsArr = [secondAddCoords.lon, secondAddCoords.lat];


  // to be called in form component
  const addMarkers = () => {
    const marker1 = new tt.Marker().setLngLat(firstCoordsArr).addTo(map);
    const marker2 = new tt.Marker().setLngLat(secondCoordsArr).addTo(map);
  }

  /////////////////////// CALCULATING ROUTE
  // to be called in form component
  const getRoute = () => {
    // console.log(`${firstAddCoords.lon},${firstAddCoords.lat}:${secondAddCoords.lon},${secondAddCoords.lat}`)
    ttserv.services
      .calculateRoute({
        key: "KXYIOAheM7cRQpB5GosJco3nGKGWSYg3",
        locations: `${firstAddCoords.lon},${firstAddCoords.lat}:${secondAddCoords.lon},${secondAddCoords.lat}`
      })
      .then(function (routeData) {
        // this then setCenter doesnt work yet 👇 i think
        // map.setCenter([parseFloat(firstAddCoords.lat), parseFloat(firstAddCoords.lon)]);
        console.log(routeData.toGeoJson());
        // converts returned value from calculateRoute as geoJSON object and stores in the state "result"
        const data = routeData.toGeoJson();
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
        // notify();
      });
  }

  /////////////////////// ADDING ROUTE LAYER TO MAP
  const paintRoute = () => {
    map.addLayer({
      'id': 'route',
      'type': 'line',
      // outline source as geoJSON object formate
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
                  // pull coordinates from geoJSON stored in the state "result"
                  coordinates: result.features[0].geometry
                  .coordinates
                }
              }
            ]
          }
        },
      // choose line color and line width
      'paint': {
          'line-color': '#00d7ff',
          'line-width': 8
      }
  });
  }



  return (
    <div className="App">

      <Header user={user} />
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
        map={map}
        resultData={resultData}
        setResultData={setResultData}
      />
      {/* <Map
        mapZoom={mapZoom}
        map={map}
        setMap={setMap}
        firstAddCoords={firstAddCoords}
        secondAddCoords={secondAddCoords}
      /> */}
      <div ref={mapElement} className="mapDiv"></div>
      <ResultsPage resultData = {resultData}/>
      <AddressPage user={user}/>
      <Footer />
    </div>
  );
}
export default App;

