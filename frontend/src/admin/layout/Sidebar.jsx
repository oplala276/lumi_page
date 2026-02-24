import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [total, setTotal] = useState(0);

  const fetchStats = async () => {
    const res = await fetch("https://lumi-page-api.onrender.com/api/patient");
    const data = await res.json();
    const patients = data.patients;
    setTotal(patients.length);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box
      sx={{
        width: 215,
        // height: "100vh",
        bgcolor: "#1976d2",
        color: "white",
        p: 2,
        // mt:8,
        // position: "fixed",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Admin Panel
      </Typography>

      <List>
        <ListItemButton component={Link} to="/admin">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/admin/patients">
          <ListItemText primary={`Patients List(${total})`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/addpatient">
          <ListItemText primary="Add New Patient" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Attach Medical Report" />
        </ListItemButton>
        <ListItemButton component={Link} to="/appointmentshistory">
          <ListItemText primary="Appointments History" />
        </ListItemButton>
        <ListItemButton component={Link} to="/scheduleappointment">
          <ListItemText primary="Fix An Appointment" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Doctors On Board" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Add New Doctor" />
        </ListItemButton>
      </List>
    </Box>
  );
}
