
// import packages
import './App.css';
import { useState, useEffect, useRef, Component } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import ttserv from "@tomtom-international/web-sdk-services";
import {auth} from './services/firebase';





import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form';
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';
import CardsContainer from './Components/CardsContainer/CardsContainer';


function App() {
  const [user, setUser] = useState(null);
  const [mapClear, setMapClear] = useState(false);
  const [marker1, setMarker1] = useState(null)
  const [marker2, setMarker2] = useState(null)

  const [resultData, setResultData] = useState(null)
  const [center, setCenter] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(-73.99953);
  const [mapLatitude, setMapLatitude] = useState(40.72314);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user)) //look at googledocs notes for explanation on this!
    let map = tt.map({
      key: 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3',
      container: mapElement.current,
      center: [mapLongitude, mapLatitude], //controls the intial center
      zoom: mapZoom
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
  const [mapZoom, setMapZoom] = useState(3); //controls the initial zoom
  
  // map  holds a reference to the TomTom map object we will create.
  const [map, setMap] = useState({});

  /////////////////////// MAP STATES
 
  const [routeResult, setRouteResult] = useState({});

  // need to fix this update function still 
  
  /////////////////////// MAP FUNCTIONS

  //functions that update our state variables and update the map
   const increaseZoom = () => {
 
           setMapZoom(mapZoom + 1);

   };
      
   const decreaseZoom = () => {

      setMapZoom(mapZoom - 1);

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
    marker1.remove();
    marker2.remove();
    // const marker1 = new tt.Marker().setLngLat([firstLonData,firstLatData]).addTo(map);
    // console.log('marker 1')
    // console.log(marker1)
    // const marker2 = new tt.Marker().setLngLat([secondLonData,secondLatData]).addTo(map);
    // console.log('marker 2')
    // console.log(marker2)
    setMarker1(new tt.Marker().setLngLat([firstLonData,firstLatData]).addTo(map))
    setMarker2(new tt.Marker().setLngLat([secondLonData,secondLatData]).addTo(map))
    // console.log('listing markers?');
    // console.log(this.markers);
  }



  const adjustZoom = (firstLatData, firstLonData, secondLatData, secondLonData) => {
    const bounds = [[firstLatData, firstLonData], [secondLatData, secondLonData]]

    map.fitBounds(bounds, {
      padding: {top:5, bottom:5, left:15, right:5},
      maxZoom:17
    })

  }
// Bound stuff

 


  /////////////////////// CALCULATING ROUTE
  // to be called in form component
  const getRoute = async (firstLatData, firstLonData, secondLatData, secondLonData) => {
    // remove old routes
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }

    if (map.getSource("route")) {
        map.removeSource("route");
    } 
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
        const bounds = [[firstLonData, firstLatData], [secondLonData,secondLatData]]
        
        //PAINT ROUTE
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
      map.setCenter([parseFloat(firstLonData), parseFloat(firstLatData)]);
      map.fitBounds(bounds, {
        padding: {top:100, bottom:100, left:100, right:100},
        maxZoom:17
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
      <Form
        addMarkers={addMarkers}
        getRoute={getRoute}
        mapClear={mapClear}
        setMap={setMap}
        map={map}
        resultData={resultData}
        setResultData={setResultData}
        adjustZoom={adjustZoom}

      />
      <div ref={mapElement} className="mapDiv"></div>
      <ResultsPage resultData = {resultData}/>
      <AddressPage user={user}/>
      <Footer />
    </div>
  );
}
export default App;

