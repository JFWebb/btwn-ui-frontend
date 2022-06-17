import Header from './Components/Header/Header'; 
import ResultsPage from './Pages/ResultsPage';
import AddressPage from './Pages/AddressPage';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Main />
      <ResultsPage />
      <AddressPage/>
      <Footer />
    </div>
  );
}

export default App;
