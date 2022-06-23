import CardsContainer from '../Components/CardsContainer/CardsContainer';

const ResultsPage = (props) => {
    return (
        <div className='cardContainer'>
    <CardsContainer resultData={props.resultData} />
    </div>
    )
}; 
export default ResultsPage; 