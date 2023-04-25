import './App.css';
import Header from './components/headers/Header';

import Pages from './components/mainPages/Pages';
import  Footer  from './components/headers/Footer'
import { useState } from 'react';
function App() {

  return (
    <div className="App">
     
     <Header/>
     
     
     <Pages/>
     <Footer/>

     
    </div>
  );
}

export default App;
