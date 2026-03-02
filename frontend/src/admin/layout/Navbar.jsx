// import React from "react";
// import { Box, Typography } from "@mui/material";

// export default function Navbar() {
//   return (
//     <Box
//       sx={{
//         height: 60,
//         bgcolor: "white",
//         display: "flex",
//         alignItems: "center",
//         px: 3,
//         boxShadow: 1,
//         // ml: "250px",
//       }}
//     >
//       <Typography variant="h5" fontWeight="600" margin='Auto'>      
//        Patient Management System
//       </Typography>
//     </Box>
//   );
// }
// import React from "react";
// import { Box, Typography, IconButton, Avatar } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         height: 60,
//         bgcolor: "white",
//         display: "flex",
//         alignItems: "center",
//         px: 3,
//         boxShadow: 1,
//         justifyContent: "space-between",
//       }}
//     >
//       <Typography variant="h5" fontWeight="600">
//         Patient Management System
//       </Typography>

//       {/* Admin Profile Icon */}
//       <IconButton onClick={() => navigate("/admin-profile")}>
//         <Avatar sx={{ bgcolor: "#1976d2" }}>A</Avatar>
//       </IconButton>

//     </Box>
//   );
// }
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        px: 3,
        boxShadow: 1,
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" fontWeight="600">
        Dashboard for PMS
      </Typography>

      {/* Right Side Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        
        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => navigate("/admin-profile")}
        >
          Change Password
        </Typography>
        {/* <Typography>/</Typography> */}

        <Typography
          sx={{
            cursor: "pointer",
            color: "red",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Typography>

        <IconButton>
          <Avatar sx={{ bgcolor: "#1976d2" }}>A</Avatar>
        </IconButton>
      </Box>
    </Box>
  );
}