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
  let modifiedResults;
  
  const apiPostCall = async (event) => {
    event.preventDefault();
    // geocodes address from first input into lat/long
    const geocodeStart = await axios.get(`https://api.tomtom.com/search/2/geocode/${firstAdd}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3`)
    firstLatData = geocodeStart.data.results[0].position.lat
    firstLonData = geocodeStart.data.results[0].position.lon
    console.log(`testing awaits: ${firstLatData}, ${firstLonData}`)

    //geocodes addres from second input into lat/long
    const geocodeEnd = await axios.get(`https://api.tomtom.com/search/2/geocode/${secAdd}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3`)
    secondLatData = geocodeEnd.data.results[0].position.lat
    secondLonData = geocodeEnd.data.results[0].position.lon
    console.log(`testing awaits 2: ${secondLatData}, ${secondLonData}`)
    
    //searches along route for points of interest
    // may need to add [const postResult = await] infront of axios if running into errors
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
      
      // handle data from search along route request
      .then(postResult => { 
        let modifiedResults = postResult.data.results 
        props.setResultData(modifiedResults)
        return modifiedResults;
      })

      // add start, end, and POI markers to map
      .then(modifiedResults => {
          console.log('passings modfieid results as global var')
          console.log(modifiedResults)
          props.addMarkers(firstLatData, firstLonData, secondLatData, secondLonData, modifiedResults);
      })
      
      // zoom in to start and end points
      .then(() => {
        props.adjustZoom(firstLatData,firstLonData,secondLatData,secondLonData);
      })

      // paint route on to map
      .then(() => {
          props.getRoute(firstLatData, firstLonData, secondLatData, secondLonData)
      })

      .catch(error => console.log(error.message))
          
        
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