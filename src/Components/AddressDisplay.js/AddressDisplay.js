const AddressDisplay = (props) => {
    // const addAddress = async (address) => {
    //     await fetch(URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'Application/json'
    //         },
    //         body: JSON.stringify(address)
    //     })
    //     props.getAddress();
    // }
    if (props.user) {
        return(
            props.address.map((address, index) => (
                <div className ='addressContainer' key={index}>
                    <h5> {address.name} </h5>
                    <p> {address.address} </p>
                </div>
            ))
        )
    } else {
        return(
            <h3> Log in to view addresses!</h3>
        )
    }
}

export default AddressDisplay;