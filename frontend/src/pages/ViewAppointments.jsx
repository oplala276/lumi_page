import React, { useEffect, useState } from "react";
import api from "../api";
import { Paper, Typography, Box } from "@mui/material";

export default function ViewAppointments({ patientId }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get(`/api/appointment/patient/${patientId}`).then((res) => {
      setList(res.data);
    });
  }, [patientId]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Appointments</Typography>

      {list.map((a) => (
        <Box key={a._id} mt={2}>
          <strong>{a.appointmentId}</strong> – {a.appointmentDate} –{" "}
          {a.timeSlot} – {a.status}
        </Box>
      ))}
    </Paper>
  );
}
