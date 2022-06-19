/*

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
    const [firstAdd, setFirstAdd] = useState('35622%20Kolo%20ct%20wildomar%20CA%2092595')
    const [secAdd, setSecAdd] = useState('40597%20Chantemar%20Way%20Temecula%20CA%2092591')
    const [firstAddCoords, setFirstAddCoords] = useState({
      lat: '',
      lon: ''
    })
    const [secondAddCoords, setSecondAddCoords] = useState({
      lat: '',
      lon: ''
    })
  
  
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
    const apiPostCall = () => {
      axios.post(`https://api.tomtom.com/search/2/searchAlongRoute/pizza.json?key=4QtRAeWMrEOhyfp4Ok2BnW3xv0JmKM3r&maxDetourTime=3600`,
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
        This is the form 
      </div>
    )
  }
export default Form; 

*/