import './App.css';
import Header from './components/headers/Header';
import Pages from './components/mainPages/Pages';
import { Routes, Route,Navigate   } from 'react-router-dom'
import ContractoForm from './components/mainPages/contractorForm/ContractoForm'
function App() {
  return (
    <div className="App">
     <Header/>
      <ContractoForm/>
    </div>
  );
}

export default App;
