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
} from "@mui/material";
import api from "../api";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/api/appointment/all");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const filteredAppointments = appointments.filter((a) =>
    a.appointmentId?.toLowerCase().includes(search.toLowerCase()) ||
    a.patientId?.toLowerCase().includes(search.toLowerCase()) ||
    a.patientMobileNumber?.includes(search)
  );

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Appointment History
      </Typography>

      <TextField
        label="Search by Appointment ID / Patient ID / Mobile"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Appointment ID</b></TableCell>
              <TableCell><b>Patient ID</b></TableCell>
              <TableCell><b>Patient Mobile</b></TableCell>
              <TableCell><b>Doctor Name</b></TableCell>
              <TableCell><b>Appointment Date</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((a) => (
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
    </Box>
  );
}
