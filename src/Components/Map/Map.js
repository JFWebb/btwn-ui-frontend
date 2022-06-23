import {useEffect, useState, useRef, Component} from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as tt from '@tomtom-international/web-sdk-maps';
import './Map.styles.css';

const Map = (props) => {
    console.log(props);
   // SETTING UP MAP
   // useRef is a hook that provide access to non-virtual DOM elements.
   const mapElement = useRef();
 
   // see note starting at line 22
   useEffect(() => {
   let map = tt.map({
       key: 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3',
       container: mapElement.current,
    //    center: [props.mapLongitude, props.mapLatitude],
    //    zoom: props.mapZoom
   })

   props.setMap(map);

   return () => map.remove();
   }, []);



   // calculate route

 
   //ref={mapElement} attribute tells React the mapElement variable should hold a reference to the actual DOM element representing this div.
   // We need this reference because the TomTom Maps SDK can't render into a piece of React's virtual DOM. It needs to work with a real DOM object.
   // but there’s a catch: it'll only assign the reference after it finishes mounting the component in the DOM, because the div element we want a reference to doesn't exist until React finishes mounting the component.
   // because of this, we need to intialize our TomTom map in the a useEffect hook because it will run AFTER the component mounts.
   return <div ref={mapElement} className="mapDiv"></div>
};
export default Map;