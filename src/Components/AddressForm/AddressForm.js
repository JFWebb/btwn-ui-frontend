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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createAddress(newAddress);
    }

    return(
        <div className ='addressForm'>
         <form onSubmit={handleSubmit}>
            <h1> Add a new Saved Address!  </h1>
            <input
                type='text'
                name='name'
                onChange={handleChange}
                value={newAddress.name}
                placeholder='Name'
            />
            <input
                type='text'
                name='address'
                onChange={handleChange}
                value={newAddress.address}
                placeholder='Address'
            />
            <input  
                type='submit'
            />
        </form>
        </div>
    )
}

export default AddressForm;