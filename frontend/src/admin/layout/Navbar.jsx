import React from "react";
import { Box, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        px: 3,
        boxShadow: 1,
        // ml: "250px",
      }}
    >
      <Typography variant="h5" fontWeight="600" margin='Auto'>      
       Patient Management System
      </Typography>
    </Box>
  );
}
