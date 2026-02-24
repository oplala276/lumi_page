import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../api";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Change Password Logic
  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!form.username || !form.oldPassword || !form.newPassword) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("/auth/change-password", form);

      setSuccess(res.data.msg);

      // Redirect after 2 sec
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

  return (
    <Box p={3}>
      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Typography variant="h6" mb={2}>
          Admin Profile
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Old Password"
          name="oldPassword"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleChangePassword}
        >
          Change Password
        </Button>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}