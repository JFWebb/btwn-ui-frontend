
// import packages
import './App.css';
import { useState, useEffect, useRef} from 'react';
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
import ToastComponent from './Components/Toast/ToastComponent.js'
import { Tabs, Tab, Modal, Row, Button, Col, Card, Container } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const apikey = 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3'
  // set useRef for map
  const mapElement = useRef();

  // user states
  const [user, setUser] = useState(null);

  // map states
  const [map, setMap] = useState({}); // holds a reference to the TomTom map object we will create.
  const [mapLongitude, setMapLongitude] = useState(-73.99953);
  const [mapLatitude, setMapLatitude] = useState(40.72314);
  const [startMarker, setStartMarker] = useState(null)
  const [endMarker, setEndMarker] = useState(null)
  const [searchMarkers, setSearchMarkers] = useState([])
  const [resultData, setResultData] = useState(null)
  const [mapZoom, setMapZoom] = useState(3); //controls the initial zoom
  const [routeResult, setRouteResult] = useState({});

  // establishes map on load, sets up firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user)) //look at googledocs notes for explanation on this!
    let map = tt.map({
      key: apikey,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude], //controls the intial center
      zoom: mapZoom
    })

    setMap(map);
    return() => {
      unsubscribe();
      map.remove();
    }
  }, []);

  //functions that update our state variables and update the map
  const increaseZoom = () => {
    setMapZoom(mapZoom + 1);
  };
      
  const decreaseZoom = () => {
    setMapZoom(mapZoom - 1);
  };

  // add markers for start, end, and POIs. called in Form component
  const addMarkers = async (firstLatData, firstLonData, secondLatData, secondLonData, POIs) => {  
    console.log('in markers function')
    console.log(POIs)

    // clear existing markers from map
    if (startMarker) {
      startMarker.remove();
    }

    if (endMarker) {
      endMarker.remove();
    }

    if (searchMarkers) {
      searchMarkers.forEach(element => element.remove());
    }

    // add start & end point markers
    setStartMarker(new tt.Marker().setLngLat([firstLonData,firstLatData]).addTo(map))
    setEndMarker(new tt.Marker().setLngLat([secondLonData,secondLatData]).addTo(map))

    // add markers for POI from searchAlongRoute 
    POIs.forEach(element => {
      console.log(element.position.lon)
      let newMarker = new tt.Marker().setLngLat([element.position.lon,element.position.lat]).addTo(map)
      setSearchMarkers(current => [...current, newMarker]);
    })
  }

  // adjust zoom to fit bounds of start and end points. called in Form component
  const adjustZoom = (firstLatData, firstLonData, secondLatData, secondLonData) => {
    const bounds = [[firstLatData, firstLonData], [secondLatData, secondLonData]]

    map.fitBounds(bounds, {
      padding: {top:5, bottom:5, left:15, right:5},
      maxZoom:17
    })

  }

  // calculate route to go on map. called in Form component
  const getRoute = async (firstLatData, firstLonData, secondLatData, secondLonData) => {
    // remove old routes
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }

    if (map.getSource("route")) {
        map.removeSource("route");
    } 

    // calculates route between start and end points
    ttserv.services
      .calculateRoute({
        key: "KXYIOAheM7cRQpB5GosJco3nGKGWSYg3",
        locations: `${firstLonData},${firstLatData}:${secondLonData},${secondLatData}`,
        // supportingPoints: supportPoints,
      })
      .then(function (routeData) {
        // converts returned value from calculateRoute as geoJSON object and stores in the state "result"
        const data = routeData.toGeoJson();
        setRouteResult(data)
        const direction = data.features[0].geometry.coordinates
        const bounds = [[firstLonData, firstLatData], [secondLonData,secondLatData]]
        
        // paint route onto map
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

      // adjust map frame 
      map.setCenter([parseFloat(firstLonData), parseFloat(firstLatData)]);
      map.fitBounds(bounds, {
        padding: {top:100, bottom:100, left:100, right:100},
        maxZoom:17
      })
      })
      .catch((err) => {
        console.log(err);
  })

  }



  return (
    <div className="App">

      <Header user={user} />
      <ToastComponent />

      <div className='grid-container'>
      <Form
        addMarkers={addMarkers}
        getRoute={getRoute}
        setMap={setMap}
        map={map}
        resultData={resultData}
        setResultData={setResultData}
        adjustZoom={adjustZoom}
      />
      <div className='tab-container'>
          <Tabs className="tab-bar" defaultActiveKey="results">
            <Tab eventKey="results" title="Search Results">
              <ResultsPage className="tab-results" resultData={resultData} />
            </Tab>
            <Tab eventKey="saved-addresses" title="Saved Addresses">
              <AddressPage className="tab-addresses" user={user} />
            </Tab>
          </Tabs>
        </div>
      <div ref={mapElement} className="mapDiv"></div>
      <Footer />
     </div>
    </div>
  );
}
export default App;

