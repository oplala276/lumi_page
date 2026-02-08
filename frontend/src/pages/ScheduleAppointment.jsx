import React from "react";
import AppointmentForm from "./AppointmentForm";
import { Paper, Typography } from "@mui/material";

export default function ScheduleAppointment() {
  return (
    <Paper sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <AppointmentForm />
    </Paper>
  );
}
