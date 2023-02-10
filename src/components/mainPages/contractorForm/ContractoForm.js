import { Routes, Route,Navigate   } from 'react-router-dom'
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
  const ContractoForm = () => {
  return <>
  <Routes>
         <Route path="/contractor-form" element={<div  className="container"> <PersonalDetails/></div>  } />
         <Route path="contractor-form/work-experience" element={<div  className="container"> <WorkExperience/> </div>  } />
        </Routes>
      </>
    
  };
  export default ContractoForm;