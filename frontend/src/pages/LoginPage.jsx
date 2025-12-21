import React, { useState } from "react";
import axios from "../api";
import {
  Alert,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import "./style.css";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [captcha, setCaptcha] = useState(Math.random().toString(36).slice(8));
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const navigate = useNavigate();

  const refreshCaptcha = () => {
    setCaptcha(Math.random().toString(36).slice(8));
    setCaptchaInput("");
    setCaptchaError(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(captcha);
    console.log(captchaInput);
    if (captchaInput !== captcha) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);

    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
        captchaValue: true,
      });
      navigate('/admin');
      // alert(res.data.message);
      console.log("TOKEN:", res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="card"
      style={{
        width: "400px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>

      <TextField
         style={{marginBottom:"10px"}}
          label="Username"
          value={username}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          value={password}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />

      <CardContent>
        <CardActions>
          <div
            className="h3"
            style={{
              fontSize: "22px",
              letterSpacing: "3px",
              fontWeight: "bold",
              background: "#f0f0f0",
              padding: "8px 15px",
              borderRadius: "8px",
            }}
          >
            {captcha}
          </div>

          <Button startIcon={<RefreshIcon />} onClick={refreshCaptcha} />

        <TextField
          label="Enter Captcha"
          value={captchaInput}
          fullWidth
          onChange={(e) => setCaptchaInput(e.target.value)}
          error={captchaError}
          helperText={captchaError && "Incorrect captcha"}
          />
          </CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ marginTop: "20px" }}
          fullWidth
        >
          Login
        </Button>
      </CardContent>
    </div>
  );
}
export default LoginPage;