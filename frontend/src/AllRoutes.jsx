import DashboardLayout from "./admin/layout/DashboardLayout";
import Dashboard from "./admin/pages/Dashboard";
import PatientsTable from "./admin/pages/PatientsTable";
import ViewPatient from "./admin/pages/ViewPatient";
import { Route, Routes } from "react-router-dom";
import PatientDetailForm from "./pages/PatientDetailForm";
import LoginPage from "./pages/LoginPage";
import AddDoctorPrescription from "./pages/AddDoctorPrescription";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import AdminProfile from "./pages/AdminProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/admin/patients"
        element={
          <DashboardLayout>
            <PatientsTable />
          </DashboardLayout>
        }
      />

      <Route
        path="/admin/patient/:id"
        element={
          <DashboardLayout>
            <ViewPatient />
          </DashboardLayout>
        }
      />

      <Route
        path="/addpatient"
        element={
          <DashboardLayout>
            <PatientDetailForm />
          </DashboardLayout>
        }
      />
      <Route path="/appointmentshistory" element={<DashboardLayout><AppointmentHistory /></DashboardLayout>} />
      <Route
        path="/admin/patient/:id/prescription"
        element={<DashboardLayout><AddDoctorPrescription /></DashboardLayout>}
      />
      <Route path="/admin-profile" element={<DashboardLayout><AdminProfile /></DashboardLayout>} />
      <Route path="/scheduleappointment" element={<DashboardLayout><ScheduleAppointment /></DashboardLayout>} />
    </Routes>
  );
};

export default AllRoutes;
