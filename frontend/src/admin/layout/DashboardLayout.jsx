import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Navbar />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  );
}
