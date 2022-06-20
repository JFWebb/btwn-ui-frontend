
// import packages
import './App.css';
import { useState, useEffect } from 'react';


import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form'; 
import Map from './Components/Map/Map'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';


function App() {
  /////////////////////// MAP STATES
  const [mapLongitude, setMapLongitude] = useState(null);
  const [mapLatitude, setMapLatitude] = useState(null);
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
  //      map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
  //      map.setZoom(mapZoom);
  //  };

  // modified update map to test lifted state of maps
  const updateMap = () => {
    // these are dummy values for 
    setMapLatitude(42.477407)
    setMapLongitude(-71.061147)
    // map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    // map.setZoom(mapZoom);
 };

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
      />
      <Map
        mapLongitude={mapLongitude}
        mapLatitude={mapLatitude}
        mapZoom={mapZoom}
        map={map}
        setMap={setMap}
      />
      <ResultsPage />
      <AddressPage/>
      <Footer />
    </div>
  );
}

export default App;
