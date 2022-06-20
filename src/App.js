
// import packages
import './App.css';
import { useState, useEffect } from 'react';


import Header from './Components/Header/Header'; 
import Form from './Components/Form/Form'; 
import Map from './Components/Map/Map'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';
import {auth} from './services/firebase';


function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged(user=> setUser(user))
  }, [])

  
  return (
    <div className="App">
      <Header user={user} />
      <Form />
      <Map />
      <ResultsPage />
      <AddressPage/>
      <Footer />
    </div>
  );
}

export default App;
