// import LoginPage from "./pages/LoginPage";
// import PatientDetailForm from "./pages/PatientDetailForm";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "./admin/pages/Dashboard";
import DashboardLayout from "./admin/layout/DashboardLayout";
import PatientsTable from "./admin/pages/PatientsTable";
import ViewPatient from "./admin/pages/ViewPatient";
import AllRoutes from './AllRoutes';
import { BrowserRouter } from 'react-router-dom';

function App(){
  // return <LoginPage />;
  // return <PatientDetailForm/>;
  // return <AllRoutes/>;
return(
  <BrowserRouter>
    <AllRoutes/>
  </BrowserRouter>
)
}

export default App;
    
