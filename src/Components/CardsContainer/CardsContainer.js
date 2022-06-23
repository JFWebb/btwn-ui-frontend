import { DoubleClickZoomHandler } from "@tomtom-international/web-sdk-maps";

const CardsContainer = (props) => {
    // console.log(props.resultData)
    if (props.resultData) {
        return props.resultData.map((result, index) => (
            <div className ='resultCards' key= {index}> 
                <h3 className ='resultName'> {result.poi.name} </h3>
                <h3> {result.address.freeformAddress} </h3>
                <h4 className='resultPhone'> {result.poi.phone} </h4>
                 <h4> <i class="material-icons">desktop_mac
</i><span className='resultUrl'><a href='{result.poi.url}'> {result.poi.url}</a> </span></h4>
                
            </div>
        ))
    }else {
        return (
            <h1> No results yet! Make a search!</h1>
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