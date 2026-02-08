import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Typography,
} from "@mui/material";
import api from "../api";

const initialFormState = {
  patientId: "",
  doctorName: "",
  specialization: "",
  appointmentDate: "",
  timeSlot: "",
  consultationMode: "In-person",
  followUpNeeded: false,
  nextAppointmentDate: "",
  appointmentStatus: "",
  remarks: "",
  patientMobileNumber: "",
  patientEmail: "",
  confirmationSent: "No",
  scheduledBy: "",
  schedulerName: "",
};

export default function AppointmentForm() {
  const DOCTOR_LIST = [
    { name: "Dr. Ankit Sharma", specialization: "Cardiologist" },
    { name: "Dr. Priya Verma", specialization: "Gynecologist" },
    { name: "Dr. Rahul Mehta", specialization: "Orthopedic Surgeon" },
    { name: "Dr. Neha Singh", specialization: "Dermatologist" },
    { name: "Dr. Aman Gupta", specialization: "Neurologist" },
    { name: "Dr. Kavita Joshi", specialization: "Pediatrician" },
    { name: "Dr. Rohit Kapoor", specialization: "General Physician" },
  ];

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  // const [doctorName, setDoctorName] = useState("");
  // const [specialization, setSpecialization] = useState("");
  // const [doctorList, setDoctorList] = useState([]);

  // const fetchDoctors = async (value) => {
  //   if (value.length < 2) return;

  //   const res = await api.get(`/api/doctors/search?q=${value}`);
  //   setDoctorList(res.data);
  // };

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const today = new Date().toISOString().split("T")[0];
  const [patientId, setPatientId] = useState("");
  const [patientError, setPatientError] = useState("");
  const [patientData, setPatientData] = useState(null);
  let debounceTimer = null;

  const handlePatientIdChange = (e) => {
    const value = e.target.value.toUpperCase(); // PT_0000001 format
    setPatientId(value);
    setPatientError("");
    setPatientData(null);

    // debounce API call
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      validatePatientId(value);
    }, 500);
  };

  const validatePatientId = async (id) => {
    if (!id) return;

    try {
      const res = await api.get(`/api/patient/check/${id}`);

      if (res.data.exists) {
        // console.log(res.data.patient.patientId);
        setField("patientId", res.data.patient.patientId);
        setPatientData(res.data.patient);
        setPatientError("");
      } else {
        setPatientError("Patient not found ❌");
        setPatientData(null);
      }
    } catch (err) {
      console.log("Server error"); // optional
    }
  };

  const validateField = (name, value) => {
    let msg = "";

    switch (name) {
      // case "doctorName":
      // case "specialization":
      case "scheduledBy":
        if (value && !/^[a-zA-Z ]+$/.test(value))
          msg = "Only alphabets allowed";
        break;

      case "patientEmail":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          msg = "Invalid email address";
        break;

      case "appointmentDate":
        if (!value) msg = "Appointment date required";
        break;

      case "timeSlot":
        if (!value) msg = "Time slot required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const mandatoryCheck = () => {
    const missing = [];
    // if (!form.appointmentId) missing.push("Appointment ID");
    if (!form.doctorName) missing.push("Doctor Name");
    if (!form.appointmentDate) missing.push("Appointment Date");
    if (!form.timeSlot) missing.push("Time Slot");
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = mandatoryCheck();
    if (missing.length > 0) {
      alert("Please fill mandatory fields:\n" + missing.join(", "));
      return;
    }

    for (let key in errors) {
      if (errors[key]) {
        alert("Please fix validation errors");
        return;
      }
    }

    try {
      const res = await api.post("/api/appointment/add", form);
      // alert(res.data.message || "Appointment Scheduled");

      alert("Appointment Scheduled\n" + res.data.message);
      setForm(initialFormState);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to schedule appointment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ marginBottom: "20px" }}
      >
        Schedule an Appointment
      </Typography>
      <Grid container spacing={2} style={{ padding: "0px 36px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Patient ID"
            fullWidth
            value={patientId}
            onChange={handlePatientIdChange}
            error={!!patientError}
            helperText={patientError || "Enter Patient ID like PT_0000001"}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ width: "250px" }}>
          <Autocomplete
            options={DOCTOR_LIST}
            getOptionLabel={(doc) => doc.name}
            filterOptions={(options, state) =>
              options.filter((doc) =>
                doc.name.toLowerCase().includes(state.inputValue.toLowerCase()),
              )
            }
            onChange={(e, doc) => {
              if (doc) {
                setField("doctorName", doc.name);
                setField("specialization", doc.specialization);
              } else {
                setField("doctorName", "");
                setField("specialization", "");
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Doctor Name"
                fullWidth
                error={!!errors.doctorName}
                helperText={errors.doctorName}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Specialization"
            fullWidth
            value={form.specialization}
            disabled // 👈 prevents manual edit
          />
        </Grid>

        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Appointment Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.appointmentDate}
              onChange={(e) => setField("appointmentDate", e.target.value)}
              error={!!errors.appointmentDate}
              helperText={errors.appointmentDate}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} style={{ width: "195px" }}>
            <TextField
              type="date"
              label="Appointment Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }} // 👈 Prevent past dates
              value={form.appointmentDate}
              onChange={(e) => setField("appointmentDate", e.target.value)}
              error={!!errors.appointmentDate}
              helperText={errors.appointmentDate}
            />
          </Grid>

          <Grid item xs={12} sm={6} style={{ width: "250px" }}>
            <TextField
              select
              label="Time Slot"
              fullWidth
              value={form.timeSlot}
              onChange={(e) => setField("timeSlot", e.target.value)}
              error={!!errors.timeSlot}
              helperText={errors.timeSlot}
            >
              <MenuItem value="Morning">Early Morning (7 AM – 9 AM)</MenuItem>
              <MenuItem value="Mid Morning">
                Mid Morning (9 AM – 11 AM)
              </MenuItem>
              <MenuItem value="Noon">Noon (11 AM – 1 PM)</MenuItem>
              <MenuItem value="Afternoon">Afternoon (2 PM – 4 PM)</MenuItem>
              <MenuItem value="Evening">Evening (4 PM – 6 PM)</MenuItem>
              <MenuItem value="Late Evening">
                Late Evening (6 PM – 8 PM)
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} style={{ width: "250px" }}>
            <TextField
              select
              label="Consultation Mode"
              fullWidth
              value={form.consultationMode}
              onChange={(e) => setField("consultationMode", e.target.value)}
            >
              <MenuItem value="In-person">In-person</MenuItem>
              <MenuItem value="Teleconsultation">Teleconsultation</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ width: "100%" }}>
          <Grid item xs={12} sm={6} style={{ width: "250PX" }}>
            <TextField
              select
              label="Appointment Status"
              fullWidth
              value={form.appointmentStatus}
              onChange={(e) => setField("appointmentStatus", e.target.value)}
            >
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Rescheduled">Rescheduled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.followUpNeeded}
                  onChange={(e) => setField("followUpNeeded", e.target.checked)}
                />
              }
              label="Follow-up Needed?"
            />
          </Grid>

          {form.followUpNeeded && (
            <Grid item xs={12} sm={6} style={{ width: "200px" }}>
              <TextField
                type="date"
                label="Next Appointment Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.nextAppointmentDate}
                onChange={(e) =>
                  setField("nextAppointmentDate", e.target.value)
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{ width: "250px" }}>
            <TextField
              label="Remarks"
              fullWidth
              multiline
              rows={3}
              value={form.remarks}
              onChange={(e) => setField("remarks", e.target.value)}
              error={!!errors.Remarks}
              helperText={errors.Remarks}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} style={{ width: "215px" }}>
          <TextField
            label="Enter Patient Mobile Number"
            fullWidth
            value={form.patientMobileNumber}
            onChange={(e) => setField("patientMobileNumber", e.target.value)}
            error={!!errors.patientMobileNumber}
            helperText={errors.patientMobileNumber}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{ width: "225px" }}>
          <TextField
            label="Enter Patient Email"
            fullWidth
            value={form.patientEmail}
            onChange={(e) => setField("patientEmail", e.target.value)}
            error={!!errors.patientEmail}
            helperText={errors.patientEmail}
          />
        </Grid>

        <Grid item xs={12} sm={6} style={{ width: "220px" }}>
          <TextField
            select
            label="Confirmation Sent to Patient?"
            fullWidth
            value={form.confirmationSent}
            onChange={(e) => setField("confirmationSent", e.target.value)}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} style={{ width: "250px" }}>
          <TextField
            select
            label="Appointment Scheduled By"
            fullWidth
            value={form.scheduledBy}
            onChange={(e) => setField("scheduledBy", e.target.value)}
          >
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Volunteer">Volunteer</MenuItem>
            <MenuItem value="Self">Self</MenuItem>
            <MenuItem value="Camp">Camp</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={`${form.scheduledBy} Name`}
            fullWidth
            value={form.schedulerName}
            onChange={(e) => setField("schedulerName", e.target.value)}
            error={!!errors.schedulerName}
            helperText={errors.schedulerName}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              margin: "auto",
            }}
          >
            <Button variant="contained" type="submit" disabled={!patientId}>
              Save & Schedule Appointment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
