import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  Link,
  Grid // Added Link for "Show All"
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../api";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  // const [search, setSearch] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/api/appointment/all");
      // Assuming your API returns data sorted by date. 
      // If not, sort them here to ensure you get the "latest"
      const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAppointments(sortedData);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const [stats, setStats] = useState({
  day: 0,
  week: 0,
  month: 0,
});

  // const fetchStats = async () => {
  //   const res = await fetch("https://lumi-page-api.onrender.com/api/patient");
  //   const data = await res.json();
  //   const patients = data.patients;

  //   const today = new Date().toISOString().slice(0, 10);

  //   setStats({
  //     total: patients.length,
  //     today: patients.filter(
  //       (p) => p.createdAt.slice(0, 10) === today
  //     ).length,
  //     pending: patients.filter(
  //       (p) => p.caseType.includes("Emergency")
  //     ).length,
  //   });
  // };
  const fetchStats = async () => {
  const res = await fetch("https://lumi-page-api.onrender.com/api/patient");
  const data = await res.json();
  const patients = data.patients;

  const now = new Date();

  // Today start
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  // Start of current month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const dayCount = patients.filter((p) => {
    const created = new Date(p.createdAt);
    return created >= startOfToday;
  }).length;

  const weekCount = patients.filter((p) => {
    const created = new Date(p.createdAt);
    return created >= sevenDaysAgo;
  }).length;

  const monthCount = patients.filter((p) => {
    const created = new Date(p.createdAt);
    return created >= startOfMonth;
  }).length;

  setStats({
    day: dayCount,
    week: weekCount,
    month: monthCount,
  });
};

  useEffect(() => {
    fetchStats();
  }, []);

  const Card = ({ title, value }) => (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" mt={1} fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );
  const latestFive = appointments.slice(0, 5);

  return (
    <Box p={3} style={{ marginTop: 0 }}>
      <Typography variant="h5" mb={2}>
        Appointment Scheduled Recently
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Appointment ID</b></TableCell>
              <TableCell><b>Patient ID</b></TableCell>
              <TableCell><b>Patient Mobile</b></TableCell>
              <TableCell><b>Doctor Name</b></TableCell>
              <TableCell><b>Date</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {latestFive.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              latestFive.map((a) => (
                <TableRow key={a._id}>
                  <TableCell>{a.appointmentId}</TableCell>
                  <TableCell>{a.patientId}</TableCell>
                  <TableCell>{a.patientMobileNumber}</TableCell>
                  <TableCell>{a.doctorName}</TableCell>
                  <TableCell>{a.appointmentDate}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- SHOW ALL TEXT --- */}
      {appointments.length > 5 && (
        <Box textAlign="right" mt={2}>
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate("/appointmentshistory")} // Change to your actual route
            sx={{ cursor: "pointer", fontWeight: "bold", textDecoration: "none" }}
          >
            Show All ({appointments.length}) →
          </Link>
        </Box>
      )}
      <Typography variant="h5" mb={2}>
        Recently Added New Patient
      </Typography>
      <Grid container spacing={3}>
       <Grid style={{width: "11%"}} item xs={12} sm={4}>
  <Card title="Day" value={stats.day} />
</Grid>
<Grid style={{width: "11%"}} item xs={12} sm={4}>
  <Card title="Week" value={stats.week} />
</Grid>
<Grid style={{width: "11%"}} item xs={12} sm={4}>
  <Card title="Month" value={stats.month} />
</Grid>
     </Grid>
           <Typography style={{ marginTop: 20 }} variant="h5" mb={2}>
        Medical Reports Uploaded Recently
        </Typography>
      <Grid container spacing={3}>
       <Grid item xs={12} sm={4}>
         <Card title="Day" value={stats.total} />
       </Grid>
       <Grid item xs={12} sm={4}>
         <Card title="Week" value={stats.today} />
       </Grid>
       <Grid item xs={12} sm={4}>
         <Card title="Month" value={stats.pending} />
       </Grid>
     </Grid>
    </Box>
  );
}
