import CardsContainer from '../Components/CardsContainer/CardsContainer';

const ResultsPage = (props) => {
    return (
        <div className='cardContainer'>
            <h2 className='resultTabHeading'> Results</h2>
    <CardsContainer resultData={props.resultData} />
    </div>
    )
}; 
export default ResultsPage; 