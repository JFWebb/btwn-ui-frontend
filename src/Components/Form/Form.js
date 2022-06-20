import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { propertiesContainsFilter } from '@turf/turf';

const Form = (props) => {
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
  
  
    // api call that GETS the lat & lon of each address and sets them to a state
    const apiCall = () => {
      axios.get(`https://api.tomtom.com/search/2/geocode/${firstAdd}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r`)
        .then(result => {
          console.log('FIRST ADDRESS results: ', result.data)
          console.log('FIRST ADDRESS results lon/lat: ', result.data.results[0].position)
          setFirstAddCoords(
            {
              lat: result.data.results[0].position.lat,
              lon: result.data.results[0].position.lon
            }
          )
        })
    }
  
    const secondApiCall = () => {
      axios.get(`https://api.tomtom.com/search/2/geocode/${secAdd}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r`)
        .then(secondResult => {
          console.log('SECOND ADDRESS results: ', secondResult.data)
          console.log('SECOND ADDRESS results lon/lat: ', secondResult.data.results[0].position)
          setSecondAddCoords(
            {
              lat: secondResult.data.results[0].position.lat,
              lon: secondResult.data.results[0].position.lon
            }
          )
        })
        .catch(error => console.log(error))
    }
  
    // api POST call that takes in the lat/lon from the previous function
    const apiPostCall = (event) => {
      event.preventDefault(); 
      axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/${query}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r&maxDetourTime=3600`,
        {
          "route": {
            "points": [
              {
                "lat": 33.60299,
                "lon": -117.26039
              },
              {
                "lat": 33.52549,
                "lon": -117.14814
              },
            ]
          },
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
      )
        .then(result => {
          console.log('POST API CALL RESULTS: ', result.data)
        })
        .catch(error => console.log(error))
    }

    return (
      <div>
        <form onSubmit={(event) => apiPostCall(event)}>
            <input
            type="text"
            name="firstAdd"
            onChange={(e) => setFirstAdd(e.target.value)}
            value={firstAdd}
            />
            <input
             type="text"
             name="secAdd"
             onChange={(e) => setSecAdd(e.target.value)}
             value={secAdd}
             />
             <input 
            type="text"
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            />
            <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
export default Form; 