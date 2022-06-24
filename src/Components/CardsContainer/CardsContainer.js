import { DoubleClickZoomHandler } from "@tomtom-international/web-sdk-maps";
import './CardsContainer.styles.css'

const CardsContainer = (props) => {
    // console.log(props.resultData)
    if (props.resultData) {
        return props.resultData.map((result, index) => (
            <div className ='resultCards' key= {index}> 
                <h5 className ='resultName' style={{"font-weight":"700"}}> {result.poi.name} </h5>
                <h6> {result.address.freeformAddress} </h6>
                <h6 className='resultPhone'> {result.poi.phone} </h6>
                 <h6> <i class="material-icons">desktop_mac
</i><span className='resultUrl'><a href='{result.poi.url}'> {result.poi.url}</a> </span></h6>
                
            </div>
        ))
    }else {
        return (
            <h5 style={{"text-align":"center", "padding":"20px"}}> 🔎 No results yet... try making a search!</h5>
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