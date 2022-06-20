import {useEffect, useState, useRef} from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as tt from '@tomtom-international/web-sdk-maps';
import './Map.styles.css';

// intialize a max-zoom var, this can be changed
const MAX_ZOOM = 17;
 
const Map = (props) => {
   // useRef is a hook that provide access to non-virtual DOM elements.
   const mapElement = useRef();
 
   // set map var states according to TomTom documentation
   const [mapLongitude, setMapLongitude] = useState(-121.91599);
   const [mapLatitude, setMapLatitude] = useState(37.36765);
   const [mapZoom, setMapZoom] = useState(13);
   // map  holds a reference to the TomTom map object we will create.
   const [map, setMap] = useState({});
 
   //functions that update our state variables and update the map
   const increaseZoom = () => {
       if (mapZoom < MAX_ZOOM) {
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
 
   useEffect(() => {
   let map = tt.map({
       key: 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3',
       container: mapElement.current,
       center: [mapLongitude, mapLatitude],
       zoom: mapZoom
   });
   setMap(map);
   return () => map.remove();
   }, []);
 
   //ref={mapElement} attribute tells React the mapElement variable should hold a reference to the actual DOM element representing this div.
   // We need this reference because the TomTom Maps SDK can't render into a piece of React's virtual DOM. It needs to work with a real DOM object.
   // but there’s a catch: it'll only assign the reference after it finishes mounting the component in the DOM, because the div element we want a reference to doesn't exist until React finishes mounting the component.
   // because of this, we need to intialize our TomTom map in the a useEffect hook because it will run AFTER the component mounts.
   return <div ref={mapElement} className="mapDiv"></div>
};
export default Map;