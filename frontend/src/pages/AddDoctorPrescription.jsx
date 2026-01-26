import React, { useState } from "react";
import { useEffect } from "react";
// import axios from "axios";
import api from "../api";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const isNumber = (val) => !isNaN(val) && val !== "";
const bpRegex = /^\d{2,3}\/\d{2,3}$/;

const initialState = {
  clinicName: "",
  bp: "",
  pulse: "",
  temperature: "",
  weight: "",
  complaints: "",
  diagnosis: "",
  medicines: [{ name: "", dose: "", frequency: "", duration: "" }],
  investigations: "",
  advice: "",
  followUp: "",
  doctorName: "",
  qualification: "",
  registrationNo: "",
};

export default function AddDoctorPrescription() {
  const { id } = useParams();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "bp":
        if (value && !bpRegex.test(value))
          message = "BP format should be like 120/80";
        break;

      case "clinicName":
        if (value && !/^[a-zA-Z0-9 .,-]+$/.test(value))
          message = "Clinic name contains invalid characters";
        break;

      case "pulse":
        if (value && (!isNumber(value) || value < 30 || value > 200))
          message = "Pulse must be between 30–200";
        break;

      case "temperature":
        if (value && (!isNumber(value) || value < 90 || value > 110))
          message = "Temperature must be between 90–110 °F";
        break;

      case "weight":
        if (value && (!isNumber(value) || value < 1 || value > 300))
          message = "Weight must be between 1–300 kg";
        break;

      case "diagnosis":
        if (!value.trim()) message = "Diagnosis is required";
        break;

      case "doctorName":
        if (!/^[a-zA-Z. ]+$/.test(value))
          message = "Doctor name should contain only alphabets";
        break;

      case "registrationNo":
        if (value && !/^[a-zA-Z0-9]+$/.test(value))
          message = "Registration No must be alphanumeric";
        break;

      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await api.get(`/api/patient/${id}`);
        setPatient(res.data.patient);
      } catch (err) {
        console.error("Failed to fetch patient", err);
      }
    };
    fetchPatient();
  }, [id]);

  const handleMedicineChange = (index, field, value) => {
    const meds = [...form.medicines];
    meds[index][field] = value;

    setForm({ ...form, medicines: meds });

    if (index === 0 && field === "name" && value.trim()) {
      setErrors((prev) => {
        const { medicines, ...rest } = prev;
        return rest;
      });
    }
  };

  // const handleMedicineChange = (index, field, value) => {
  //   const meds = [...form.medicines];
  //   meds[index][field] = value;
  //   setForm({ ...form, medicines: meds });
  // };

  const addMedicine = () => {
    setForm({
      ...form,
      medicines: [
        ...form.medicines,
        { name: "", dose: "", frequency: "", duration: "" },
      ],
    });
  };

  const validateMedicines = () => {
    if (!form.medicines.length || !form.medicines[0].name.trim()) {
      setErrors((prev) => ({
        ...prev,
        medicines: "At least one medicine is required",
      }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let valid = true;

    ["bp", "pulse", "temperature", "weight", "diagnosis", "doctorName"].forEach(
      (field) => {
        validateField(field, form[field]);
        if (errors[field]) valid = false;
      },
    );

    if (!validateMedicines()) valid = false;

    return valid;
  };

  const mandatoryCheck = () => {
    const missingFields = [];
    if (!form.clinicName) missingFields.push("Clinic Name");
    if (!form.bp) missingFields.push("BP");
    if (!form.pulse) missingFields.push("Pulse");
    if (!form.temperature) missingFields.push("Temperature");
    if (!form.weight) missingFields.push("Weight");
    if (!form.diagnosis) missingFields.push("Diagnosis");
    if (!form.doctorName) missingFields.push("Doctor Name");
    if (!form.qualification) missingFields.push("Qualification");
    if (!form.registrationNo) missingFields.push("Registration No");
    return missingFields;
  };

  const handleSubmit = async () => {
    // Mandatory checks
    console.log(form.medicines.length);
    const missingFields = mandatoryCheck();
    if (missingFields.length > 0) {
      alert("Please fill mandatory details:\n\n" + missingFields.join(", "));
      return;
    }

    // const requiredFields = ["diagnosis", "doctorName"];
    // for (let field of requiredFields) {
    //   validateField(field, form[field]);
    // }

    if (!validateMedicines()) return;

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) {
      alert("Please fix validation errors before submitting");
      return;
    }

    try {
      const payload = { ...form };

      const res = await api.post(`/api/patient/${id}/prescription`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Prescription saved successfully");

      setForm({
        ...initialState,
        medicines: [{ name: "", dose: "", frequency: "", duration: "" }],
      });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to save prescription");
    }
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Add Patient Doctor Prescription
        </Typography>
        {patient && (
          <>
            <Typography variant="h6" gutterBottom>
              Clinic / Patient Details
            </Typography>

            <Grid container spacing={2}>
              {/* Clinic Name (Editable) */}
              <Grid item xs={12} sm={6} style={{ width: "46%" }}>
                <TextField
                  label="Clinic / Hospital Name"
                  fullWidth
                  value={form.clinicName || ""}
                  onChange={(e) => setField("clinicName", e.target.value)}
                  error={!!errors.clinicName}
                  helperText={errors.clinicName}
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  fullWidth
                  value={`${patient.address?.city || ""}, ${patient.address?.state || ""} - ${patient.address?.pincode || ""}`}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={patient.mobile}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  fullWidth
                  value={patient.email || "NA"}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>

              {/* Patient Name */}
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Patient Name"
                  fullWidth
                  value={patient.fullName}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>

              {/* Patient ID */}
              <Grid item xs={12} sm={4} style={{ width: "20%" }}>
                <TextField
                  label="Patient ID"
                  fullWidth
                  value={patient.patientId}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>

              {/* Age */}
              <Grid item xs={12} sm={4} style={{ width: "20%" }}>
                <TextField
                  label="Age"
                  fullWidth
                  value={patient.age}
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiInputBase-input": {
                      color: "#555",
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Clinical Examination */}
        <Typography variant="h6">Clinical Examination</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {["bp", "pulse", "temperature", "weight"].map((f) => (
            <Grid item xs={12} sm={3} key={f}>
              <TextField
                label={f.charAt(0).toUpperCase()+f.slice(1)}
                fullWidth
                value={form[f]}
                onChange={(e) => setField(f, e.target.value)}
                error={!!errors[f]}
                helperText={errors[f]}
              />
            </Grid>
          ))}
        </Grid>

        {/* Complaints & Diagnosis */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Chief Complaints"
              multiline
              rows={2}
              fullWidth
              value={form.complaints}
              onChange={(e) => setField("complaints", e.target.value)}
              error={!!errors.complaints}
              helperText={errors.complaints}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Diagnosis*"
              multiline
              rows={2}
              fullWidth
              value={form.diagnosis}
              onChange={(e) => setField("diagnosis", e.target.value)}
              error={!!errors.diagnosis}
              helperText={errors.diagnosis}
            />
          </Grid>
        </Grid>

        {/* Medicines */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Rx (Medicines)
        </Typography>

        {form.medicines.map((m, i) => (
          <Grid container spacing={2} sx={{ mt: 1 }} key={i}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Medicine Name"
                fullWidth
                value={m.name}
                onChange={(e) =>
                  handleMedicineChange(i, "name", e.target.value)
                }
                error={!!errors.medicines && i === 0}
                helperText={i === 0 ? errors.medicines : ""}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Dose"
                fullWidth
                value={m.dose}
                onChange={(e) =>
                  handleMedicineChange(i, "dose", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Frequency"
                fullWidth
                value={m.frequency}
                onChange={(e) =>
                  handleMedicineChange(i, "frequency", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Duration"
                fullWidth
                value={m.duration}
                onChange={(e) =>
                  handleMedicineChange(i, "duration", e.target.value)
                }
              />
            </Grid>
          </Grid>
        ))}

        <Button sx={{ mt: 1 }} onClick={addMedicine}>
          + Add Medicine
        </Button>

        {/* Advice */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Advice / Instructions"
              multiline
              rows={2}
              fullWidth
              value={form.advice}
              onChange={(e) => setField("advice", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Follow-up"
              fullWidth
              value={form.followUp}
              onChange={(e) => setField("followUp", e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Doctor Info */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Doctor Details
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Doctor Name*"
              fullWidth
              value={form.doctorName}
              onChange={(e) => setField("doctorName", e.target.value)}
              error={!!errors.doctorName}
              helperText={errors.doctorName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Qualification"
              fullWidth
              value={form.qualification}
              onChange={(e) => setField("qualification", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Registration No"
              fullWidth
              value={form.registrationNo}
              onChange={(e) => setField("registrationNo", e.target.value)}
              error={!!errors.registrationNo}
              helperText={errors.registrationNo}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: "right" }}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            SAVE PRESCRIPTION
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
