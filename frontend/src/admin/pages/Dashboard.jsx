import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pending: 0,
  });

  const fetchStats = async () => {
    const res = await fetch("http://localhost:5000/api/patient");
    const data = await res.json();
    const patients = data.patients;

    const today = new Date().toISOString().slice(0, 10);

    setStats({
      total: patients.length,
      today: patients.filter(
        (p) => p.createdAt.slice(0, 10) === today
      ).length,
      pending: patients.filter(
        (p) => p.caseType.includes("Emergency")
      ).length,
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Card title="Total Patients" value={stats.total} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card title="Today’s Registrations" value={stats.today} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card title="Emergency Cases" value={stats.pending} />
      </Grid>
    </Grid>
  );
}
