import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt, { map, Marker } from '@tomtom-international/web-sdk-maps';
import { useState } from 'react';
import axios from 'axios';
import { propertiesContainsFilter } from '@turf/turf';
const Form = (props) => {
  const [firstAdd, setFirstAdd] = useState('')
  const [secAdd, setSecAdd] = useState('')
  const [query, setQuery] = useState('')
  const [maxDetourTime, setMaxDetourTime] = useState('')
  
  // global variables for lat/lon data
  let firstLatData;
  let firstLonData;
  let secondLatData;
  let secondLonData;
  
  const apiPostCall = async (event) => {
    event.preventDefault();
    // const features = props.map.queryRenderedFeatures()
    // console.log(features)
    // props.map.removeFeatureState(features)
    // console.log(features);
    // console.log(features);
    axios.get(`https://api.tomtom.com/search/2/geocode/${firstAdd}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3`)
      .then(result => {
        console.log(result)
        firstLatData = result.data.results[0].position.lat
        firstLonData = result.data.results[0].position.lon
      })
    axios.get(`https://api.tomtom.com/search/2/geocode/${secAdd}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3`)
      .then(secondResult => {
        console.log(secondResult)
        secondLatData = secondResult.data.results[0].position.lat
        secondLonData = secondResult.data.results[0].position.lon
        axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/${query}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3&maxDetourTime=${maxDetourTime}`,
          {
            "route": {
              "points": [
                {
                  "lat": firstLatData,
                  "lon": firstLonData
                },
                {
                  "lat": secondLatData,
                  "lon": secondLonData
                },
              ]
            },
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )
        .then(postResult => { 
          let modifiedResults = postResult.data.results 
          props.setResultData(modifiedResults)
          let positionResults = postResult.data.results.position
          
        })
        
        //ADDS MARKERS TO MAP
        .then(() => {
            props.addMarkers(firstLatData, firstLonData, secondLatData, secondLonData);
        })
        .then(() => {
          props.adjustZoom(firstLatData,firstLonData,secondLatData,secondLonData);
        })
        .then(() => {
            props.getRoute(firstLatData, firstLonData, secondLatData, secondLonData)
        })

          
        .catch(error => console.log(error.message))
      })
  }
  return (
    <div>
      <form onSubmit={(e) => apiPostCall(e)}>
        <input
          type="text"
          name="firstAdd"
          value={firstAdd}
          onChange={(e) => setFirstAdd(e.target.value)}
          placeholder='Address 1'
        />< br />
        <input
          type="text"
          name="secAdd"
          onChange={(e) => setSecAdd(e.target.value)}
          value={secAdd}
          placeholder='Address 2'
        />< br />
        <input
          type="text"
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder='Query'
        />< br />
        <input
          type="text"
          name="maxDetourTime"
          onChange={(e) => setMaxDetourTime(e.target.value)}
          value={maxDetourTime}
          placeholder='Detour Time'
        />< br />
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}
export default Form;