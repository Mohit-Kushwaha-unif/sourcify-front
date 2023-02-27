import './App.css';
import Header from './components/headers/Header';
import { Routes, Route,Navigate   } from 'react-router-dom'
import ContractoForm from './components/mainPages/contractorForm/ContractoForm'
import Login from './components/mainPages/auth/Login';
import Regsiter from './components/mainPages/auth/Register';
import Pages from './components/mainPages/Pages';
import  Footer  from './components/headers/Footer'
import SubHeader from './components/headers/Sub-Header';
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
