import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 215,
        height: "100vh",
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
          <ListItemText primary="Patients List" />
        </ListItemButton>
        <ListItemButton component={Link} to="/addpatient">
          <ListItemText primary="Add Patient" />
        </ListItemButton>
      </List>
    </Box>
  );
}
