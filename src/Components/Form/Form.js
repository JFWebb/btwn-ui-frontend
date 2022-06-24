import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt, { map, Marker } from '@tomtom-international/web-sdk-maps';
import { useState } from 'react';
import axios from 'axios';
import { propertiesContainsFilter } from '@turf/turf';
import './Form.styles.css'

const Form = (props) => {
  const apikey = 'KXYIOAheM7cRQpB5GosJco3nGKGWSYg3'

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
    const geocodeStart = await axios.get(`https://api.tomtom.com/search/2/geocode/${firstAdd}.json?key=${apikey}`)
    firstLatData = geocodeStart.data.results[0].position.lat
    firstLonData = geocodeStart.data.results[0].position.lon
    console.log(`testing awaits: ${firstLatData}, ${firstLonData}`)

    //geocodes addres from second input into lat/long
    const geocodeEnd = await axios.get(`https://api.tomtom.com/search/2/geocode/${secAdd}.json?key=${apikey}`)
    secondLatData = geocodeEnd.data.results[0].position.lat
    secondLonData = geocodeEnd.data.results[0].position.lon
    console.log(`testing awaits 2: ${secondLatData}, ${secondLonData}`)
    
    //searches along route for points of interest
    // may need to add [const postResult = await] infront of axios if running into errors
    axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/${query}.json?key=${apikey}&maxDetourTime=${maxDetourTime * 60}`,
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
    <div className="form-container">
      <form onSubmit={(e) => apiPostCall(e)}>
        <input className="form-input"
          type="text"
          name="firstAdd"
          value={firstAdd}
          onChange={(e) => setFirstAdd(e.target.value)}
          placeholder='Your Address'
        />< br />
        <input className="form-input"
          type="text"
          name="secAdd"
          onChange={(e) => setSecAdd(e.target.value)}
          value={secAdd}
          placeholder="A Friend's Address"
        />< br />
        <input className="form-input"
          type="text"
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder='What kind of place do you want to meet at?'
        />< br />
        <label for="maxDetourTime">Max Detour Time: {maxDetourTime} minutes</label>
        <input className="form-input"
          type="range"
          name="maxDetourTime"
          onChange={(e) => setMaxDetourTime(e.target.value)}
          value={maxDetourTime}
          min="1"
          max="60"
          placeholder='Detour Time (in minutes)'
        />< br />
        <input type="submit" value="Search" className="button"/>
      </form>
    </div>
  )
}
export default Form;