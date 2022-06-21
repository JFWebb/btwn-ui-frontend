import AddressForm from '../Components/AddressForm/AddressForm';
import AddressDisplay from '../Components/AddressDisplay.js/AddressDisplay';
import {useState, useEffect} from 'react'

const AddressPage = (props) => {
    const [address, setAddress ] = useState([])
  const URL = "http://localhost:4000/address/"

  // GET ROUTE
  const getAddress = async () => {
    const token = await props.user.getIdToken();
    console.log(token)
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const data = await response.json();
    setAddress(data)
  }

// CREATE ROUTE

  const createAddress = async (address) => {
    if (!props.user) return;
    const token = await props.user.getIdToken();
    await fetch (URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + token
        },
        body:JSON.stringify(address)
    })
  }

  useEffect(()=> {
    if(props.user) {
      getAddress();
    } else {
      setAddress([]);
    }
  },[props.user])

    return (
      
        <div>
          {props.user &&
          <div>
            <h1> This is the Address Component </h1>
        <AddressDisplay user={props.user} address={address} getAddress={getAddress}/>
        <AddressForm user={props.user} createAddress={createAddress} />
        </div>
      }
        </div>
    )
    
}; 
export default AddressPage; 