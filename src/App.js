
// import packages
import './App.css';
import { useState, useEffect, useRef, Component } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import ttserv from "@tomtom-international/web-sdk-services";
import {auth} from './services/firebase';



import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form'; 
import AnnieForm from './Components/Form/anniesform';
import Map from './Components/Map/Map'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';


function App() {
  let route;
  const [user, setUser] = useState(null);


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
 
  const [routeResult, setRouteResult] = useState({});

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
  // const firstCoordsArr = [firstAddCoords.lon, firstAddCoords.lat];
  // const secondCoordsArr = [secondAddCoords.lon, secondAddCoords.lat];


  // to be called in form component
  const addMarkers = (firstLatData, firstLonData, secondLatData, secondLonData) => {
    const marker1 = new tt.Marker().setLngLat([firstLonData,firstLatData]).addTo(map);
    const marker2 = new tt.Marker().setLngLat([secondLonData,secondLatData]).addTo(map);
  }

  /////////////////////// CALCULATING ROUTE
  // to be called in form component
  const getRoute = async (firstLatData, firstLonData, secondLatData, secondLonData) => {
    // console.log(`first lat long: ${firstLonData},${firstLatData}:${secondLonData},${secondLatData}`)
    ttserv.services
      .calculateRoute({
        key: "KXYIOAheM7cRQpB5GosJco3nGKGWSYg3",
        locations: `${firstLonData},${firstLatData}:${secondLonData},${secondLatData}`
      })
      .then(function (routeData) {
        // this then setCenter doesnt work yet 👇 i think
        // map.setCenter([parseFloat(firstAddCoords.lat), parseFloat(firstAddCoords.lon)]);
        // converts returned value from calculateRoute as geoJSON object and stores in the state "result"
        const data = routeData.toGeoJson();
        console.log('RAW DATA')
        console.log(data)
        setRouteResult(data)
        const direction = data.features[0].geometry.coordinates
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
                      coordinates: direction
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
      })

      
      })
      .catch((err) => {
        console.log(err);
        // notify();
  })

  }



  return (
    <div className="App">

      <Header user={user} />
      {/* <Form 
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
      /> */}
      <AnnieForm
        addMarkers={addMarkers}
        getRoute={getRoute}
        

      />
      <div ref={mapElement} className="mapDiv"></div>
      <ResultsPage />
      <AddressPage user={user}/>
      <Footer />
    </div>
  );
}
export default App;

