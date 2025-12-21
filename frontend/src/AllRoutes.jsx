import DashboardLayout from "./admin/layout/DashboardLayout"
import Dashboard from "./admin/pages/Dashboard"
import PatientsTable from "./admin/pages/PatientsTable"
import ViewPatient from "./admin/pages/ViewPatient"
import { Route, Routes } from "react-router-dom"
import PatientDetailForm from "./pages/PatientDetailForm"
import LoginPage from "./pages/LoginPage"

const AllRoutes = () =>{
    return (
<Routes>
  <Route
    path="/"
    element={<LoginPage/>}
  />

  <Route
    path="/admin"
    element={<DashboardLayout><Dashboard /></DashboardLayout>}
  />

  <Route
    path="/admin/patients"
    element={<DashboardLayout><PatientsTable /></DashboardLayout>}
  />

  <Route
    path="/admin/patient/:id"
    element={<DashboardLayout><ViewPatient /></DashboardLayout>}
  />

  <Route
    path="/addpatient"
    element={<DashboardLayout><PatientDetailForm /></DashboardLayout>}
  />
</Routes>
    )

}

export default AllRoutes;