import {useEffect, useState, useRef} from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as tt from '@tomtom-international/web-sdk-maps';

const MAX_ZOOM = 17;

const Map = (props) => {
    const mapElement = useRef();
    const [mapLongitude, setMapLongitude] = useState(-121.91599);
    const [mapLatitude, setMapLatitude] = useState(37.36765);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});

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


    return <div ref={mapElement} className="mapDiv"></div>
}; 
export default Map;