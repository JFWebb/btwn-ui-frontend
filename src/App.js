
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
  // set map var states according to TomTom documentation
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);

  // map  holds a reference to the TomTom map object we will create.
  const [map, setMap] = useState({});

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
  
   const updateMap = () => {
       map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
       map.setZoom(mapZoom);
   };

  return (
    <div className="App">
      <Header />
      <Form />
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
