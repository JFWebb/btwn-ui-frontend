import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt, { map } from '@tomtom-international/web-sdk-maps';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { propertiesContainsFilter } from '@turf/turf';

const Form = (props) => {




    const apiCall = (e) => {
      props.setFirstAdd(e.target.value)
      axios.get(`https://api.tomtom.com/search/2/geocode/${props.firstAdd}.json?key=bdsHOhOJtOLUgSUCNVY5j11XOjXyiYrp`)
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
      axios.get(`https://api.tomtom.com/search/2/geocode/${props.secAdd}.json?key=bdsHOhOJtOLUgSUCNVY5j11XOjXyiYrp`)
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
      
      axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/${props.query}.json?key=KXYIOAheM7cRQpB5GosJco3nGKGWSYg3&maxDetourTime=3600`,
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
        .then(results => {
          // console.log(results.data)
          let modifiedResults = results.data.results 
          props.setResultData(modifiedResults)

          // modifiedResults.map((element) => {
          //   console.log(element.poi.name + ' ' + element.poi.phone)
          // })
          // setResultData(result.data.results)
          // console.log('STATE: ' + resultData)
        })

        // ADDS MARKERS TO MAP
        .then(() => {
          props.addMarkers();
        })

        .then(() => {
          props.getRoute();
        })
        
        .then(() => {
            props.paintRoute();
        })
        
        // GETS ROUTE 
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