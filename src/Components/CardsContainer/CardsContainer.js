const CardsContainer = (props) => {
    console.log(props.resultData)

    if (props.resultData) {
        return props.resultData.map((result) => (
            <div> 
                <h3> {result.poi.name} </h3>
                <h4> {result.poi.phone} </h4>
            </div>
        ))
    }else {
        return (
            <h1> No results yet! Make a</h1>
        )
    }

    // const results= props.resultData;

    // const mappedResults = results.map(result=> {
    //     return result.poi.name
    // })


    // if (props.resultData) {
    //     const results = props.resultData;
    //     return ( 
    //         results.map((result) => {
    //             <h2> {result.poi.classification.name}</h2>
    //         })
    //     )
    // } else {
    //     return (
    //         <h1> No results yet!</h1>
    //     )
    // }
}; 
export default CardsContainer; 