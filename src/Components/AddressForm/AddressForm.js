import {useState} from 'react';

const AddressForm = (props) => {
    const [newAddress, setNewAddress] = useState({
        name:"",
        address: ""
    })

    const handleChange = (event) => {
        setNewAddress({
            ...newAddress,
            [event.target.name]: event.target.value
        });
        console.log(event)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createAddress(newAddress);
    }

    return(
        <div>
         <form onSubmit={handleSubmit}>
            <h1> Add a new Saved Address! (This is AddressForm sub-component) </h1>
            <input
                type='text'
                name='name'
                onChange={handleChange}
                value={newAddress.name}
            />
            <input
                type='text'
                name='address'
                onChange={handleChange}
                value={newAddress.address}
            />
            <input  
                type='submit'
            />
        </form>
        </div>
    )
}

export default AddressForm;