import './App.css';
import Header from './components/headers/Header';
import Pages from './components/mainPages/Pages';
import { Routes, Route } from 'react-router-dom'
import ContractoForm from './components/mainPages/contractorForm/ContractoForm'
function App() {
  return (
    <div className="App">
     <Header/>
      <Routes>
        <Route path='/' element = {<> <Pages/> </>} />
         <Route path="contractor-form" element={<div  className="container"> <ContractoForm/></div>  } />
         <Route path="vendor-form" element={<ContractoForm/>  } />
        </Routes>
    </div>
  );
}

export default App;
