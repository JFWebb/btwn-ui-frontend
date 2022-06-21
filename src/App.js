
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
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user)) //look at googledocs notes for explanation on this!

    return() => {
      unsubscribe();
    }
}, []);

  
  return (
    <div className="App">
      <Header user={user} />
      <Form />
      <Map />
      <ResultsPage />
      <AddressPage user={user}/>
      <Footer />
    </div>
  );
}

export default App;
