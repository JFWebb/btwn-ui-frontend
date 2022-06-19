import AddressForm from '../Components/AddressForm/AddressForm';
import AddressDisplay from '../Components/AddressDisplay.js/AddressDisplay';
import {useState, useEffect} from 'react'

const AddressPage = (props) => {
    const [address, setAddress ] = useState([])
  const URL = "http://localhost:4000/address"

  // GET ROUTE
  const getAddress = async () => {
    const response =await fetch(URL);
    const data = await response.json();
    setAddress(data)
  }

// CREATE ROUTE

  const createAddress = async (address) => {
    await fetch (URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body:JSON.stringify(address)
    })
  }


  useEffect(()=> {
    getAddress();
  }, [])
    return (
        <div>
            <h1> This is the Address Component </h1>
        <AddressDisplay address={address} getAddress={getAddress}/>
        <AddressForm createAddress={createAddress} />
        </div>
    )
    
}; 
export default AddressPage; 