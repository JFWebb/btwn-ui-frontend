
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
  const [startMarker, setStartMarker] = useState(null)
  const [endMarker, setEndMarker] = useState(null)
  const [searchMarkers, setSearchMarkers] = useState([])

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

  // to be called in form component
  const addMarkers = (firstLatData, firstLonData, secondLatData, secondLonData) => {  
    if (startMarker) {
      startMarker.remove();
    }

    if (endMarker) {
      endMarker.remove();
    }

    if (searchMarkers) {
      searchMarkers.forEach(element => element.remove());
    }
    setStartMarker(new tt.Marker().setLngLat([firstLonData,firstLatData]).addTo(map))
    setEndMarker(new tt.Marker().setLngLat([secondLonData,secondLatData]).addTo(map))

    // ADDING SEARCH MARKERS
    console.log('JULIE LOG')
    resultData.forEach(element => {
      console.log(element.position.lon)
      let newMarker = new tt.Marker().setLngLat([element.position.lon,element.position.lat]).addTo(map)
      setSearchMarkers(current => [...current, newMarker]);
     
    })
    console.log(searchMarkers)
  }

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

    // let supportPoints = []
    // resultData.forEach(element => {
    //   supportPoints.push(element.position)
    // })
    // console.log('SUPPORT POINTS TEST');
    // console.log(supportPoints)

    ttserv.services
      .calculateRoute({
        key: "KXYIOAheM7cRQpB5GosJco3nGKGWSYg3",
        locations: `${firstLonData},${firstLatData}:${secondLonData},${secondLatData}`,
        // supportingPoints: supportPoints,
      })
      .then(function (routeData) {
        // this then setCenter doesnt work yet 👇 i think
        // map.setCenter([parseFloat(firstAddCoords.lat), parseFloat(firstAddCoords.lon)]);
        // converts returned value from calculateRoute as geoJSON object and stores in the state "result"
        const data = routeData.toGeoJson();
        // console.log('RAW DATA')
        // console.log(data)
        setRouteResult(data)
        const direction = data.features[0].geometry.coordinates

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

      />
      <div ref={mapElement} className="mapDiv"></div>
      <ResultsPage resultData = {resultData}/>
      <AddressPage user={user}/>
      <Footer />
    </div>
  );
}
export default App;

