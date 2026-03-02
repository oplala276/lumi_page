// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import axios from "../api";

// export default function AdminProfile() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     oldPassword: "",
//     newPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Change Password Logic
//   const handleChangePassword = async () => {
//     setError("");
//     setSuccess("");

//     if (!form.username || !form.oldPassword || !form.newPassword) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       const res = await axios.post("/auth/change-password", form);

//       setSuccess(res.data.msg);

//       // Redirect after 2 sec
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);

//     } catch (err) {
//       setError(err.response?.data?.msg || "Error changing password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <Box p={3}>
//       <Paper sx={{ p: 3, maxWidth: 500 }}>
//         <Typography variant="h6" mb={2}>
//           Admin Profile
//         </Typography>

//         {error && <Alert severity="error">{error}</Alert>}
//         {success && <Alert severity="success">{success}</Alert>}

//         <TextField
//           label="Username"
//           name="username"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//         />

//         <TextField
//           label="Old Password"
//           name="oldPassword"
//           type="password"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//         />

//         <TextField
//           label="New Password"
//           name="newPassword"
//           type="password"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{ mt: 2 }}
//           onClick={handleChangePassword}
//         >
//           Change Password
//         </Button>

//         <Button
//           variant="outlined"
//           color="error"
//           fullWidth
//           sx={{ mt: 2 }}
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </Paper>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "../api";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  // ✅ Change Password Logic
  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!form.username || !form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post("/auth/change-password", {
        username: form.username,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      setSuccess(res.data.msg);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Error changing password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const passwordsMatch =
    form.confirmPassword === "" ||
    form.newPassword === form.confirmPassword;

  return (
    <Box p={3}>
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Admin Profile
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        {/* Old Password */}
        <TextField
          label="Old Password"
          name="oldPassword"
          type={showPassword.old ? "text" : "password"}
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleToggle("old")}>
                  {showPassword.old ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* New Password */}
        <TextField
          label="New Password"
          name="newPassword"
          type={showPassword.new ? "text" : "password"}
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleToggle("new")}>
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword.confirm ? "text" : "password"}
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!passwordsMatch}
          helperText={
            !passwordsMatch ? "Passwords do not match" : ""
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleToggle("confirm")}>
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleChangePassword}
          disabled={!passwordsMatch}
        >
          Change Password
        </Button>

        {/* <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button> */}
      </Paper>
    </Box>
  );
}