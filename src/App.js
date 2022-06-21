
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

  // cords as array pairs
  const firstCoordsArr = [firstAddCoords.lon, firstAddCoords.lat];
  const secondCoordsArr = [secondAddCoords.lon, secondAddCoords.lat];
  
  /////////////////////// MAP FUNCTIONS

  //  const updateMap = async () => {
  //      map.setCenter([parseFloat(firstAddCoords.lon), parseFloat(firstAddCoords.lat)]);
  //      map.setZoom(15);
  //  };

   const addMarker = (coords) => {
     const marker = new tt.Marker().setLngLat(coords).addTo(map) ;
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
        addMarker={addMarker}
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

