
// import packages
import './App.css';


import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form';
import Map from './Components/Map/Map';
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Form />
      <Map />
      <ResultsPage />
      <AddressPage />
      <Footer />
    </div>
  );
}

export default App;
