import './App.css';
import Header from './components/headers/Header';
import { Routes, Route,Navigate   } from 'react-router-dom'
import ContractoForm from './components/mainPages/contractorForm/ContractoForm'
import Login from './components/mainPages/auth/Login';
import Regsiter from './components/mainPages/auth/Register';
import Pages from './components/mainPages/Pages';
function App() {
  return (
    <div className="App">
     <Header/>
     <Pages/>


     
    </div>
  );
}

export default App;
