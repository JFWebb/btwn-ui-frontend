import { DoubleClickZoomHandler } from "@tomtom-international/web-sdk-maps";
import './CardsContainer.styles.css'

const CardsContainer = (props) => {
    // console.log(props.resultData)
    if (props.resultData) {
        return props.resultData.map((result, index) => (
            <div className ='resultCards' key= {index}> 
                <h3 className ='resultName'> {result.poi.name} </h3>
                <h5> {result.address.freeformAddress} </h5>
                <h5 className='resultPhone'> {result.poi.phone} </h5>
                 <h5> <i class="material-icons">desktop_mac
</i><span className='resultUrl'><a href='{result.poi.url}'> {result.poi.url}</a> </span></h5>
                
            </div>
        ))
    }else {
        return (
            <h4> No results yet! Make a search!</h4>
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