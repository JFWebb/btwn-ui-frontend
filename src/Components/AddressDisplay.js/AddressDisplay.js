const AddressDisplay = (props) => {
    const addAddress = async (address) => {
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(address)
        })
        props.getAddress();
    }
    return (
        
        props.address.map((address) => (
        <div className ='addressContainer'>
            <h2> {address.name} </h2>
            <h2> {address.address} </h2>
        </div>
    ))
    )
}

export default AddressDisplay;