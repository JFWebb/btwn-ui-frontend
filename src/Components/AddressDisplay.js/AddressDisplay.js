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
                    <h2> {address.name} </h2>
                    <h2> {address.address} </h2>
                </div>
            ))
        )
    } else {
        return(
            <h1> Log in to view addresses!</h1>
        )
    }
}

export default AddressDisplay;