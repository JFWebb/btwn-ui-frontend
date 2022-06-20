import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { propertiesContainsFilter } from '@turf/turf';

const Form = (props) => {
    const apiCall = (e) => {
      props.setFirstAdd(e.target.value)
      axios.get(`https://api.tomtom.com/search/2/geocode/${props.firstAdd}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r`)
        .then(result => {
          props.setFirstAddCoords(
            {
              lat: result.data.results[0].position.lat,
              lon: result.data.results[0].position.lon
            }
          )
        })
        .catch(error => console.log(error))
    }
  
    const secondApiCall = (e) => {
      props.setSecAdd(e.target.value)
      // console.log('this is second add: ' + props.secAdd)
      axios.get(`https://api.tomtom.com/search/2/geocode/${props.secAdd}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r`)
        .then(secondResult => {
          props.setSecondAddCoords(
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
      console.log('this is first add: ' + props.firstAdd)
      console.log('this is first add cords: ' + props.firstAddCoords.lat + ',' + props.firstAddCoords.lon)
      console.log('this is second add: ' + props.secAdd)
      console.log('this is second add cords: ' + props.secondAddCoords.lat + ',' + props.secondAddCoords.lon)
      
      axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/${props.query}.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r&maxDetourTime=3600`,
        {
          "route": {
            "points": [
              {
                "lat": props.firstAddCoords.lat,
                "lon": props.firstAddCoords.lon
              },
              {
                "lat": props.secondAddCoords.lat,
                "lon": props.secondAddCoords.lon
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
        <form onSubmit={(e) => apiPostCall(e)}>
            <input
            type="text"
            name="firstAdd"
            onChange={apiCall}
            value={props.firstAdd}
            />
            <input
             type="text"
             name="secAdd"
             onChange={secondApiCall}
             value={props.secAdd}
             />
             <input 
            type="text"
            name="query"
            onChange={(e) => props.setQuery(e.target.value)}
            value={props.query}
            />
            <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
export default Form; 